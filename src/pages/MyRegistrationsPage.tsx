import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  QrCode,
  Search,
  ExternalLink,
  Printer
} from 'lucide-react';
import { Registration, PageView } from '../types';

interface MyRegistrationsPageProps {
  registrations: Registration[];
  highlightId?: string;
  onNavigate: (page: PageView) => void;
  onCancelRegistration: (registrationId: string) => void;
}

export const MyRegistrationsPage: React.FC<MyRegistrationsPageProps> = ({
  registrations,
  highlightId,
  onNavigate,
  onCancelRegistration
}) => {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedPass, setSelectedPass] = useState<Registration | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const activeRegistrations = registrations.filter(r => r.status !== 'Cancelled');
  const cancelledRegistrations = registrations.filter(r => r.status === 'Cancelled');

  const filteredActive = activeRegistrations.filter(r => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      r.eventTitle.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.eventVenue.toLowerCase().includes(q)
    );
  });

  const confirmCancel = (id: string) => {
    onCancelRegistration(id);
    setCancellingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <span>Student Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>Usability Scenario 4</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Registrations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            View, verify, and manage your reserved college event passes.
          </p>
        </div>

        <button
          onClick={() => onNavigate({ name: 'events' })}
          className="self-start sm:self-auto py-2.5 px-4 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span>Register for More Events</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SEARCH / STATS BAR */}
      {registrations.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-700 w-full sm:w-auto">
            <span>
              Total Active Passes: <strong className="text-blue-900 tabular-nums">{activeRegistrations.length}</strong>
            </span>
            {cancelledRegistrations.length > 0 && (
              <span className="text-slate-400">
                · Cancelled: <span className="tabular-nums">{cancelledRegistrations.length}</span>
              </span>
            )}
          </div>

          {activeRegistrations.length > 2 && (
            <div className="w-full sm:w-64 relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by event or ID..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          )}
        </div>
      )}

      {/* REGISTRATION CARDS LIST */}
      {filteredActive.length > 0 ? (
        <div className="space-y-4">
          {filteredActive.map((reg) => {
            const isHighlighted = highlightId === reg.id;
            return (
              <div
                key={reg.id}
                className={`bg-white rounded-2xl border transition-all duration-200 p-5 sm:p-6 shadow-xs ${
                  isHighlighted
                    ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Event & Student Info */}
                  <div className="space-y-3 flex-1">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {reg.status}
                      </span>

                      {/* Category */}
                      <span className="text-xs font-medium text-slate-500">
                        {reg.eventCategory}
                      </span>

                      <span aria-hidden="true" className="text-slate-300">·</span>

                      {/* Registration ID with copy hint */}
                      <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        ID: {reg.id}
                      </span>

                      {isHighlighted && (
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full animate-pulse">
                          Just Registered!
                        </span>
                      )}
                    </div>

                    {/* Event Title */}
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {reg.eventTitle}
                    </h2>

                    {/* Schedule & Venue Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-800 shrink-0" />
                        <span>{reg.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-800 shrink-0" />
                        <span>{reg.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-sky-800 shrink-0" />
                        <span className="font-semibold text-slate-800">{reg.eventVenue}</span>
                      </div>
                    </div>

                    {/* Registered Student Record Line */}
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>Student: <strong className="text-slate-800">{reg.studentName}</strong></span>
                      <span>·</span>
                      <span>Department: <span className="text-slate-800">{reg.department}</span></span>
                      <span>·</span>
                      <span>Year: <span className="text-slate-800">{reg.yearOfStudy}</span></span>
                    </div>

                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    
                    {/* View Event Details Button (Directly requested in user spec) */}
                    <button
                      onClick={() => onNavigate({ name: 'event-details', eventId: reg.eventId })}
                      className="py-2.5 px-4 text-xs sm:text-sm font-semibold text-blue-900 hover:text-white bg-blue-50 hover:bg-blue-900 rounded-xl transition-colors border border-blue-200 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-600"
                    >
                      <span>View Event Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPass(reg)}
                        className="py-1.5 px-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                        title="View pass QR and entry badge"
                      >
                        <QrCode className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Pass</span>
                      </button>

                      <button
                        onClick={() => setCancellingId(reg.id)}
                        className="py-1.5 px-2.5 text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
            <Ticket className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              No active registrations found
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              You haven't registered for any events yet. Browse our upcoming calendar and reserve your seat today.
            </p>
          </div>
          <div>
            <button
              onClick={() => onNavigate({ name: 'events' })}
              className="py-3 px-6 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Cancelled Registrations Accordion (if any) */}
      {cancelledRegistrations.length > 0 && (
        <div className="pt-6 border-t border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Cancelled Registrations ({cancelledRegistrations.length})
          </span>
          <div className="space-y-2 opacity-75">
            {cancelledRegistrations.map(r => (
              <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="line-through font-semibold text-slate-600">{r.eventTitle}</span>
                  <span className="text-slate-400 ml-2">ID: {r.id}</span>
                </div>
                <span className="text-slate-500 bg-slate-200 px-2 py-0.5 rounded text-2xs font-semibold">
                  Cancelled
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CANCEL REGISTRATION CONFIRMATION MODAL */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Cancel Event Registration?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Are you sure you want to cancel your registration? Your reserved seat will be released back to other students.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCancellingId(null)}
                className="py-2 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Keep Registration
              </button>
              <button
                onClick={() => confirmCancel(cancellingId)}
                className="py-2 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                Yes, Cancel Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL PASS QR MODAL */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 relative">
            <button
              onClick={() => setSelectedPass(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
            <div>
              <span className="text-xs uppercase font-bold text-blue-900">Digital Entry Pass</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {selectedPass.eventTitle}
              </h3>
              <p className="text-xs text-slate-500">{selectedPass.eventVenue}</p>
            </div>

            {/* Simulated QR Code Graphic */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block">
              <div className="w-36 h-36 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
                <QrCode className="w-28 h-28 text-white" />
              </div>
              <p className="text-xs font-mono font-bold text-slate-700 mt-2">
                {selectedPass.id}
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>Admit: <strong>{selectedPass.studentName}</strong></p>
              <p>{selectedPass.eventDate} · {selectedPass.eventTime}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
