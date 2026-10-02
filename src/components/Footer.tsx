import React from 'react';
import { Shield, ExternalLink, Globe2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-16 pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-black text-sm">
                W
              </div>
              <span className="text-xl font-extrabold tracking-tight">Weathex</span>
              <span className="text-xs font-mono text-slate-500 uppercase">| SANKET</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Event-Centric Probabilistic Extreme-Weather Intelligence for NEPS-G. Converting 23-member ensembles into persistent storm entities with calibrated uncertainty, 5 km residual diffusion downscaling, and exposure-aware alerts.
            </p>
            <div className="text-[11px] text-slate-500">
              Operational Decision Support &middot; Developed for NCMRWF, IMD, NDRF, and State Disaster Management Authorities.
            </div>
          </div>

          {/* Core Science Modules */}
          <div className="space-y-2 text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">Scientific Modules</span>
            <ul className="space-y-1.5 text-slate-400">
              <li>Icosahedral Spherical GNN Engine</li>
              <li>CorrDiff Residual Diffusion Downscaling (5 km)</li>
              <li>Forecast Delta Cycle Comparator (A/B)</li>
              <li>Extreme Value Calibration (GEV / Tail-Weighted)</li>
              <li>Non-Stationarity Dual Baselines</li>
            </ul>
          </div>

          {/* Operational Governance */}
          <div className="space-y-2 text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">Governance &amp; Trust</span>
            <ul className="space-y-1.5 text-slate-400">
              <li>Human-in-the-Loop Verification</li>
              <li>Append-Only Audit Logging</li>
              <li>Hysteresis Alert Lifecycle</li>
              <li>NDRF Resource Pre-Positioning</li>
              <li>Agricultural Crop Stage Matrix</li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Weathex &middot; SANKET Intelligence Platform. Decision support prototype. Official warnings issued exclusively by India Meteorological Department (IMD).
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>NEPS-G 23-Member Ensemble</span>
            <span>&middot;</span>
            <span>IMDAA Climatology</span>
            <span>&middot;</span>
            <span>CHIRPS High-Res Proxy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
