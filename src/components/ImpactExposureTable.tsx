import React, { useState } from 'react';
import { ExtremeEvent, UserRole, DistrictExposure } from '../types/weather';
import { ShieldAlert, Users, Building2, Car, Sprout, AlertTriangle, CheckSquare, PhoneCall, Download } from 'lucide-react';

interface ImpactExposureTableProps {
  event: ExtremeEvent;
  userRole: UserRole;
  onOpenGovernance: () => void;
}

export const ImpactExposureTable: React.FC<ImpactExposureTableProps> = ({
  event,
  userRole,
  onOpenGovernance,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(event.affected_districts[0]?.id || '');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'chk-01': true,
    'chk-02': true,
    'chk-03': false,
    'chk-04': false,
    'chk-05': false,
  });

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedDistrict = event.affected_districts.find(d => d.id === selectedDistrictId) || event.affected_districts[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
            <span>SANKET Decision-Support Impact Engine</span>
            <span>·</span>
            <span>Risk = Calibrated Hazard &times; Exposure &times; Vulnerability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Exposure Overlay &amp; Operational Action Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregated exposure across <span className="font-semibold text-slate-800">{event.affected_districts.length} administrative districts</span>. Total exposed population: <span className="font-bold text-rose-600 font-mono">{(event.total_population_at_risk / 1e6).toFixed(1)} Million</span>.
          </p>
        </div>

        <button
          onClick={onOpenGovernance}
          className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <ShieldAlert className="w-4 h-4 text-slate-400" />
          <span>Official Alert Governance &amp; Authorisation</span>
        </button>
      </div>

      {/* Role-Specific Action Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Persona View: {userRole.replace('_', ' ').toUpperCase()}</span>
          </div>
          <p className="text-xs text-slate-300">
            {userRole === 'ndrf' && 'Displaying pre-positioning corridors, boat deployment zones, and storm-surge cutoff routes.'}
            {userRole === 'district_admin' && 'Displaying block-level cyclone shelter capacities, evacuation timelines, and control room lines.'}
            {userRole === 'agriculture' && 'Displaying crop calendar vulnerability matrix (paddy harvesting, saline breach hazard).'}
            {userRole === 'meteorologist' && 'Displaying calibrated exceedance probabilities, spread-skill ratios, and diagnostic overrides.'}
            {userRole === 'public' && 'Displaying official safety guidelines, verified evacuation shelters, and helpline contacts.'}
          </p>
        </div>
      </div>

      {/* District Exposure Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            District-Level Exposure &amp; Calibrated Risk Ranking
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Source: Census + WorldPop + OSM Roads
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">District / State</th>
                <th className="py-3.5 px-4">Calibrated P(Severe)</th>
                <th className="py-3.5 px-4">Potential Risk</th>
                <th className="py-3.5 px-4">Population Exposed</th>
                <th className="py-3.5 px-4">Hospitals</th>
                <th className="py-3.5 px-4">Cyclone Shelters</th>
                <th className="py-3.5 px-4">Critical Roads</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {event.affected_districts.map((dist) => {
                const isSelected = selectedDistrictId === dist.id;
                const riskBadge = dist.risk_level === 'Very High' 
                  ? 'bg-rose-100 text-rose-800 border-rose-200' 
                  : dist.risk_level === 'High' 
                  ? 'bg-orange-100 text-orange-800 border-orange-200' 
                  : 'bg-amber-100 text-amber-800 border-amber-200';

                return (
                  <tr 
                    key={dist.id}
                    onClick={() => setSelectedDistrictId(dist.id)}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-sky-50/60 font-semibold' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="text-slate-900 font-bold text-sm">{dist.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{dist.state}</div>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold tabular-nums text-slate-900">
                      {Math.round(dist.calibrated_p * 100)}%
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className={`w-2 h-2 rounded-full ${
                          dist.risk_level === 'Very High' 
                            ? 'bg-rose-600' 
                            : dist.risk_level === 'High' 
                            ? 'bg-orange-500' 
                            : 'bg-amber-500'
                        }`} />
                        <span className="text-slate-800 font-semibold">{dist.risk_level}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono tabular-nums">
                      {dist.population.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-600">
                      {dist.hospitals} Facilities
                    </td>

                    <td className="py-4 px-4 font-mono text-emerald-700 font-bold">
                      {dist.shelters} Active
                    </td>

                    <td className="py-4 px-4 font-mono">
                      {dist.critical_roads_km} km
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDistrictId(dist.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected District Deep Dive & Action Checklist */}
      {selectedDistrict && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Detail Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Selected Sector Deep-Dive</span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">{selectedDistrict.name} ({selectedDistrict.state})</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Calibrated Probability</span>
                <span className="text-base font-mono font-bold text-rose-600 tabular-nums">
                  {Math.round(selectedDistrict.calibrated_p * 100)}%
                </span>
              </div>
            </div>

            {/* Infrastructure metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Civil Population</span>
                <span className="text-base font-bold text-slate-900 font-mono">{selectedDistrict.population.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Designated Shelters</span>
                <span className="text-base font-bold text-emerald-700 font-mono">{selectedDistrict.shelters}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Critical Road Network</span>
                <span className="text-base font-bold text-slate-900 font-mono">{selectedDistrict.critical_roads_km} km</span>
              </div>
            </div>

            {/* Agriculture Advisory Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase">
                <Sprout className="w-4 h-4 text-amber-700" />
                <span>Agricultural Advisory Matrix: {selectedDistrict.key_crop}</span>
              </div>
              <div className="text-xs text-amber-900 space-y-1">
                <div><span className="font-semibold">Phenological Stage:</span> {selectedDistrict.crop_stage}</div>
                <div><span className="font-semibold">Vulnerability:</span> {selectedDistrict.crop_vulnerability}</div>
                <div className="pt-1 text-[11px] text-amber-800 leading-relaxed">
                  Advisory: Expedite immediate harvesting of mature boro paddy; secure coastal sluice gates against saline ingress.
                </div>
              </div>
            </div>

          </div>

          {/* Action Checklist & Deployment (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Operational Pre-Positioning Checklist</span>
              <span className="text-xs text-slate-400 font-mono">
                {Object.values(checklist).filter(Boolean).length}/5 Completed
              </span>
            </h4>

            <div className="space-y-2.5">
              {[
                { id: 'chk-01', text: 'Issue evacuation order for low-lying coastal kutcha settlements' },
                { id: 'chk-02', text: 'Deploy 4 NDRF battalions with inflatable boats to Kakdwip and Sagar' },
                { id: 'chk-03', text: 'Pre-position emergency backup diesel generators at district hospitals' },
                { id: 'chk-04', text: 'Clear road drainage corridors along State Highway 3 and NH-16' },
                { id: 'chk-05', text: 'Stock 72 hours dry rations and water purification tablets at cyclone shelters' },
              ].map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.id] || false}
                    onChange={() => {}}
                    className="w-4 h-4 mt-0.5 text-rose-600 rounded-sm border-slate-300 focus:ring-rose-500 cursor-pointer"
                  />
                  <span className={`text-xs leading-relaxed ${
                    checklist[item.id] ? 'line-through text-slate-400 font-normal' : 'text-slate-800 font-semibold'
                  }`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert(`Pre-positioning orders verified for ${selectedDistrict.name}. Transmitted to SDMA State Control Room.`)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Transmit Deployment Order to Control Room
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
