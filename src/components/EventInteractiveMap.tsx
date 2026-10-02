import React, { useState } from 'react';
import { ExtremeEvent, EnsembleMemberTrack } from '../types/weather';
import { Play, Pause, RotateCcw, Eye, Shield, Wind, Compass, AlertCircle, Layers, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

interface EventInteractiveMapProps {
  selectedEvent: ExtremeEvent;
  onSelectEvent: (event: ExtremeEvent) => void;
  allEvents: ExtremeEvent[];
  onTriggerDownscaling: () => void;
  onOpenDeltaModal: () => void;
  onOpenWhyThisAlert: () => void;
}

export const EventInteractiveMap: React.FC<EventInteractiveMapProps> = ({
  selectedEvent,
  onSelectEvent,
  allEvents,
  onTriggerDownscaling,
  onOpenDeltaModal,
  onOpenWhyThisAlert,
}) => {
  const [activeLeadIndex, setActiveLeadIndex] = useState<number>(4); // default 48h (Landfall)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSpaghetti, setShowSpaghetti] = useState<boolean>(true);
  const [showCone67, setShowCone67] = useState<boolean>(true);
  const [showCone90, setShowCone90] = useState<boolean>(true);
  const [showDownscaledGrid, setShowDownscaledGrid] = useState<boolean>(true);
  const [showDistricts, setShowDistricts] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  // Projection math: Bounding box for India & Surroundings
  // Lon: 68°E to 94°E -> Map width 800px
  // Lat: 8°N to 34°N -> Map height 650px
  const mapMinLon = 68;
  const mapMaxLon = 95;
  const mapMinLat = 8;
  const mapMaxLat = 34;
  const svgWidth = 840;
  const svgHeight = 640;

  const projectLon = (lon: number) => {
    return ((lon - mapMinLon) / (mapMaxLon - mapMinLon)) * svgWidth;
  };

  const projectLat = (lat: number) => {
    // Latitudes invert in SVG Y
    return svgHeight - ((lat - mapMinLat) / (mapMaxLat - mapMinLat)) * svgHeight;
  };

  const currentTrajectoryPoint = selectedEvent.trajectory[activeLeadIndex] || selectedEvent.trajectory[0];

  // SVG Geographic Path for Coastline & Subcontinent
  // Stylized accurate outline of Indian subcontinent, Bay of Bengal, Arabian Sea, Sri Lanka
  const indiaOutlineSvgPath = `
    M ${projectLon(68.7)} ${projectLat(23.7)}
    L ${projectLon(70.0)} ${projectLat(22.9)}
    L ${projectLon(70.2)} ${projectLat(20.8)}
    L ${projectLon(72.8)} ${projectLat(19.0)}
    L ${projectLon(73.8)} ${projectLat(15.4)}
    L ${projectLon(75.8)} ${projectLat(11.2)}
    L ${projectLon(77.5)} ${projectLat(8.1)}
    L ${projectLon(78.2)} ${projectLat(9.2)}
    L ${projectLon(79.8)} ${projectLat(10.3)}
    L ${projectLon(80.3)} ${projectLat(13.1)}
    L ${projectLon(82.2)} ${projectLat(16.9)}
    L ${projectLon(85.8)} ${projectLat(19.8)}
    L ${projectLon(87.0)} ${projectLat(21.5)}
    L ${projectLon(88.3)} ${projectLat(21.7)}
    L ${projectLon(89.0)} ${projectLat(21.8)}
    L ${projectLon(90.5)} ${projectLat(22.2)}
    L ${projectLon(92.2)} ${projectLat(20.9)}
    L ${projectLon(92.5)} ${projectLat(23.5)}
    L ${projectLon(96.0)} ${projectLat(28.0)}
    L ${projectLon(93.0)} ${projectLat(28.5)}
    L ${projectLon(88.5)} ${projectLat(27.5)}
    L ${projectLon(83.0)} ${projectLat(29.8)}
    L ${projectLon(78.5)} ${projectLat(31.2)}
    L ${projectLon(75.0)} ${projectLat(34.0)}
    L ${projectLon(73.5)} ${projectLat(32.5)}
    L ${projectLon(71.0)} ${projectLat(28.0)}
    L ${projectLon(70.0)} ${projectLat(24.5)}
    Z
  `;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>SANKET Event-Centric Ensemble Map</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 font-mono font-semibold">23 Members Tracked</span>
            <span aria-hidden="true">·</span>
            <span>Cycle: {selectedEvent.current_cycle}</span>
          </div>
          <div className="mt-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {selectedEvent.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
              <span className="text-rose-600 font-semibold">{selectedEvent.category_label}</span>
              <span aria-hidden="true">·</span>
              <span>Landfall: {selectedEvent.landfall_location}</span>
            </div>
          </div>
        </div>

        {/* Hazard Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {allEvents.map((evt) => (
            <button
              key={evt.id}
              onClick={() => {
                onSelectEvent(evt);
                setActiveLeadIndex(evt.trajectory.length > 4 ? 4 : 0);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedEvent.id === evt.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {evt.name.split(' ')[0]} ({evt.hazard_type === 'tropical_cyclone' ? 'Cyclone' : evt.hazard_type === 'heatwave' ? 'Heat' : 'Deluge'})
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Box & HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative flex flex-col">
          
          {/* Top Map HUD Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            
            {/* Live Metrics Pill */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/80 text-white flex items-center gap-4 text-xs shadow-lg">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Peak Gust</span>
                <span className="font-mono font-bold text-rose-400 text-sm">{currentTrajectoryPoint.max_wind_kmh} km/h</span>
              </div>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Min MSLP</span>
                <span className="font-mono font-bold text-sky-400 text-sm">{currentTrajectoryPoint.intensity_mslp} hPa</span>
              </div>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Consensus</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {selectedEvent.agreeing_members}/{selectedEvent.total_members} ({selectedEvent.member_agreement_percent}%)
                </span>
              </div>
            </div>

            {/* Layer Toggles */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 flex items-center gap-1 text-xs text-slate-300 shadow-lg">
              <button
                onClick={() => setShowSpaghetti(!showSpaghetti)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  showSpaghetti ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
                title="Toggle 23 Individual Ensemble Members"
              >
                23 Members
              </button>
              <button
                onClick={() => {
                  setShowCone67(!showCone67);
                  setShowCone90(!showCone90);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  showCone67 || showCone90 ? 'bg-amber-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
                title="Toggle 67% and 90% Uncertainty Cones"
              >
                Uncertainty Cone
              </button>
              <button
                onClick={() => setShowDownscaledGrid(!showDownscaledGrid)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  showDownscaledGrid ? 'bg-rose-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
                title="Toggle 5 km Diffusion Probability Field"
              >
                5 km Grid
              </button>
            </div>

          </div>

          {/* SVG Canvas Map */}
          <div className="relative w-full h-[520px] bg-[#090d16] flex items-center justify-center overflow-hidden">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full select-none"
            >
              <defs>
                {/* 5 km Downscaled Probability Radial Gradient */}
                <radialGradient id="stormHeatGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#f97316" stopOpacity="0.65" />
                  <stop offset="70%" stopColor="#eab308" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </radialGradient>

                {/* Uncertainty Hatching Pattern */}
                <pattern id="uncertaintyHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" />
                </pattern>

                {/* Ocean Grid Lines */}
                <pattern id="oceanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.5" />
                </pattern>
              </defs>

              {/* Ocean Background & Grid */}
              <rect width={svgWidth} height={svgHeight} fill="#0b1120" />
              <rect width={svgWidth} height={svgHeight} fill="url(#oceanGrid)" />

              {/* Geographic Labels */}
              <text x={projectLon(88.5)} y={projectLat(15.5)} fill="#334155" fontSize="16" fontWeight="bold" letterSpacing="4">
                BAY OF BENGAL
              </text>
              <text x={projectLon(71.0)} y={projectLat(16.0)} fill="#334155" fontSize="16" fontWeight="bold" letterSpacing="4">
                ARABIAN SEA
              </text>
              <text x={projectLon(78.5)} y={projectLat(22.0)} fill="#1e293b" fontSize="28" fontWeight="900" letterSpacing="6">
                INDIA
              </text>

              {/* India Landmass Outline */}
              <path
                d={indiaOutlineSvgPath}
                fill="#131d31"
                stroke="#334155"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Sri Lanka */}
              <ellipse
                cx={projectLon(80.7)}
                cy={projectLat(7.8)}
                rx="14"
                ry="22"
                fill="#131d31"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Affected Districts Overlay */}
              {showDistricts && selectedEvent.affected_districts.map((district, dIdx) => {
                // Approximate district center near landfall or event locus
                const distLon = selectedEvent.hazard_type === 'tropical_cyclone' 
                  ? 88.0 + (dIdx * 0.4) 
                  : selectedEvent.hazard_type === 'heatwave'
                  ? 76.5 + (dIdx * 0.8)
                  : 76.0 + (dIdx * 0.3);
                const distLat = selectedEvent.hazard_type === 'tropical_cyclone'
                  ? 21.8 + (dIdx * 0.3)
                  : selectedEvent.hazard_type === 'heatwave'
                  ? 28.5 + (dIdx * 0.4)
                  : 11.5 + (dIdx * 0.4);

                const riskColor = district.risk_level === 'Very High' ? '#ef4444' : district.risk_level === 'High' ? '#f97316' : '#eab308';

                return (
                  <g key={district.id} className="cursor-pointer group">
                    <circle
                      cx={projectLon(distLon)}
                      cy={projectLat(distLat)}
                      r={district.risk_level === 'Very High' ? 18 : 12}
                      fill={riskColor}
                      fillOpacity="0.25"
                      stroke={riskColor}
                      strokeWidth="1.5"
                      strokeDasharray="3 2"
                    />
                    <circle
                      cx={projectLon(distLon)}
                      cy={projectLat(distLat)}
                      r="3.5"
                      fill={riskColor}
                    />
                    <text
                      x={projectLon(distLon) + 8}
                      y={projectLat(distLat) + 4}
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {district.name}
                    </text>
                  </g>
                );
              })}

              {/* 90% Uncertainty Cone */}
              {showCone90 && (
                <path
                  d={`
                    M ${projectLon(selectedEvent.trajectory[0].lon)} ${projectLat(selectedEvent.trajectory[0].lat)}
                    ${selectedEvent.trajectory.map(p => `L ${projectLon(p.lon + (p.cone_90_radius_km / 111))} ${projectLat(p.lat + (p.cone_90_radius_km / 111 * 0.5))}`).join(' ')}
                    ${[...selectedEvent.trajectory].reverse().map(p => `L ${projectLon(p.lon - (p.cone_90_radius_km / 111))} ${projectLat(p.lat - (p.cone_90_radius_km / 111 * 0.5))}`).join(' ')}
                    Z
                  `}
                  fill="#f59e0b"
                  fillOpacity="0.12"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}

              {/* 67% Uncertainty Cone */}
              {showCone67 && (
                <path
                  d={`
                    M ${projectLon(selectedEvent.trajectory[0].lon)} ${projectLat(selectedEvent.trajectory[0].lat)}
                    ${selectedEvent.trajectory.map(p => `L ${projectLon(p.lon + (p.cone_radius_km / 111))} ${projectLat(p.lat + (p.cone_radius_km / 111 * 0.4))}`).join(' ')}
                    ${[...selectedEvent.trajectory].reverse().map(p => `L ${projectLon(p.lon - (p.cone_radius_km / 111))} ${projectLat(p.lat - (p.cone_radius_km / 111 * 0.4))}`).join(' ')}
                    Z
                  `}
                  fill="#ef4444"
                  fillOpacity="0.18"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
              )}

              {/* 23 Ensemble Member Spaghetti Tracks */}
              {showSpaghetti && selectedEvent.ensemble_members.map((member) => {
                const pathData = member.points
                  .slice(0, activeLeadIndex + 1)
                  .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${projectLon(pt.lon)} ${projectLat(pt.lat)}`)
                  .join(' ');

                return (
                  <path
                    key={member.member_id}
                    d={pathData}
                    fill="none"
                    stroke={member.color}
                    strokeWidth={member.is_control ? 2.5 : 1}
                    strokeOpacity={member.is_control ? 0.95 : 0.45}
                  />
                );
              })}

              {/* Median Consensus Trajectory Corridor Line */}
              <path
                d={selectedEvent.trajectory
                  .slice(0, activeLeadIndex + 1)
                  .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${projectLon(p.lon)} ${projectLat(p.lat)}`)
                  .join(' ')}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeDasharray="6 3"
              />

              {/* 5 km Downscaled Probability Field at Current Lead Time with Uncertainty Hatching */}
              {showDownscaledGrid && (
                <g>
                  {/* Heatmap Halo */}
                  <circle
                    cx={projectLon(currentTrajectoryPoint.lon)}
                    cy={projectLat(currentTrajectoryPoint.lat)}
                    r={currentTrajectoryPoint.spread_km * 1.6}
                    fill="url(#stormHeatGradient)"
                  />
                  {/* Outer Tail Hatching showing epistemic spread */}
                  <circle
                    cx={projectLon(currentTrajectoryPoint.lon)}
                    cy={projectLat(currentTrajectoryPoint.lat)}
                    r={currentTrajectoryPoint.cone_radius_km * 0.8}
                    fill="url(#uncertaintyHatch)"
                    stroke="#ef4444"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                </g>
              )}

              {/* Current Storm Centroid Marker */}
              <g className="transition-all duration-300">
                {/* Radar pulse rings */}
                <circle
                  cx={projectLon(currentTrajectoryPoint.lon)}
                  cy={projectLat(currentTrajectoryPoint.lat)}
                  r="24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1"
                  className="animate-ping opacity-60 origin-center"
                />
                <circle
                  cx={projectLon(currentTrajectoryPoint.lon)}
                  cy={projectLat(currentTrajectoryPoint.lat)}
                  r="9"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="shadow-lg"
                />
                <circle
                  cx={projectLon(currentTrajectoryPoint.lon)}
                  cy={projectLat(currentTrajectoryPoint.lat)}
                  r="3.5"
                  fill="#ffffff"
                />

                {/* Storm Tag */}
                <rect
                  x={projectLon(currentTrajectoryPoint.lon) + 12}
                  y={projectLat(currentTrajectoryPoint.lat) - 24}
                  width="130"
                  height="34"
                  rx="6"
                  fill="#0f172a"
                  fillOpacity="0.9"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <text
                  x={projectLon(currentTrajectoryPoint.lon) + 18}
                  y={projectLat(currentTrajectoryPoint.lat) - 10}
                  fill="#f8fafc"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {currentTrajectoryPoint.time.split(' ')[0]} {currentTrajectoryPoint.time.split(' ')[1]}
                </text>
                <text
                  x={projectLon(currentTrajectoryPoint.lon) + 18}
                  y={projectLat(currentTrajectoryPoint.lat) + 3}
                  fill="#38bdf8"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {currentTrajectoryPoint.max_wind_kmh} km/h · {currentTrajectoryPoint.intensity_mslp} hPa
                </text>
              </g>

            </svg>
          </div>

          {/* Interactive Lead-Time Slider and Animation Controls */}
          <div className="bg-slate-900 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isPlaying) {
                    setIsPlaying(false);
                  } else {
                    setIsPlaying(true);
                    let step = activeLeadIndex;
                    const interval = setInterval(() => {
                      step = (step + 1) % selectedEvent.trajectory.length;
                      setActiveLeadIndex(step);
                    }, 1200);
                    // auto stop
                    setTimeout(() => {
                      clearInterval(interval);
                      setIsPlaying(false);
                    }, 1200 * selectedEvent.trajectory.length);
                  }
                }}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                title={isPlaying ? 'Pause timeline' : 'Animate forecast trajectory'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              
              <button
                onClick={() => setActiveLeadIndex(0)}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                title="Reset to 0h init"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-300 font-mono font-medium pl-2">
                Lead Time: <span className="text-sky-400 font-bold">+{currentTrajectoryPoint.lead_h}h</span> ({currentTrajectoryPoint.time})
              </div>
            </div>

            {/* Step markers slider */}
            <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
              {selectedEvent.trajectory.map((p, idx) => (
                <button
                  key={p.lead_h}
                  onClick={() => setActiveLeadIndex(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                    activeLeadIndex === idx
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  +{p.lead_h}h
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Right Event Intelligence Side Panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          
          {/* Card 1: Event Identity & Calibrated Uncertainty */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-medium text-slate-500">
                {selectedEvent.id}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <span>{selectedEvent.alert.level}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                {selectedEvent.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target: <span className="text-slate-800 font-medium">{selectedEvent.landfall_location}</span>
              </p>
            </div>

            {/* Calibrated Probability & EFI Gauges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Calibrated P(Impact)
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-rose-600 font-mono tabular-nums">
                    {Math.round(selectedEvent.calibrated_probability * 100)}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">±4%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-rose-600 h-1.5 rounded-full"
                    style={{ width: `${selectedEvent.calibrated_probability * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Extreme Forecast Index
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-slate-800 font-mono tabular-nums">
                    +{selectedEvent.efi_value}
                  </span>
                  <span className="text-[10px] text-slate-400">/ 1.0</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block mt-1">
                  {selectedEvent.climatological_percentile}th %ile tail
                </span>
              </div>

            </div>

            {/* Ensemble Cross-Member Distribution Info */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-900 font-semibold">
                <span>Ensemble Agreement</span>
                <span className="font-mono">{selectedEvent.agreeing_members} / {selectedEvent.total_members} Members ({selectedEvent.member_agreement_percent}%)</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                11 members from 00Z + 11 lagged from 12Z + 1 control. High cross-member convergence with underdispersion calibrated via EMOS inflation.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenDeltaModal}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span>Examine Forecast Delta (00Z vs 12Z)</span>
              </button>

              <button
                onClick={onOpenWhyThisAlert}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>Auditable Why This Alert Factors</span>
              </button>
            </div>

          </div>

          {/* Card 2: 5 km Downscaling Trigger & Physics Status */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>5 km Residual Diffusion Active</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">CorrDiff Architecture</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Coarse 12 km NEPS-G fields conditioned with high-res DEM topography, land-sea boundary, and residual diffusion denoiser to preserve peak extremes.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px] block font-sans">Mass Conservation</span>
                <span className="font-bold text-white">{selectedEvent.downscaling.physics_metrics.mass_conservation_score}%</span>
              </div>
              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px] block font-sans">Spectrum Preservation</span>
                <span className="font-bold text-white">{selectedEvent.downscaling.power_spectrum_preservation}%</span>
              </div>
            </div>

            <button
              onClick={onTriggerDownscaling}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Inspect 5 km Spectrum &amp; Physics Bounds
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
