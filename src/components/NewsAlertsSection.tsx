import React from 'react';
import { ExtremeEvent } from '../types/weather';
import { Bell, Radio, FileText, CheckCircle2, AlertTriangle, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface NewsAlertsSectionProps {
  events: ExtremeEvent[];
  onSelectEvent: (event: ExtremeEvent) => void;
  onOpenGovernance: (event: ExtremeEvent) => void;
}

export const NewsAlertsSection: React.FC<NewsAlertsSectionProps> = ({
  events,
  onSelectEvent,
  onOpenGovernance,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
          <span>Official Bulletins &amp; Stateful Alert Lifecycle</span>
          <span>·</span>
          <span>IMD &amp; SDMA Advisory Distribution</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Active Bulletins &amp; Forecast Cycle Broadcasts
        </h2>
        <p className="text-sm text-slate-500 max-w-2xl mt-1">
          SANKET maintains one stateful alert per persistent event ID. New forecast cycles update the existing alert rather than spawning repetitive flood messages.
        </p>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {events.map((evt) => {
          const isSevere = evt.alert.level === 'Severe Warning';

          return (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    isSevere ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">{evt.name}</span>
                      <span className="text-[11px] font-mono text-slate-400">({evt.id})</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Target: {evt.landfall_location} · Window: {evt.arrival_window}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <span className={`w-2 h-2 rounded-full ${isSevere ? 'bg-rose-600' : 'bg-amber-500'}`} />
                    <span>{evt.alert.level}</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    State: {evt.alert.state}
                  </span>
                </div>
              </div>

              {/* Bulletin Text */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Authorized Synoptic Warning Statement</span>
                  <span className="text-slate-400 font-mono font-normal">Last Transmitted: {evt.alert.last_updated}</span>
                </div>
                <p className="leading-relaxed">
                  {evt.alert.meteorologist_notes}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                  <span>Signatory: <strong className="text-slate-700">{evt.alert.approved_by || 'Awaiting Chief Forecaster Sign-off'}</strong></span>
                  <span className="font-mono">P(Calibrated) = {Math.round(evt.calibrated_probability * 100)}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onSelectEvent(evt)}
                  className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 transition-colors"
                >
                  <span>View on 23-Member Ensemble Map</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenGovernance(evt)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Review Alert Governance
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
