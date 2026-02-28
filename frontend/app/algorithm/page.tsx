"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Check,
  Info,
  AlertCircle,
  Zap,
  TrendingUp,
  Sliders,
  Target,
  Shield,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface DataStats {
  best_models: {
    name: string;
    f1_score: number;
    accuracy: number;
  }[];
  active_model_details: {
    name: string;
    confusion_matrix: number[][];
    roc_auc_score: number;
    metrics_analyzed: number;
    hyperparameters?: {
      learning_rate: number;
      n_estimators: number;
      max_depth: number;
    };
  };
}

export default function AlgorithmPage() {
  const [stats, setStats] = useState<DataStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/insights`
        );
        if (!response.ok) throw new Error("Failed to fetch insights");
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );

  if (error || !stats)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Metrics Unavailable</h2>
          <p className="text-slate-500 mb-6">
            Could not load the latest model performance data.
          </p>
          <Link
            href="/"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    );

  // Dynamic metrics calculation
  const mainModel = stats.best_models[0];
  const matrix = stats.active_model_details.confusion_matrix;

  // Precision: TP / (TP + FP)
  const tp = matrix[1][1];
  const fp = matrix[0][1];
  const precision = (tp / (tp + fp)) * 100;

  // Recall: TP / (TP + FN)
  const fn = matrix[1][0];
  const recall = (tp / (tp + fn)) * 100;

  const metrics = {
    name: mainModel.name,
    accuracy: (mainModel.accuracy * 100).toFixed(1),
    f1: (mainModel.f1_score * 100).toFixed(1),
    precision: precision.toFixed(1),
    recall: recall.toFixed(1),
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16 mt-8 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wide uppercase mb-6">
            <Zap className="w-3 h-3" />
            Model Architecture
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            {metrics.name}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            An ensemble learning technique that builds models sequentially, with
            each new model attempting to correct the errors of the previous
            ones. It is our top-performing algorithm for cardiovascular risk
            prediction.
          </p>
        </div>
      </div>

      {/* Performance Analysis Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-600" />
          Performance Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Accuracy */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <p className="text-sm text-slate-500 font-medium mb-1">Accuracy</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                {metrics.accuracy}
              </span>
              <span className="text-sm text-slate-400">%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${metrics.accuracy}%` }}
              />
            </div>
          </div>

          {/* Precision */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <p className="text-sm text-slate-500 font-medium mb-1">Precision</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                {metrics.precision}
              </span>
              <span className="text-sm text-slate-400">%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${metrics.precision}%` }}
              />
            </div>
          </div>

          {/* Recall */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <p className="text-sm text-slate-500 font-medium mb-1">Recall</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                {metrics.recall}
              </span>
              <span className="text-sm text-slate-400">%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${metrics.recall}%` }}
              />
            </div>
          </div>

          {/* F1 Score */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <p className="text-sm text-slate-500 font-medium mb-1">F1 Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                {metrics.f1}
              </span>
              <span className="text-sm text-slate-400">%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${metrics.f1}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confusion Matrix Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Target className="w-6 h-6 text-indigo-600" />
          Model Decision Matrix
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group p-8 bg-slate-50 rounded-3xl border border-slate-100">
            {/* Matrix Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-[440px] mx-auto">
              {/* Header Labels */}
              <div className="col-start-1 text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Predicted: Healthy
              </div>
              <div className="col-start-2 text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Predicted: Risk
              </div>

              {/* Row 1: Actual Healthy */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group/cell hover:border-emerald-200 transition-all duration-300">
                <div className="absolute inset-0 bg-emerald-500/[0.03] opacity-0 group-hover/cell:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold text-emerald-600/40 absolute top-3 left-3 font-mono">
                  TN
                </span>
                <span className="text-3xl font-bold text-slate-900 relative z-10">
                  {matrix[0][0]}
                </span>
                <span className="text-[10px] text-slate-500 relative z-10 mt-1 font-bold">
                  True Negative
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group/cell hover:border-red-200 transition-all duration-300">
                <div className="absolute inset-0 bg-red-500/[0.03] opacity-0 group-hover/cell:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold text-red-600/40 absolute top-3 left-3 font-mono">
                  FP
                </span>
                <span className="text-3xl font-bold text-slate-900 relative z-10">
                  {matrix[0][1]}
                </span>
                <span className="text-[10px] text-slate-500 relative z-10 mt-1 font-bold">
                  False Positive
                </span>
              </div>

              {/* Row 2: Actual Risk */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group/cell hover:border-amber-200 transition-all duration-300">
                <div className="absolute inset-0 bg-amber-500/[0.03] opacity-0 group-hover/cell:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold text-amber-600/40 absolute top-3 left-3 font-mono">
                  FN
                </span>
                <span className="text-3xl font-bold text-slate-900 relative z-10">
                  {matrix[1][0]}
                </span>
                <span className="text-[10px] text-slate-500 relative z-10 mt-1 font-bold">
                  False Negative
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group/cell hover:border-indigo-200 transition-all duration-300">
                <div className="absolute inset-0 bg-indigo-500/[0.03] opacity-0 group-hover/cell:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold text-indigo-600/40 absolute top-3 left-3 font-mono">
                  TP
                </span>
                <span className="text-3xl font-bold text-slate-900 relative z-10">
                  {matrix[1][1]}
                </span>
                <span className="text-[10px] text-slate-500 relative z-10 mt-1 font-bold">
                  True Positive
                </span>
              </div>
            </div>

            {/* Side Label */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap hidden sm:block">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Shield className="w-3 h-3 rotate-90" />
                Actual Status
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                Matrix Interpretation
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                The confusion matrix displays the raw decision values. Higher
                values on the
                <span className="mx-1 font-bold text-indigo-600 underline decoration-indigo-200 underline-offset-4 tracking-tight">
                  Main Diagonal
                </span>{" "}
                (TN and TP) indicate superior model performance and correct
                classifications.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Total Test Cases
                  </p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">
                    {(
                      matrix[0][0] +
                      matrix[0][1] +
                      matrix[1][0] +
                      matrix[1][1]
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">
                    ROC AUC Score
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 tracking-tight">
                    {(stats.active_model_details.roc_auc_score * 100).toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white/60 text-xs italic flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-500 rounded-full" />
              "Balanced performance across sensitivity and specificity is
              essential for clinical diagnostic reliability."
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* How it Works */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              How it Works
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Gradient Boosting works by combining several "weak learners"
              (typically shallow decision trees) into a strong predictive model.
              Unlike Random Forest, which builds trees independently, Gradient
              Boosting builds trees one at a time, where each new tree helps to
              correct errors made by previously trained trees.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h4 className="font-semibold text-slate-900 mb-2">
                Why this model?
              </h4>
              <p className="text-sm text-slate-600">
                This iterative approach allows the model to capture complex,
                non-linear relationships in the cardiovascular data, such as the
                interaction between Age, Cholesterol, and Systolic Blood
                Pressure, resulting in higher accuracy than simpler linear
                models.
              </p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                Advantages
              </h3>
              <ul className="space-y-3">
                {[
                  "High predictive accuracy",
                  "Handles non-linear data well",
                  "Robust to outliers",
                  "Provides feature importance scores",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-emerald-800 text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 rounded-3xl p-8 border border-amber-100">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Limitations
              </h3>
              <ul className="space-y-3">
                {[
                  "Computationally expensive to train",
                  "Prone to overfitting if not tuned",
                  "Slower prediction time than Logistic Regression",
                  "Less interpretable than single trees",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-amber-800 text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl shadow-indigo-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <Sliders className="w-5 h-5 text-indigo-400" />
              Key Hyperparameters
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                  Learning Rate
                </p>
                <p className="text-2xl font-bold">
                  {stats.active_model_details.hyperparameters?.learning_rate ??
                    "0.1"}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Controls contribution of each tree
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                  n_estimators
                </p>
                <p className="text-2xl font-bold">
                  {stats.active_model_details.hyperparameters?.n_estimators ??
                    "100"}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Number of boosting stages
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                  max_depth
                </p>
                <p className="text-2xl font-bold">
                  {stats.active_model_details.hyperparameters?.max_depth ?? "3"}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Maximum depth of individual estimators
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">
              Model Version
            </h3>
            <p className="text-indigo-700 font-mono text-sm mb-4">v2.1.0-gbc</p>
            <p className="text-indigo-600/80 text-sm leading-relaxed">
              Trained on 70,000 patient records using 10-fold cross-validation
              for robustness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
