import React from 'react';
import { UserRole } from '../types/weather';
import { Shield, Sparkles, AlertTriangle, Layers, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenDelta: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenDelta,
}) => {
  const roleLabels: Record<UserRole, { title: string; badge: string; color: string }> = {
    meteorologist: { title: 'Meteorologist (IMD/NCMRWF)', badge: 'Expert Diagnostics', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    ndrf: { title: 'NDRF Disaster Operations', badge: 'Pre-positioning View', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    district_admin: { title: 'District Magistrate / SDMA', badge: 'Block Risk & Action', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    agriculture: { title: 'Agricultural Extension Officer', badge: 'Crop Vulnerability', color: 'bg-lime-50 text-lime-700 border-lime-200' },
    public: { title: 'Public & Media Advisory', badge: 'Verified Official Guidance', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo matching the uploaded screenshot */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              {/* Exact Dark icon with stylized wave/wind logo from image */}
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="7" height="16" rx="2" fill="white" />
                  <rect x="14" y="4" width="7" height="9" rx="2" fill="white" />
                  <circle cx="17.5" cy="17.5" r="2.5" fill="white" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Weathex
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block -mt-1">
                  SANKET NEPS-G Engine
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Items from image + PDF capabilities */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'map'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Map & Tracking
            </button>
            <button
              onClick={() => setActiveTab('downscaling')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'downscaling'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Picture (5 km Diffusion)
            </button>
            <button
              onClick={() => setActiveTab('climate')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'climate'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Climate Change
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'news'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              News & Alerts
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'contact'
                  ? 'text-slate-900 font-semibold bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Governance
            </button>
          </nav>

          {/* Right Action Zone: Role Switcher, Forecast Delta CTA, and Social Icons from image */}
          <div className="flex items-center gap-3">
            
            {/* Forecast Delta Trigger */}
            <button
              onClick={onOpenDelta}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
              title="Compare consecutive forecast cycles (00Z vs 12Z)"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Forecast Delta (A/B)</span>
            </button>

            {/* Role Persona selector */}
            <div className="relative group">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium pl-3 pr-7 py-2 rounded-lg border border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              >
                <option value="meteorologist">Role: Meteorologist</option>
                <option value="ndrf">Role: NDRF Ops</option>
                <option value="district_admin">Role: District Admin</option>
                <option value="agriculture">Role: Agriculture</option>
                <option value="public">Role: Public View</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Social Icons matching the uploaded screenshot */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
