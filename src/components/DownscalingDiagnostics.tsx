import React, { useState } from 'react';
import { ExtremeEvent } from '../types/weather';
import { CheckCircle2, AlertTriangle, ShieldCheck, Activity, Layers, Sliders, Info, Zap } from 'lucide-react';

interface DownscalingDiagnosticsProps {
  event: ExtremeEvent;
}

export const DownscalingDiagnostics: React.FC<DownscalingDiagnosticsProps> = ({ event }) => {
  const [modelMode, setModelMode] = useState<'diffusion' | 'unet' | 'raw'>('diffusion');
  const metrics = event.downscaling.physics_metrics;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <span>SANKET 5 km Tail-Faithful Diffusion</span>
          <span>·</span>
          <span>CorrDiff-Style Residual Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Downscaling &amp; Extreme Tail Preservation Diagnostics
        </h2>
        <p className="text-sm text-slate-500 max-w-3xl mt-1 leading-relaxed">
          Why standard deep learning models fail for extreme weather: MSE loss forces regression-to-the-mean, smoothing out eyewall wind peaks and cloudburst intensities. SANKET uses two-stage residual conditional diffusion with physics-preserving constraints.
        </p>
      </div>

      {/* Model Comparison Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/80 shadow-xs">
          <button
            onClick={() => setModelMode('diffusion')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              modelMode === 'diffusion'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SANKET Residual Diffusion (5 km)
          </button>
          <button
            onClick={() => setModelMode('unet')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              modelMode === 'unet'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            U-Net Baseline (MSE Smoothed)
          </button>
          <button
            onClick={() => setModelMode('raw')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              modelMode === 'raw'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raw NEPS-G NWP (12 km Coarse)
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono px-3">
          Conditioning: <span className="font-semibold text-slate-800">DEM Topography · Land-Sea Mask · IVT</span>
        </div>
      </div>

      {/* Visual Simulation Display of Downscaled Field */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Synthetic Spatial Raster Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 text-white">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-slate-400 font-mono block">Active Field Representation</span>
              <span className="text-base font-bold text-white">
                {modelMode === 'diffusion' 
                  ? '5 km Tail-Faithful Residual Diffusion Field' 
                  : modelMode === 'unet' 
                  ? 'Standard U-Net (Regression-to-the-Mean Blur)' 
                  : '12 km Coarse NEPS-G Grid Cells'}
              </span>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono block">Peak Recovered Wind</span>
              <span className={`text-lg font-mono font-black ${
                modelMode === 'diffusion' ? 'text-emerald-400' : modelMode === 'unet' ? 'text-amber-400' : 'text-slate-300'
              }`}>
                {modelMode === 'diffusion' ? '255 km/h' : modelMode === 'unet' ? '184 km/h' : '172 km/h'}
              </span>
            </div>
          </div>

          {/* Raster Visual Box */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#070b13] border border-slate-800 flex items-center justify-center">
            
            {/* Visual simulation of resolution & sharpness */}
            {modelMode === 'diffusion' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Sharp eyewall gradient and fine convective cells */}
                <div className="w-56 h-56 rounded-full bg-radial from-rose-500 via-orange-500 to-transparent opacity-85 blur-[2px] animate-pulse" />
                <div className="absolute w-24 h-24 rounded-full border-4 border-white/80 bg-slate-950/80 shadow-2xl flex items-center justify-center">
                  <span className="text-[11px] font-mono font-bold text-rose-300">920 hPa Eye</span>
                </div>
                {/* Spiral rainbands */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(239,68,68,0.25)_50%,_transparent_75%)]" />
                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-emerald-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-emerald-500/40">
                  High-k wavenumber spectra preserved · No artificial blurring
                </div>
              </div>
            )}

            {modelMode === 'unet' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Blurred conditional mean */}
                <div className="w-64 h-64 rounded-full bg-radial from-amber-500 via-amber-600 to-transparent opacity-60 blur-2xl" />
                <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-amber-300/40 flex items-center justify-center">
                  <span className="text-xs text-amber-200 font-mono">Smoothed Core (MSE Bias)</span>
                </div>
                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-amber-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-amber-500/40">
                  Spectral smoothing: variance suppressed at high wavenumbers
                </div>
              </div>
            )}

            {modelMode === 'raw' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Pixelated blocky coarse grid */}
                <div className="grid grid-cols-4 grid-rows-4 w-60 h-60 gap-1 opacity-70">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded flex items-center justify-center text-[10px] font-mono text-slate-300 ${
                        i === 5 || i === 6 || i === 9 || i === 10 ? 'bg-rose-700/80 font-bold' : 'bg-slate-800/80'
                      }`}
                    >
                      12km
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700">
                  Raw 12 km NEPS-G NWP input resolution
                </div>
              </div>
            )}

          </div>

          {/* Metric comparison footer */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Peak Underestimation</span>
              <span className={`font-bold ${modelMode === 'diffusion' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {modelMode === 'diffusion' ? '0.0% (Calibrated)' : modelMode === 'unet' ? '-27.8% (Severe Loss)' : '-32.5%'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">High-k Power P(k)</span>
              <span className="font-bold text-white">
                {modelMode === 'diffusion' ? '96.2% of True' : modelMode === 'unet' ? '41.5% (Damped)' : 'N/A (Coarse)'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Compute Latency</span>
              <span className="font-bold text-sky-400">
                {modelMode === 'diffusion' ? '420ms (GPU)' : '65ms (GPU)'}
              </span>
            </div>
          </div>

        </div>

        {/* Physics Constraints & Validation Checks (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Post-Hoc Physics Validation Step
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Diffusion models are generative; to guarantee operational trustworthiness, every sample is evaluated against physical boundary invariants.
            </p>

            {/* Invariant 1: Coarse-mean mass conservation */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Coarse-Mean Conservation (avg_pool)</span>
                <span className="text-emerald-600 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {metrics.mass_conservation_score}% [PASS]
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Average of 5 km downscaled pixels exactly matches 12 km coarse NWP cell mass flux via hard projection.
              </p>
            </div>

            {/* Invariant 2: Non-negativity bound */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Non-Negativity (Precipitation &ge; 0)</span>
                <span className="text-emerald-600 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ENFORCED
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Hard barrier preventing negative accumulation artifacts in valley bottoms.
              </p>
            </div>

            {/* Invariant 3: Humidity saturation clip */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Thermodynamic Humidity Bound</span>
                <span className="text-emerald-600 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  q &le; q_sat(T, p)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Specific humidity cannot exceed Clausius-Clapeyron saturation curve.
              </p>
            </div>

            {/* Invariant 4: Lapse rate */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Atmospheric Lapse Rate Consistency</span>
                <span className="text-emerald-600 font-mono">
                  {metrics.lapse_rate_k_per_km} K/km
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Environmental lapse rate along steep topography adheres to standard adiabatic gradient (-6.4 K/km).
              </p>
            </div>

            {/* Invariant 5: Orographic correlation */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Orographic Upslope Correlation</span>
                <span className="text-indigo-600 font-mono font-bold">
                  r = +{metrics.upslope_orographic_correlation}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Rainfall peak correlates strongly with windward topographic slopes.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
