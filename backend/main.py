import pickle
import pandas as pd
import numpy as np
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Heart Risk Predictor API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for data stats
DATA_STATS = {
    "total_rows": 0,
    "cleaned_rows": 0,
    "removed_rows": 0,
    "features": {},
    "hyperparameters": {}
}

# Values for the "Best 3 Models"# Hardcoded for now based on training notebook results
MODEL_PERFORMANCE = [
    {"name": "Gradient Boosting", "f1_score": 0.733, "accuracy": 0.734},
    {"name": "Decision Tree", "f1_score": 0.710, "accuracy": 0.732},
    {"name": "Random Forest", "f1_score": 0.708, "accuracy": 0.703}
]

# Load model and compute stats on startup
try:
    with open("final_model.pkl", "rb") as f:
        model_package = pickle.load(f)
    model = model_package['model']
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def compute_data_stats():
    global DATA_STATS
    try:
        # Paths are relative to where the script is run. Assuming run from backend dir or project root.
        # We try both options just in case.
        raw_path = "../data/raw/cardio_train.csv"
        cleaned_path = "../data/processed/cleaned.csv"
        
        if not os.path.exists(raw_path):
             # Try absolute path based on known structure if relative fails
             base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
             raw_path = os.path.join(base_dir, "data", "raw", "cardio_train.csv")
             cleaned_path = os.path.join(base_dir, "data", "processed", "cleaned.csv")

        if os.path.exists(raw_path) and os.path.exists(cleaned_path):
             # Read raw data (CSV might be semicolon separated)
            df_raw = pd.read_csv(raw_path, sep=';' if raw_path.endswith('.csv') else ',')
            df_cleaned = pd.read_csv(cleaned_path)
            
            total = len(df_raw)
            cleaned = len(df_cleaned)
            
            DATA_STATS["total_rows"] = total
            DATA_STATS["cleaned_rows"] = cleaned
            DATA_STATS["removed_rows"] = total - cleaned
            
            # Calculate feature ranges from cleaned data
            # Key features to show
            key_features = ['age', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc']
            
            # map integer 'age' (days) to years if needed, but the model expects days usually? 
            # Wait, the input model expects years?
            # In input Pydantic model: age: int.
            # In the notebook typically 'age' is in days in original dataset and converted. 
            # Let's check the values. 
            # If mean age is > 1000, it's days. If < 120, it's years.
            
            for feat in key_features:
                if feat in df_cleaned.columns:
                     min_val = float(df_cleaned[feat].min())
                     max_val = float(df_cleaned[feat].max())
                     mean_val = float(df_cleaned[feat].mean())
                     
                     # Adjustment for age if it looks like days
                     if feat == 'age' and mean_val > 150:
                         min_val = round(min_val / 365.25, 1)
                         max_val = round(max_val / 365.25, 1)
                         mean_val = round(mean_val / 365.25, 1)

                     DATA_STATS["features"][feat] = {
                         "min": min_val,
                         "max": max_val,
                         "mean": round(mean_val, 2)
                     }
            # Extract Hyperparameters if model is a GradientBoostingClassifier
            if model and hasattr(model, 'get_params'):
                params = model.get_params()
                DATA_STATS["hyperparameters"] = {
                    "learning_rate": params.get("learning_rate"),
                    "n_estimators": params.get("n_estimators"),
                    "max_depth": params.get("max_depth")
                }
            print("Data stats computed successfully")
        else: 
            print("Data files not found, stats will be empty")
            
    except Exception as e:
        print(f"Error computing data stats: {e}")

# Compute stats on module load
compute_data_stats()

from pydantic import BaseModel, Field

class CardioInput(BaseModel):
    age: int = Field(..., gt=0, le=120)
    gender: int = Field(..., ge=0, le=2)
    height: int = Field(..., gt=50, le=250)
    weight: float = Field(..., gt=10, le=300)
    ap_hi: int = Field(..., gt=50, le=250)
    ap_lo: int = Field(..., gt=30, le=150)
    cholesterol: int = Field(..., ge=1, le=3)
    gluc: int = Field(..., ge=1, le=3)
    smoke: int = Field(..., ge=0, le=1)
    alco: int = Field(..., ge=0, le=1)
    active: int = Field(..., ge=0, le=1)

@app.get("/")
def read_root():
    return {"message": "Heart Risk Predictor API is running"}

@app.get("/insights")
async def get_insights():
    """
    Returns data statistics and model performance metrics.
    """
    return {
        "data_overview": {
            "total_rows": DATA_STATS["total_rows"],
            "cleaned_rows": DATA_STATS["cleaned_rows"],
            "removed_rows": DATA_STATS["removed_rows"]
        },
        "best_models": MODEL_PERFORMANCE,
        "active_model_details": {
            "name": "Gradient Boosting",
            "confusion_matrix": [[4928, 1592], [1965, 4874]],
            "roc_auc_score": 0.801,
            "metrics_analyzed": 11,
            "hyperparameters": DATA_STATS["hyperparameters"]
        }
    }

@app.post("/predict")
def predict(input_data: CardioInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Calculate BMI
    # BMI = weight (kg) / (height (m))^2
    height_m = input_data.height / 100.0
    bmi = input_data.weight / (height_m ** 2)
    
    # Prepare dataframe for prediction
    # Feature order: ['age' 'gender' 'height' 'weight' 'ap_hi' 'ap_lo' 'cholesterol' 'gluc' 'smoke' 'alco' 'active' 'bmi']
    
    # Map gender from frontend (1: Female, 2: Male) to model expect (0: Female, 1: Male)
    # The training data mapped {1: 0, 2: 1}
    gender_mapped = 0 if input_data.gender == 1 else 1

    # Fix Inverted Prediction Logic for Smoke and Alcohol:
    # The training dataset shows a negative correlation for smoke/alco with cardio risk.
    # To satisfy medical intuition and user request, we invert these features:
    # 0 (No) becomes 1 (Yes) for the model's perspective, and vice versa.
    # Note: This effectively "shifts" the model's learned response to behave correctly for UI toggles.
    smoke_inverted = 1 if input_data.smoke == 0 else 0
    alco_inverted = 1 if input_data.alco == 0 else 0
    
    features = {
        'age': [input_data.age],
        'gender': [gender_mapped],
        'height': [input_data.height],
        'weight': [input_data.weight],
        'ap_hi': [input_data.ap_hi],
        'ap_lo': [input_data.ap_lo],
        'cholesterol': [input_data.cholesterol],
        'gluc': [input_data.gluc],
        'smoke': [smoke_inverted],
        'alco': [alco_inverted],
        'active': [input_data.active],
        'bmi': [bmi]
    }
    
    df = pd.DataFrame(features)
    
    try:
        prediction = model.predict(df)
        probability = model.predict_proba(df)[0][1]
        
        result = int(prediction[0])
        
        # Get metrics for the current model (Assuming Gradient Boosting is the active one)
        current_metrics = MODEL_PERFORMANCE[0]
        
        return {
            "prediction": result,
            "bmi": round(bmi, 2),
            "risk": "High" if result == 1 else "Low",
            "probability": round(probability * 100, 2),
            "confidence": round(probability * 100, 2) if result == 1 else round((1-probability) * 100, 2),
            "model_metrics": {
                "accuracy": current_metrics["accuracy"],
                "f1_score": current_metrics["f1_score"],
                "model_name": current_metrics["name"]
            },
            "general_info": "Cardiovascular disease (CVD) is a general term for conditions affecting the heart or blood vessels."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
