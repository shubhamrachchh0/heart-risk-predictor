"use client";

import React, { useState } from "react";
import {
  Heart,
  User,
  Activity,
  Droplet,
  TrendingUp,
  AlertCircle,
  Check,
  Info,
  ArrowRight,
  X,
  Cigarette,
  Wine,
  Bike,
} from "lucide-react";
import Link from "next/link";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    glucose: "",
    smoke: false,
    alcohol: false,
    active: false,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const genderVal = formData.gender === "male" ? 2 : 1;

      const payload = {
        age: parseInt(formData.age),
        gender: genderVal,
        height: parseInt(formData.height),
        weight: parseFloat(formData.weight),
        ap_hi: parseInt(formData.systolic),
        ap_lo: parseInt(formData.diastolic),
        cholesterol:
          formData.cholesterol === "normal"
            ? 1
            : formData.cholesterol === "above"
            ? 2
            : 3,
        gluc:
          formData.glucose === "normal"
            ? 1
            : formData.glucose === "above"
            ? 2
            : 3,
        smoke: formData.smoke ? 1 : 0,
        alco: formData.alcohol ? 1 : 0,
        active: formData.active ? 1 : 0,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // BMI Calculation
  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null;
    const heightM = parseFloat(formData.height) / 100;
    const weightKg = parseFloat(formData.weight);
    if (isNaN(heightM) || isNaN(weightKg) || heightM === 0) return null;
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  const bmi = calculateBMI();

  const getBMICategory = (bmiVal: string) => {
    const val = parseFloat(bmiVal);
    if (val < 25)
      return {
        label: "Normal",
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };
    if (val < 30)
      return {
        label: "Overweight",
        color: "bg-amber-100 text-amber-700 border-amber-200",
      };
    return { label: "Obese", color: "bg-red-100 text-red-700 border-red-200" };
  };

  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 max-w-5xl mx-auto flex items-center justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wide uppercase">
              <Activity className="w-3 h-3" />
              AI Risk Assessment
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Cardiovascular Risk Prediction
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Enter your clinical parameters to receive an instant, AI-powered
              risk assessment.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Section 1: Personal Info */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" /> Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="e.g. 45"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none font-medium"
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="e.g. 175"
                  />
                </div>
                <div className="space-y-2 relative">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-slate-700">
                      Weight (kg)
                    </label>
                    {bmi && bmiCategory && (
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${bmiCategory.color}`}
                      >
                        BMI: {bmi} ({bmiCategory.label})
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="e.g. 70"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Clinical Metrics */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" /> Clinical Vitals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Systolic BP
                  </label>
                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="mmHg (e.g. 120)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Diastolic BP
                  </label>
                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="mmHg (e.g. 80)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Cholesterol
                  </label>
                  <div className="relative">
                    <select
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none font-medium"
                    >
                      <option value="">Select Level...</option>
                      <option value="normal">Normal</option>
                      <option value="above">Above Normal</option>
                      <option value="high">Way Above Normal</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Glucose
                  </label>
                  <div className="relative">
                    <select
                      name="glucose"
                      value={formData.glucose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none font-medium"
                    >
                      <option value="">Select Level...</option>
                      <option value="normal">Normal</option>
                      <option value="above">Above Normal</option>
                      <option value="high">Way Above Normal</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Lifestyle */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" /> Lifestyle
                Factors
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "smoke", label: "Do you smoke?", icon: Cigarette },
                  {
                    name: "alcohol",
                    label: "Do you drink alcohol?",
                    icon: Wine,
                  },
                  {
                    name: "active",
                    label: "Do you exercise regularly?",
                    icon: Bike,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-700">
                        {item.label}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          [item.name]:
                            !formData[item.name as keyof typeof formData],
                        })
                      }
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        // @ts-ignore
                        formData[item.name] ? "bg-indigo-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${
                          // @ts-ignore
                          formData[item.name]
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-indigo-600 shadow-xl shadow-slate-900/10 hover:shadow-indigo-600/20 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Generate Risk Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400 font-medium leading-relaxed max-w-[300px] mx-auto">
              Due to inactivity, the server may go to sleep. Please wait about 1
              minute if the page is buffering
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Result Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          {!result ? (
            <div className="bg-slate-900 rounded-3xl p-10 text-center relative overflow-hidden text-white shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 py-12">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                  <Activity className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ready to Analyze</h3>
                <p className="text-white/60 leading-relaxed max-w-xs mx-auto">
                  Fill out the form to let our AI model calculate your
                  cardiovascular risk profile.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 animation-fade-in">
              <div
                className={`p-8 ${
                  result.risk === "High"
                    ? "bg-gradient-to-br from-red-500 to-rose-600"
                    : "bg-gradient-to-br from-emerald-500 to-teal-600"
                } text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 text-center py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
                    {result.risk === "High" ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                    Risk Analysis Result
                  </div>
                  <h2 className="text-5xl font-bold mb-2 tracking-tight">
                    {result.probability}%
                  </h2>
                  <p className="font-medium text-white/90 text-lg">
                    Probability of Cardiovascular Disease
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" /> Assessment
                    Summary
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.general_info}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-xl border ${
                    result.risk === "High"
                      ? "bg-red-50 border-red-100"
                      : "bg-emerald-50 border-emerald-100"
                  }`}
                >
                  <h4
                    className={`font-bold text-sm mb-1 ${
                      result.risk === "High"
                        ? "text-red-700"
                        : "text-emerald-700"
                    }`}
                  >
                    {" "}
                    Recommendation
                  </h4>
                  <p
                    className={`text-sm ${
                      result.risk === "High"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {result.risk === "High"
                      ? "Consult a healthcare professional for a detailed evaluation."
                      : "Maintain your healthy lifestyle habits and regular check-ups."}
                  </p>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="w-full mt-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition text-sm"
                >
                  Reset Analysis
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-slate-100/50 rounded-2xl border border-slate-200/50 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Medical Disclaimer:</strong> This tool is for educational
              purposes only and does not constitute medical advice or diagnosis.
              Always consult with a qualified healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
