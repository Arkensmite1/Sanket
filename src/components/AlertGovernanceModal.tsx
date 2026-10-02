import React, { useState } from 'react';
import { ExtremeEvent, AlertLevel } from '../types/weather';
import { X, ShieldCheck, CheckCircle2, AlertOctagon, History, FileText, Send, UserCheck, Lock } from 'lucide-react';

interface AlertGovernanceModalProps {
  event: ExtremeEvent;
  isOpen: boolean;
  onClose: () => void;
  onApproveAlert: (eventId: string, approvedLevel: AlertLevel, notes: string) => void;
}

export const AlertGovernanceModal: React.FC<AlertGovernanceModalProps> = ({
  event,
  isOpen,
  onClose,
  onApproveAlert,
}) => {
  if (!isOpen) return null;

  const [selectedLevel, setSelectedLevel] = useState<AlertLevel>(event.alert.level);
  const [reviewNotes, setReviewNotes] = useState<string>(event.alert.meteorologist_notes);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [authorizedSuccess, setAuthorizedSuccess] = useState<boolean>(false);

  const handleApprove = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      onApproveAlert(event.id, selectedLevel, reviewNotes);
      setIsAuthorizing(false);
      setAuthorizedSuccess(true);
      setTimeout(() => {
        setAuthorizedSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  const lifecycleStages = ['Created', 'Updated', 'Escalated', 'Stabilised', 'Downgraded', 'Resolved'];
  const currentStageIndex = lifecycleStages.indexOf(event.alert.state);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Official Decision-Support Governance Flow</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Human-in-the-Loop Review &amp; Alert Authorisation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Protocol: <span className="font-semibold text-slate-700">AI Detects → AI Explains → Meteorologist Reviews → System Recommends → Authorised Sign-off</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alert Lifecycle State Progression */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Alert Lifecycle Pipeline</span>
            <span className="font-mono text-rose-600 font-bold uppercase">{event.alert.state}</span>
          </div>

          <div className="flex items-center justify-between relative px-4 py-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
            {lifecycleStages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={stage} className="relative z-10 flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                      : isPast
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-400 border border-slate-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${isCurrent ? 'text-rose-600 font-bold' : isPast ? 'text-slate-800' : 'text-slate-400'}`}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-slate-500 text-right font-medium">
            Hysteresis logic active · Prevents rapid oscillation between alert tiers
          </div>
        </div>

        {/* System Recommended Level vs Selected Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              AI System Computed Recommendation
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-rose-600 font-mono">
                {event.alert.recommended_level}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                (P = {Math.round(event.calibrated_probability * 100)}%, EFI = +{event.efi_value})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Triggered because {event.agreeing_members}/23 members exceed severe criteria with lead time &lt; 48 hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Meteorologist Selected Action Tier
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['Watch', 'Advisory', 'Warning', 'Severe Warning'] as AlertLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedLevel === lvl
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Meteorologist Review Notes Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Meteorologist Review Findings &amp; Override Justification (Append-Only Audit Log)
          </label>
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent leading-relaxed"
            placeholder="Document physical consistency, satellite ground truth correlation, or model agreement caveats..."
          />
        </div>

        {/* Cryptographic and Authorization Details */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
          <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 text-xs text-emerald-950">
            <div className="font-bold">Authorized Signatory: Dr. R. Sengupta (Chief Forecaster)</div>
            <div className="text-[11px] text-emerald-800">
              Institution: India Meteorological Department / NCMRWF Operational Triage Unit
            </div>
            <div className="text-[10px] font-mono text-emerald-700 mt-1">
              Lineage Hash: SHA-256: 4f8b91a... · Validated against IMD Standard Operating Procedures
            </div>
          </div>
        </div>

        {/* Success Feedback banner */}
        {authorizedSuccess && (
          <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Alert successfully signed and dispatched to National Disaster Management Authority (NDMA)!</span>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleApprove}
            disabled={isAuthorizing}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isAuthorizing ? (
              <span>Authorizing &amp; Signing...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Sign &amp; Issue Official {selectedLevel}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
