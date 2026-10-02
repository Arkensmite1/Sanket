import React, { useState } from 'react';
import { Sun, CloudLightning, CloudRain, CloudSun, MapPin, Clock, Headphones, ArrowUpRight, Wind, ShieldAlert, Sparkles } from 'lucide-react';
import heroBgImage from '../assets/images/weathex_misty_forest_hero_1790948328385.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAllWeatherClick: () => void;
  onSelectEventById: (eventId: string) => void;
  onOpenDeltaModal: () => void;
  onOpenGovernanceModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onAllWeatherClick,
  onSelectEventById,
  onOpenDeltaModal,
  onOpenGovernanceModal,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const forecastCards = [
    {
      day: 'Monday',
      time: '09 am sunny view',
      temp: '36°',
      condition: 'Sunny / Heatwave',
      icon: <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />,
      subtext: 'High Z500 Ridge · EFI +0.96',
      targetEvent: 'EVT-2026-0042',
      bgGlow: 'hover:shadow-amber-500/20'
    },
    {
      day: 'Tuesday',
      time: '10 am hail view',
      temp: '19°',
      condition: 'Severe Hail & Gusts',
      icon: <CloudLightning className="w-8 h-8 text-blue-300" />,
      subtext: 'Supercell Cluster · CAPE 2800',
      targetEvent: 'EVT-2026-0001',
      bgGlow: 'hover:shadow-blue-500/20'
    },
    {
      day: 'Wednesday',
      time: '05 pm rainy view',
      temp: '08°',
      condition: 'Torrential Orographic Rain',
      icon: <CloudRain className="w-8 h-8 text-sky-300" />,
      subtext: 'Ghats Deluge · 320mm / 24h',
      targetEvent: 'EVT-2026-0089',
      bgGlow: 'hover:shadow-sky-500/20'
    },
    {
      day: 'Thursday',
      time: '12 am cloudy view',
      temp: '23°',
      condition: 'Overcast & Low Pressure',
      icon: <CloudSun className="w-8 h-8 text-amber-200" />,
      subtext: 'Monsoon Depression Inflow',
      targetEvent: 'EVT-2026-0001',
      bgGlow: 'hover:shadow-indigo-500/20'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      
      {/* Grand Hero Card matching the user's design image */}
      <div className="relative rounded-[32px] overflow-hidden shadow-2xl min-h-[540px] flex items-center bg-slate-900 border border-slate-700/50">
        
        {/* Background Image: Misty pine forest from generated asset with smooth gradient scrim */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        >
          {/* Measured gradient scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Mission editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>NEPS-G 23-Member Ensemble</span>
              <span className="text-white/40">·</span>
              <span className="text-slate-200 font-normal">SANKET Extreme-Weather Intelligence</span>
            </div>

            {/* Exact Headline from User Image */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Climate is What We Expect, Weather is What We Get.
            </h1>

            {/* Authentic Explanatory Prose based on PDF */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal opacity-95">
              Turning massive 23-member ensembles into persistent, trackable storm objects. With calibrated uncertainty corridors, 5 km tail-preserving residual diffusion, and cycle-to-cycle Forecast Delta tracking.
            </p>

            {/* Action Buttons matching the user's image */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-8 py-3.5 bg-white text-slate-900 text-sm font-bold rounded-full shadow-lg hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Now</span>
              </button>

              <button
                onClick={onAllWeatherClick}
                className="px-7 py-3.5 bg-black/30 hover:bg-black/50 text-white text-sm font-semibold rounded-full border border-white/30 backdrop-blur-md hover:border-white/50 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>All Weather</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-white/70 pl-2 hidden sm:flex items-center gap-2">
                <span>Active Track:</span>
                <button
                  onClick={() => onSelectEventById('EVT-2026-0001')}
                  className="text-amber-300 font-semibold hover:underline"
                >
                  Cyclone Amphan (Cat 5)
                </button>
              </div>
            </div>

          </div>

          {/* Right Weather Cards 2x2 Grid matching the user's image */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {forecastCards.map((card, idx) => (
              <div
                key={card.day}
                onClick={() => {
                  setActiveCardIndex(idx);
                  onSelectEventById(card.targetEvent);
                }}
                className={`relative cursor-pointer p-5 rounded-2xl transition-all duration-200 backdrop-blur-xl border text-left ${
                  activeCardIndex === idx
                    ? 'bg-white/95 text-slate-900 shadow-xl border-white ring-2 ring-white/60'
                    : 'bg-white/80 hover:bg-white/90 text-slate-800 shadow-md border-white/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-extrabold tracking-tight font-mono tabular-nums">
                    {card.temp}
                  </span>
                  <div className="p-1 rounded-xl bg-slate-50/70">
                    {card.icon}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-bold text-slate-900">
                    {card.day}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {card.time}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-700 font-medium">
                    {card.condition}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 3 Feature Cards directly underneath the hero (from the user's design image) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Card 1: Weather Map */}
        <div 
          onClick={onExploreClick}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Weather Map</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Icosahedral spherical mesh with 23-member spaghetti tracks, 67% and 90% uncertainty corridors, and 5 km downscaled probability fields.
          </p>
        </div>

        {/* Card 2: Timely Update (Forecast Delta Engine) */}
        <div 
          onClick={onOpenDeltaModal}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Timely Update</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated Forecast Delta Engine compares 00Z vs 12Z cycles, computing track shifts, arrival time deltas, and significance-tested evolutions.
          </p>
        </div>

        {/* Card 3: Online Support (Human-in-the-Loop Governance) */}
        <div 
          onClick={onOpenGovernanceModal}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Online Support</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Meteorologist auditable decision-support with role-specific views for NDRF operations, District Magistrates, and official IMD authorizations.
          </p>
        </div>

      </div>

    </div>
  );
};
