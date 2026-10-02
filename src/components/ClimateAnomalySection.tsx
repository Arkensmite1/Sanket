import React, { useState } from 'react';
import { TrendingUp, Calendar, AlertTriangle, Layers, ArrowUpRight, BarChart2 } from 'lucide-react';

export const ClimateAnomalySection: React.FC = () => {
  const [baselineMode, setBaselineMode] = useState<'dual' | 'historical' | 'recent'>('dual');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
          <span>SANKET Non-Stationarity Climatology</span>
          <span>·</span>
          <span>Part 36: Dual Baseline Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Climate Change &amp; Trend-Adjusted Baseline Engine
        </h2>
        <p className="text-sm text-slate-500 max-w-3xl mt-1 leading-relaxed">
          A static 30-year normal (1961–1990) fails to reflect modern atmospheric heat capacity. SANKET computes dual baselines: tracking how extreme an event is against recent climatology (&quot;unusual now&quot;) versus long-term historical records (&quot;unusual in historical context&quot;).
        </p>
      </div>

      {/* Baseline Mode Toggle */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg w-fit border border-slate-200">
        <button
          onClick={() => setBaselineMode('dual')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            baselineMode === 'dual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dual Baseline View (Recommended)
        </button>
        <button
          onClick={() => setBaselineMode('recent')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            baselineMode === 'recent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Recent Baseline (2005–2025 Trend-Adjusted)
        </button>
        <button
          onClick={() => setBaselineMode('historical')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            baselineMode === 'historical' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Historical Baseline (1961–1990 WMO Standard)
        </button>
      </div>

      {/* Dual Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Relative to Recent Baseline ("Unusual Now") */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">View 1 · Operational Triage</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">&quot;Unusual Now&quot; (Recent Baseline)</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              2005–2025 μ(d)
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Standardised anomaly calibrated against the last 20 years plus robust linear trend term: <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">μ(y,d) = μ₀(d) + β(d)·(y - y₀)</code>. Prevents over-issuing heat warnings for temperatures that have become frequent in the current decade.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Event Anomaly</span>
              <span className="text-xl font-black font-mono tabular-nums text-slate-900">+3.1 σ</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 0.8% recent exceedance</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">EFI Departure</span>
              <span className="text-xl font-black font-mono tabular-nums text-slate-900">+0.84</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Model M-Climate reference</span>
            </div>
          </div>
        </div>

        {/* Card 2: Relative to Historical Baseline ("Unusual vs History") */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">View 2 · Climate Context</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">&quot;Unusual in History&quot; (1961–1990)</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              Pre-Warming μ₀
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Standardised anomaly relative to the fixed mid-20th-century climate. Demonstrates the cumulative background warming forcing and severe heat dome expansion over the Indo-Gangetic basin.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Historical Exceedance</span>
              <span className="text-xl font-black font-mono tabular-nums text-rose-600">+5.4 σ</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">1-in-120 year historical tail</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Regime Drift Ratio</span>
              <span className="text-xl font-black font-mono tabular-nums text-slate-900">4.8&times;</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Frequency increase vs 1970</span>
            </div>
          </div>
        </div>

      </div>

      {/* Explanatory Quote banner */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 block">SANKET Methodology Principle</span>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            &quot;Heat extremes will look less extreme against a warming baseline, and both views matter to users: operational responders need to know what exceeds today&apos;s adaptive limits, while policy makers must see long-term degradation.&quot;
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] font-mono text-slate-400 block">Specification Reference</span>
          <span className="text-xs font-bold text-slate-200">Section 36</span>
        </div>
      </div>

    </div>
  );
};
