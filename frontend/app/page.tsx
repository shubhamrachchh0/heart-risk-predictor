import React from 'react';
import { Heart, Activity, Brain, Shield, Zap, Database, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50  transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-r from-blue-100/50 to-purple-100/50   blur-3xl -z-10 rounded-full opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50  border border-blue-100  text-blue-600  rounded-full text-sm font-medium mb-8 animate-fade-in-up">
              <Activity className="w-4 h-4" />
              <span>Next-Gen Health Analytics</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900  mb-8 leading-tight tracking-tight">
              Advanced <span className="bg-gradient-to-r from-blue-600 to-indigo-600   bg-clip-text text-transparent">Cardiovascular</span> <br />
              Risk Intelligence
            </h1>

            <p className="text-xl text-slate-600  mb-10 leading-relaxed max-w-2xl mx-auto">
              Leveraging state-of-the-art machine learning algorithms to provide accurate, real-time heart health assessments with medically validated parameters.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/predict">
                <button className="px-8 py-4 bg-blue-600  text-white rounded-full text-lg font-semibold hover:bg-blue-700  transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 flex items-center gap-2">
                  Check Your Risk <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href="#cvd-info" className="px-8 py-4 bg-white  text-slate-700  rounded-full text-lg font-semibold hover:bg-slate-50  transition border border-slate-200  flex items-center gap-2">
                Learn About CVD
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding CVD Section */}
      <section id="cvd-info" className="py-24 px-6 bg-white  border-y border-slate-100 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-slate-50  rounded-2xl p-8 border border-slate-100 ">
                <h3 className="text-2xl font-bold text-slate-900  mb-6">Why Early Detection Matters?</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100  flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-red-600 " />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900  text-lg">Leading Cause of Death</h4>
                      <p className="text-slate-600  mt-1">CVD counts for 17.9 million deaths annually. Early intervention can prevent severe outcomes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100  flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-blue-600 " />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900  text-lg">Silent Progression</h4>
                      <p className="text-slate-600  mt-1">Many symptoms go unnoticed until a major event occurs. Regular screening is vital.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100  flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-emerald-600 " />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900  text-lg">Preventable Factors</h4>
                      <p className="text-slate-600  mt-1">Lifestyle changes can drastically reduce risk if identified early enough.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900  mb-6">Understanding Cardiovascular Disease</h2>
              <p className="text-lg text-slate-600  mb-6 leading-relaxed">
                Cardiovascular diseases (CVDs) are a group of disorders of the heart and blood vessels. They include coronary heart disease, cerebrovascular disease, rheumatic heart disease and other conditions.
              </p>
              <p className="text-lg text-slate-600  mb-8 leading-relaxed">
                Our AI-powered tool focuses on identifying the key risk factors—such as hypertension, cholesterol levels, and lifestyle habits—to estimate the likelihood of CVD presence, empowering you with knowledge to take proactive steps.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50  rounded-xl border border-slate-100 ">
                  <span className="block text-3xl font-bold text-blue-600  mb-1">80%</span>
                  <span className="text-sm text-slate-500 ">Premature heart attacks preventable</span>
                </div>
                <div className="p-4 bg-slate-50  rounded-xl border border-slate-100 ">
                  <span className="block text-3xl font-bold text-emerald-600  mb-1">24/7</span>
                  <span className="text-sm text-slate-500 ">Access to instant risk assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Grid */}
      <section className="py-24 px-6 bg-slate-50 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900  mb-4">Why Trust Our Model?</h2>
            <p className="text-xl text-slate-600  max-w-2xl mx-auto">Built on thousands of clinical records and validated with rigorous statistical testing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 rounded-2xl bg-white  border border-slate-200  hover:border-blue-500  transition-all hover:shadow-xl hover:shadow-blue-500/10">
              <div className="w-12 h-12 bg-blue-100  rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-blue-600 " />
              </div>
              <h3 className="text-xl font-bold text-slate-900  mb-2">Advanced AI</h3>
              <p className="text-slate-600 ">Powered by Gradient Boosting algorithms optimized for medical data classification.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white  border border-slate-200  hover:border-emerald-500  transition-all hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="w-12 h-12 bg-emerald-100  rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-emerald-600 " />
              </div>
              <h3 className="text-xl font-bold text-slate-900  mb-2">High Accuracy</h3>
              <p className="text-slate-600 ">Achieving 73.4% accuracy with balanced precision and recall metrics.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white  border border-slate-200  hover:border-purple-500  transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-purple-100  rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-purple-600 " />
              </div>
              <h3 className="text-xl font-bold text-slate-900  mb-2">Secure & Private</h3>
              <p className="text-slate-600 ">All predictions happen in real-time. No personal health data is permanently stored.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white  border border-slate-200  hover:border-orange-500  transition-all hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-12 h-12 bg-orange-100  rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-orange-600 " />
              </div>
              <h3 className="text-xl font-bold text-slate-900  mb-2">Instant Results</h3>
              <p className="text-slate-600 ">Get your risk assessment in milliseconds, enabling immediate decision making.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}