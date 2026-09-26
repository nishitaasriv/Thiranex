import React, { useState } from 'react';
import { Calendar, Menu, X, Ticket, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  registeredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  registeredCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (pageName: string) => {
    return currentPage.name === pageName;
  };

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick({ name: 'home' })}
              className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-blue-600 rounded-md p-1"
              aria-label="CampusEvents Home"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
                <Calendar className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  CampusEvents
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500">
                  College Portal
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick({ name: 'home' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('home')
                  ? 'text-blue-900 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick({ name: 'events' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('events') || isActive('event-details')
                  ? 'text-blue-900 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => handleNavClick({ name: 'my-registrations' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative flex items-center gap-1.5 ${
                isActive('my-registrations')
                  ? 'text-blue-900 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>My Registrations</span>
              {registeredCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  {registeredCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick({ name: 'about' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('about')
                  ? 'text-blue-900 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick({ name: 'events' })}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <span>Browse Events</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <button
            onClick={() => handleNavClick({ name: 'home' })}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('home')
                ? 'bg-blue-50 text-blue-900 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick({ name: 'events' })}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('events') || isActive('event-details')
                ? 'bg-blue-50 text-blue-900 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => handleNavClick({ name: 'my-registrations' })}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
              isActive('my-registrations')
                ? 'bg-blue-50 text-blue-900 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>My Registrations</span>
            {registeredCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                {registeredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick({ name: 'about' })}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('about')
                ? 'bg-blue-50 text-blue-900 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            About CampusEvents
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick({ name: 'events' })}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              Browse All Events
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
