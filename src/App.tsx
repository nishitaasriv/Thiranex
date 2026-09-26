import React, { useState, useEffect } from 'react';
import { PageView, EventItem, Registration } from './types';
import { MOCK_EVENTS } from './data/mockEvents';
import { getStoredRegistrations, resetDemoRegistrations, cancelRegistration } from './data/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UsabilityScenarioDrawer } from './components/UsabilityScenarioDrawer';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RegistrationSuccessPage } from './pages/RegistrationSuccessPage';
import { MyRegistrationsPage } from './pages/MyRegistrationsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentPage, setCurrentPage] = useState<PageView>({ name: 'home' });
  const [recentRegistration, setRecentRegistration] = useState<Registration | null>(null);

  // Initialize registrations from storage on mount
  useEffect(() => {
    const loaded = getStoredRegistrations();
    setRegistrations(loaded);
  }, []);

  // Hash synchronization for smooth browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentPage({ name: 'home' });
      } else if (hash.startsWith('events')) {
        const parts = hash.split('/');
        const cat = parts[1] as any;
        setCurrentPage({ name: 'events', categoryFilter: cat || 'All' });
      } else if (hash.startsWith('event/')) {
        const id = hash.replace('event/', '');
        setCurrentPage({ name: 'event-details', eventId: id });
      } else if (hash.startsWith('register/')) {
        const id = hash.replace('register/', '');
        setCurrentPage({ name: 'register', eventId: id });
      } else if (hash === 'register') {
        setCurrentPage({ name: 'register' });
      } else if (hash.startsWith('my-registrations')) {
        const parts = hash.split('/');
        const highlightId = parts[1];
        setCurrentPage({ name: 'my-registrations', highlightId });
      } else if (hash === 'about') {
        setCurrentPage({ name: 'about' });
      }
    };

    // Check initial hash
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on page change
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash quietly
    try {
      if (page.name === 'home') window.location.hash = 'home';
      else if (page.name === 'events') {
        window.location.hash = page.categoryFilter && page.categoryFilter !== 'All' 
          ? `events/${page.categoryFilter}` 
          : 'events';
      } else if (page.name === 'event-details') window.location.hash = `event/${page.eventId}`;
      else if (page.name === 'register') window.location.hash = page.eventId ? `register/${page.eventId}` : 'register';
      else if (page.name === 'my-registrations') window.location.hash = page.highlightId ? `my-registrations/${page.highlightId}` : 'my-registrations';
      else if (page.name === 'about') window.location.hash = 'about';
    } catch (e) {
      // Ignore in sandbox environments if hash modification fails
    }
  };

  const handleRegistrationSuccess = (reg: Registration) => {
    setRecentRegistration(reg);
    // Reload registrations state
    const current = getStoredRegistrations();
    setRegistrations(current);
    navigateTo({ name: 'success', registrationId: reg.id });
  };

  const handleCancelRegistration = (id: string) => {
    const updated = cancelRegistration(id);
    setRegistrations(updated);
  };

  const handleResetDemoData = () => {
    const reset = resetDemoRegistrations();
    setRegistrations(reset);
  };

  const activeRegistrationsCount = registrations.filter(r => r.status === 'Registered').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Navigation Bar with 3-Zone Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        registeredCount={activeRegistrationsCount}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage.name === 'home' && (
          <HomePage
            events={events}
            onNavigate={navigateTo}
          />
        )}

        {currentPage.name === 'events' && (
          <EventsPage
            events={events}
            initialCategory={currentPage.categoryFilter || 'All'}
            onNavigate={navigateTo}
          />
        )}

        {currentPage.name === 'event-details' && (() => {
          const evt = events.find(e => e.id === currentPage.eventId) || events[0];
          const isRegistered = registrations.some(
            r => r.eventId === evt.id && r.status === 'Registered'
          );
          return (
            <EventDetailsPage
              event={evt}
              onNavigate={navigateTo}
              onRegister={(id) => navigateTo({ name: 'register', eventId: id })}
              isRegistered={isRegistered}
            />
          );
        })()}

        {currentPage.name === 'register' && (
          <RegistrationPage
            events={events}
            preselectedEventId={currentPage.eventId}
            onNavigate={navigateTo}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}

        {currentPage.name === 'success' && (() => {
          const reg = recentRegistration || registrations.find(r => r.id === currentPage.registrationId) || registrations[0];
          return (
            <RegistrationSuccessPage
              registration={reg}
              onNavigate={navigateTo}
            />
          );
        })()}

        {currentPage.name === 'my-registrations' && (
          <MyRegistrationsPage
            registrations={registrations}
            highlightId={currentPage.highlightId}
            onNavigate={navigateTo}
            onCancelRegistration={handleCancelRegistration}
          />
        )}

        {currentPage.name === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Usability Testing Helper Drawer (for Assignment Evaluation) */}
      <UsabilityScenarioDrawer
        onNavigate={navigateTo}
        onResetDemoData={handleResetDemoData}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
