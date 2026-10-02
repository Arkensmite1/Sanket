import React, { useState } from 'react';
import { ExtremeEvent } from '../types/weather';
import { X, ArrowRight, Compass, ShieldAlert, Sparkles, AlertTriangle, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

interface ForecastDeltaModalProps {
  event: ExtremeEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const ForecastDeltaModal: React.FC<ForecastDeltaModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 for interactive A/B swipe
  const delta = event.forecast_delta;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
              <span>SANKET Forecast Delta Engine</span>
              <span>·</span>
              <span>Significance-Gated Comparison</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Cycle Comparison: {delta.vs_cycle} → {delta.current_cycle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Entity: <span className="font-semibold text-slate-800">{event.name} ({event.id})</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Significance Alert Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
          delta.is_statistically_significant 
            ? 'bg-amber-50/90 border-amber-200/90 text-amber-950' 
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {delta.is_statistically_significant 
                  ? 'Statistically Significant Delta Detected' 
                  : 'Cycle Jitter Within Baseline Noise'}
              </span>
              <span className="text-xs font-mono font-medium text-amber-800">
                · Exceeds Jitter Gate (&gt;40 km / 5 m/s)
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              {delta.computed_narrative}
            </p>
          </div>
        </div>

        {/* 6 Key Computed Delta Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Centroid Track Shift
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black font-mono tabular-nums text-slate-900">
                {delta.track_shift_km} km
              </span>
              <span className="text-xs font-semibold text-sky-700">
                {delta.bearing_deg}° ({delta.bearing_cardinal})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Shifted NNE toward Sundarbans
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Intensity Shift (Peak Wind)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black font-mono tabular-nums text-rose-600">
                +{delta.delta_peak_wind_kmh} km/h
              </span>
              <span className="text-xs font-mono tabular-nums text-slate-500">
                (Median +{delta.delta_median_wind_kmh})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Central pressure deepened by 8 hPa
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Landfall Arrival Delta
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black font-mono tabular-nums text-indigo-600">
                {delta.delta_arrival_hours} hrs
              </span>
              <span className="text-xs font-semibold text-indigo-700">
                Earlier
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Forward speed accelerated by 2.2 m/s
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Probability Escalation (ΔP)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black font-mono tabular-nums text-slate-900">
                +{delta.probability_change_percent}%
              </span>
              <span className="text-xs font-semibold text-slate-500">
                → 88%
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Tighter cross-member agreement
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Impact Area Change
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black font-mono tabular-nums text-slate-900">
                +{delta.area_change_sqkm.toLocaleString()} km²
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Severe gust footprint expanded
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Alert Lifecycle Transition
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs font-medium text-slate-600">Watch</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs font-bold text-rose-600 uppercase">Severe Warning</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Hysteresis threshold confirmed
            </span>
          </div>

        </div>

        {/* Interactive A/B Swipe Visualizer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Cycle 00Z Corridor (Previous)
            </span>
            <span className="text-slate-400 font-mono">Interactive A/B Swipe</span>
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Cycle 12Z Corridor (Latest)
            </span>
          </div>

          {/* Graphical A/B Split Viewer */}
          <div className="relative h-44 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
            
            {/* Background Map Graphic representation */}
            <div className="absolute inset-0 flex items-center justify-around opacity-30 pointer-events-none">
              <div className="text-slate-600 font-black text-4xl">BAY OF BENGAL</div>
            </div>

            {/* Previous 00Z Track (Left side) */}
            <div 
              className="absolute inset-0 border-r-2 border-white pointer-events-none transition-all"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0 bg-slate-900/60" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-16 rounded-full border-2 border-dashed border-slate-400 bg-slate-400/20 rotate-[-25deg] flex items-center justify-center">
                <span className="text-xs text-white font-mono font-bold">00Z Track: Sagar W</span>
              </div>
            </div>

            {/* Latest 12Z Track (Right side) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <div className="absolute inset-0 bg-rose-950/40" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 translate-x-12 -translate-y-4 w-52 h-20 rounded-full border-2 border-rose-500 bg-rose-500/30 rotate-[-18deg] flex items-center justify-center shadow-lg">
                <span className="text-xs text-rose-200 font-mono font-bold">12Z Track: Sundarbans Core</span>
              </div>
            </div>

            {/* Split Drag Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-slate-800 text-[10px] font-bold">
                ↔
              </div>
            </div>

            {/* Invisible Range Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Drag slider to inspect cycle shifts</span>
            <span>Vector magnitude: 46.2 km (Direction 032° NNE)</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Acknowledge Delta &amp; Close
          </button>
        </div>

      </div>
    </div>
  );
};
