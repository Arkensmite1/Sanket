import React from 'react';
import { ExtremeEvent } from '../types/weather';
import { HelpCircle, CheckCircle, BarChart3, History, Wind, Thermometer, ShieldAlert, Sparkles, X } from 'lucide-react';

interface WhyThisAlertPanelProps {
  event: ExtremeEvent;
  isOpen?: boolean;
  onClose?: () => void;
}

export const WhyThisAlertPanel: React.FC<WhyThisAlertPanelProps> = ({
  event,
  isOpen = true,
  onClose,
}) => {
  const why = event.why_this_alert;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
      
      {/* Top Banner */}
      <div className="flex items-start justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <span>Template-Driven Explainability</span>
            <span>·</span>
            <span>Meteorologist-Auditable Factors</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Why This Alert? Diagnostic Attribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Strictly derived from verified numerical fields — zero generative hallucination.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Explanatory Narrative Summary Box */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
        <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Operational Trigger Narrative</span>
        </span>
        <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
          {why.anomaly_summary} Threshold exceedance has persisted for <span className="font-bold underline">{why.persistence_hours} consecutive hours</span>, with <span className="font-bold underline">{event.agreeing_members} of {event.total_members} weighted ensemble members</span> confirming extreme core vorticity.
        </p>
      </div>

      {/* Diagnostic Drivers Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Synoptic Drivers */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Wind className="w-4 h-4 text-sky-600" />
            <span>Key Physical Synoptic Drivers</span>
          </span>
          <ul className="space-y-2 text-xs text-slate-600">
            {why.synoptic_drivers.map((driver, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quantile & Return Period */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-rose-600" />
            <span>Climatological Extreme Ranking</span>
          </span>
          
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Exceedance Rank</span>
              <span className="text-xl font-black font-mono text-rose-600">
                q = {event.climatological_percentile / 100}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 0.1% extreme</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">GEV Return Period</span>
              <span className="text-xl font-black font-mono text-slate-900">
                ~{event.return_period_years} Years
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Annual Maxima Fit</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-1">
            Terrain amplification: <span className="font-semibold text-slate-800">{why.terrain_influence_percent}%</span> of downscaled peak intensity is conditioned by coastal orography.
          </div>
        </div>

      </div>

      {/* Historical Analogues Engine ("Similar Past Situations") */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-amber-600" />
            <span>Historical Analogues from IMDAA/ERA5 Archive</span>
          </span>
          <span className="text-[11px] text-slate-400">
            PCA/Synoptic Embedding Nearest Neighbors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {why.analogues.map((analogue, aIdx) => (
            <div key={aIdx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{analogue.event_name}</span>
                <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                  {Math.round(analogue.similarity_score * 100)}% match
                </span>
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
                <div>Year: <span className="text-slate-800">{analogue.year}</span> · Min MSLP: <span className="text-slate-800">{analogue.min_mslp_hpa} hPa</span></div>
                <div>Landfall: <span className="text-slate-800 font-sans font-medium">{analogue.landfall_location}</span></div>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight pt-1 border-t border-slate-100">
                {analogue.observed_impact}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
