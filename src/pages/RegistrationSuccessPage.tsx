import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Ticket, ArrowRight, Printer, Share2 } from 'lucide-react';
import { Registration, PageView } from '../types';

interface RegistrationSuccessPageProps {
  registration: Registration;
  onNavigate: (page: PageView) => void;
}

export const RegistrationSuccessPage: React.FC<RegistrationSuccessPageProps> = ({
  registration,
  onNavigate
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* SUCCESS HERO BADGE */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Confirmed &amp; Saved
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Registration Successful!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
            Your seat has been reserved. Please present your Registration ID or show this screen at the check-in desk.
          </p>
        </div>
      </div>

      {/* REGISTRATION PASS CARD */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-md overflow-hidden relative">
        
        {/* Top Header of Ticket */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
              CampusEvents Official Pass
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
              {registration.eventTitle}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Status</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              <CheckCircle2 className="w-3 h-3" />
              Registered
            </span>
          </div>
        </div>

        {/* Ticket Perforation / Separator Style */}
        <div className="relative flex items-center justify-between px-4 py-1 bg-slate-100 border-y border-dashed border-slate-300">
          <div className="w-4 h-4 rounded-full bg-slate-50 -ml-6 border-r border-slate-300" />
          <span className="text-2xs font-mono text-slate-400 uppercase tracking-widest">
            ADMIT ONE · STUDENT PASS
          </span>
          <div className="w-4 h-4 rounded-full bg-slate-50 -mr-6 border-l border-slate-300" />
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Key Registration ID highlight */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Registration ID
              </span>
              <p className="text-xl sm:text-2xl font-mono font-extrabold text-blue-950 mt-0.5 tracking-tight">
                {registration.id}
              </p>
            </div>
            <div className="text-xs text-blue-800 bg-white/80 px-3 py-1.5 rounded-lg border border-blue-200 self-start sm:self-auto font-medium">
              Save or screenshot this ID
            </div>
          </div>

          {/* Student & Event Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Student Name
              </span>
              <p className="font-bold text-slate-900 text-base">
                {registration.studentName}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Student Email
              </span>
              <p className="font-semibold text-slate-800">
                {registration.studentEmail}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Department
              </span>
              <p className="font-semibold text-slate-800">
                {registration.department}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Year of Study
              </span>
              <p className="font-semibold text-slate-800">
                {registration.yearOfStudy}
              </p>
            </div>

          </div>

          {/* Event Schedule & Venue Highlight (Crucial for Scenarios 3 & 5) */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-500 block uppercase font-medium">Date</span>
                <span className="font-bold text-slate-900">{registration.eventDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-purple-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-500 block uppercase font-medium">Time</span>
                <span className="font-bold text-slate-900">{registration.eventTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-500 block uppercase font-medium">Venue</span>
                <span className="font-bold text-slate-900">{registration.eventVenue}</span>
              </div>
            </div>

          </div>

          <div className="text-2xs text-slate-400 text-center pt-2">
            Registered on {new Date(registration.registeredAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })} · Campus Verification System
          </div>

        </div>

      </div>

      {/* ACTION BUTTONS (Directly requested: View My Registration & Back to Events) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        
        <button
          onClick={() => onNavigate({ name: 'my-registrations', highlightId: registration.id })}
          className="w-full sm:w-auto py-3 px-6 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <Ticket className="w-4 h-4" />
          <span>View My Registration</span>
        </button>

        <button
          onClick={() => onNavigate({ name: 'events' })}
          className="w-full sm:w-auto py-3 px-6 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
        >
          <span>Back to Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* Secondary Quick Action: Print Pass */}
      <div className="text-center">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save Confirmation as PDF</span>
        </button>
      </div>

    </div>
  );
};
