import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EventInteractiveMap } from './components/EventInteractiveMap';
import { ForecastDeltaModal } from './components/ForecastDeltaModal';
import { DownscalingDiagnostics } from './components/DownscalingDiagnostics';
import { WhyThisAlertPanel } from './components/WhyThisAlertPanel';
import { ImpactExposureTable } from './components/ImpactExposureTable';
import { AlertGovernanceModal } from './components/AlertGovernanceModal';
import { ClimateAnomalySection } from './components/ClimateAnomalySection';
import { NewsAlertsSection } from './components/NewsAlertsSection';
import { Footer } from './components/Footer';
import { mockEvents } from './data/mockExtremeEvents';
import { ExtremeEvent, UserRole, AlertLevel } from './types/weather';

export default function App() {
  const [events, setEvents] = useState<ExtremeEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(mockEvents[0].id);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userRole, setUserRole] = useState<UserRole>('meteorologist');
  
  // Modals
  const [isDeltaModalOpen, setIsDeltaModalOpen] = useState<boolean>(false);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState<boolean>(false);
  const [isWhyThisAlertOpen, setIsWhyThisAlertOpen] = useState<boolean>(false);

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleSelectEvent = (event: ExtremeEvent) => {
    setSelectedEventId(event.id);
  };

  const handleSelectEventById = (eventId: string) => {
    setSelectedEventId(eventId);
    setActiveTab('map');
  };

  const handleApproveAlert = (eventId: string, approvedLevel: AlertLevel, notes: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          alert: {
            ...evt.alert,
            level: approvedLevel,
            state: 'Escalated',
            meteorologist_notes: notes,
            approved_by: 'Dr. R. Sengupta (Chief Forecaster, IMD)',
            approved_at: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          }
        };
      }
      return evt;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenDelta={() => setIsDeltaModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Hero Section matching the user's design image */}
            <HeroSection
              onExploreClick={() => setActiveTab('map')}
              onAllWeatherClick={() => setActiveTab('downscaling')}
              onSelectEventById={handleSelectEventById}
              onOpenDeltaModal={() => setIsDeltaModalOpen(true)}
              onOpenGovernanceModal={() => setIsGovernanceModalOpen(true)}
            />

            {/* Live Interactive Map Preview for Active Extreme Event */}
            <section className="border-t border-slate-200/80 pt-6">
              <EventInteractiveMap
                selectedEvent={currentEvent}
                onSelectEvent={handleSelectEvent}
                allEvents={events}
                onTriggerDownscaling={() => setActiveTab('downscaling')}
                onOpenDeltaModal={() => setIsDeltaModalOpen(true)}
                onOpenWhyThisAlert={() => setIsWhyThisAlertOpen(true)}
              />
            </section>

            {/* Why This Alert Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WhyThisAlertPanel
                event={currentEvent}
              />
            </section>

            {/* Exposure Overlay & Impact Table */}
            <section className="border-t border-slate-200/80 pt-6">
              <ImpactExposureTable
                event={currentEvent}
                userRole={userRole}
                onOpenGovernance={() => setIsGovernanceModalOpen(true)}
              />
            </section>
          </div>
        )}

        {activeTab === 'map' && (
          <div>
            <EventInteractiveMap
              selectedEvent={currentEvent}
              onSelectEvent={handleSelectEvent}
              allEvents={events}
              onTriggerDownscaling={() => setActiveTab('downscaling')}
              onOpenDeltaModal={() => setIsDeltaModalOpen(true)}
              onOpenWhyThisAlert={() => setIsWhyThisAlertOpen(true)}
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <ImpactExposureTable
                event={currentEvent}
                userRole={userRole}
                onOpenGovernance={() => setIsGovernanceModalOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'downscaling' && (
          <DownscalingDiagnostics event={currentEvent} />
        )}

        {activeTab === 'climate' && (
          <ClimateAnomalySection />
        )}

        {activeTab === 'news' && (
          <NewsAlertsSection
            events={events}
            onSelectEvent={(evt) => {
              handleSelectEvent(evt);
              setActiveTab('map');
            }}
            onOpenGovernance={(evt) => {
              handleSelectEvent(evt);
              setIsGovernanceModalOpen(true);
            }}
          />
        )}

        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Institutional Governance &amp; Decision-Support Protocol
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Operational Human-in-the-Loop Governance
              </h2>
              <p className="text-sm text-slate-500 max-w-2xl mt-1">
                SANKET provides decision support and does not replace official warnings. Only IMD or designated state disaster authorities issue binding public alerts.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Active Operational Session</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Currently reviewing active cycle output from NCMRWF NEPS-G (23 members, 10-day forecast). Authorised Meteorologist: <strong>Dr. R. Sengupta (Chief Forecaster)</strong>.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsGovernanceModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Open Official Alert Authorisation Console
                </button>
                <button
                  onClick={() => setIsDeltaModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Review Cycle-to-Cycle Forecast Delta
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ForecastDeltaModal
        event={currentEvent}
        isOpen={isDeltaModalOpen}
        onClose={() => setIsDeltaModalOpen(false)}
      />

      <AlertGovernanceModal
        event={currentEvent}
        isOpen={isGovernanceModalOpen}
        onClose={() => setIsGovernanceModalOpen(false)}
        onApproveAlert={handleApproveAlert}
      />

      {isWhyThisAlertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <WhyThisAlertPanel
              event={currentEvent}
              isOpen={isWhyThisAlertOpen}
              onClose={() => setIsWhyThisAlertOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
