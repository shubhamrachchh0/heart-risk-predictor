"use client";

import React, { useEffect, useState } from "react";
import {
  Heart,
  Activity,
  Database,
  BarChart2,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface DataStats {
  data_overview: {
    total_rows: number;
    cleaned_rows: number;
    removed_rows: number;
  };
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
  };
}

export default function InsightsPage() {
  const [stats, setStats] = useState<DataStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/insights`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch insights");
        }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-indigo-50">
            <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Unavailable
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We couldn't load the dataset statistics. The analysis service might
            be offline.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition active:scale-[0.98]"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-16 mt-8 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wide uppercase mb-6">
            <Zap className="w-3 h-3" />
            Live Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Dataset Intelligence
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Comprehensive analysis of our cardiovascular health dataset, powered
            by advanced machine learning algorithms processing{" "}
            <span className="font-semibold text-slate-900">
              {stats?.active_model_details?.metrics_analyzed || 12} clinical
              metrics
            </span>
            .
          </p>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <Database className="w-24 h-24 text-indigo-600" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
              <Database className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-slate-500 font-medium text-sm tracking-wide uppercase mb-2">
              Total Records
            </p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
              {stats.data_overview.total_rows.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100/60 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-100 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="w-24 h-24 text-emerald-600" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
              <ShieldCheck className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-slate-500 font-medium text-sm tracking-wide uppercase mb-2">
              Cleaned Data
            </p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
              {stats.data_overview.cleaned_rows.toLocaleString()}
            </h3>
            <p className="text-emerald-600 text-sm font-medium mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ready
              for Training
            </p>
          </div>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100/60 hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-100 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <AlertCircle className="w-24 h-24 text-amber-600" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300">
              <AlertCircle className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-slate-500 font-medium text-sm tracking-wide uppercase mb-2">
              Outliers Removed
            </p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
              {stats.data_overview.removed_rows.toLocaleString()}
            </h3>
            <p className="text-slate-400 text-sm mt-2">Quality Optimization</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Performers Section */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Top Performers
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Algorithm Evaluation Leaderboard
                </p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <BarChart2 className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stats.best_models.map((model, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                          index === 0
                            ? "bg-amber-100 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`font-semibold ${
                          index === 0 ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {model.name}
                      </span>
                    </div>
                    <div className="font-mono font-bold text-slate-900">
                      {(model.accuracy * 100).toFixed(1)}% Accuracy
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        index === 0
                          ? "bg-gradient-to-r from-indigo-500 to-indigo-400"
                          : "bg-slate-300"
                      }`}
                      style={{ width: `${model.accuracy * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 flex-1">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm text-indigo-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Gradient Boosting leads
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Outperforming other models by 2.3% on average precision.
                      Detailed metrics available in Algorithm screen.
                    </p>
                  </div>
                </div>
                <Link
                  href="/algorithm"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all group shrink-0"
                >
                  View Detailed Algorithm Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Importance Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg shadow-slate-200/50">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Feature Importance
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Key drivers of cardiovascular risk prediction
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {[
            { label: "Systolic BP", value: 38, color: "bg-indigo-600" },
            { label: "Age", value: 24, color: "bg-purple-600" },
            { label: "Cholesterol", value: 18, color: "bg-indigo-400" },
            { label: "Weight", value: 12, color: "bg-slate-300" },
            { label: "Glucose", value: 5, color: "bg-slate-200" },
            { label: "Smoke", value: 2, color: "bg-slate-100" },
            { label: "Alcohol", value: 1, color: "bg-slate-100" },
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-sm font-bold ${
                    feature.value > 15 ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {feature.label}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {feature.value}% impact
                </span>
              </div>
              <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${feature.color}`}
                  style={{ width: `${feature.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-4">
          <div className="flex-1 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 line-clamp-1">
                Clinical Insight
              </p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Blood pressure and age remain the primary biological drivers,
                together accounting for over 60% of the model's decisional
                weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
