import React from 'react';
import { Calendar, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Wordmark & Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                CampusEvents
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A centralized college event registration portal designed for student activity discovery, seamless registrations, and campus life engagement.
            </p>
            <div className="pt-1">
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                Academic Usability Prototype
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white tracking-wide uppercase">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'home' })}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'events' })}
                  className="hover:text-white transition-colors"
                >
                  All Upcoming Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'my-registrations' })}
                  className="hover:text-white transition-colors"
                >
                  My Registrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  About Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white tracking-wide uppercase">
              Event Categories
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'events', categoryFilter: 'Technical' })}
                  className="hover:text-white transition-colors"
                >
                  Technical & Coding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'events', categoryFilter: 'Workshop' })}
                  className="hover:text-white transition-colors"
                >
                  Workshops & Labs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'events', categoryFilter: 'Cultural' })}
                  className="hover:text-white transition-colors"
                >
                  Cultural & Music
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'events', categoryFilter: 'Sports' })}
                  className="hover:text-white transition-colors"
                >
                  Sports Tournaments
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Campus Venue Info */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white tracking-wide uppercase">
              Student Event Helpdesk
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Student Center, Room 204, Main Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>events-helpdesk@campus.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+1 (555) 019-2834</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Office hours: Mon–Fri, 9:00 AM – 5:00 PM
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            &copy; 2026 CampusEvents Portal. Built for UI/UX Usability Testing &amp; Analysis.
          </p>
          <p className="text-slate-400">
            Usability Testing Assignment · No external accounts or payments required
          </p>
        </div>
      </div>
    </footer>
  );
};
