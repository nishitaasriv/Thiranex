import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  Mail, 
  Phone, 
  Navigation, 
  Share2, 
  Check, 
  Info,
  Building,
  DoorOpen,
  Accessibility
} from 'lucide-react';
import { EventItem, PageView } from '../types';

interface EventDetailsPageProps {
  event: EventItem;
  onNavigate: (page: PageView) => void;
  onRegister: (eventId: string) => void;
  isRegistered?: boolean;
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event,
  onNavigate,
  onRegister,
  isRegistered = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const percentageSeatsLeft = Math.round((event.availableSeats / event.totalSeats) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation Row: Back Button & Category Trail */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate({ name: 'events' })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          title="Share event link"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share Event</span>
            </>
          )}
        </button>
      </div>

      {/* HERO SECTION / BANNER CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Event Header Image */}
        <div className="relative aspect-21/9 sm:aspect-16/7 w-full bg-slate-100 overflow-hidden">
          {!imageError ? (
            <img
              src={event.image}
              alt={event.title}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${event.fallbackGradient} p-8 flex flex-col justify-end text-white`}>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                {event.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                {event.title}
              </h1>
            </div>
          )}

          {/* Category Chip */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-bold bg-white text-slate-900 rounded-md shadow-xs">
              {event.category}
            </span>
          </div>

          {/* Registration Status Pill if Already Registered */}
          {isRegistered && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-md shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                You are registered
              </span>
            </div>
          )}
        </div>

        {/* Title & Primary Action Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-blue-900 font-semibold">{event.category} Event</span>
                <span aria-hidden="true">·</span>
                <span>Fall Term 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {event.shortDescription}
              </p>
            </div>

            {/* Prominent Action Button: Register Now */}
            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
              {isRegistered ? (
                <div className="space-y-2 w-full md:w-auto">
                  <button
                    onClick={() => onNavigate({ name: 'my-registrations' })}
                    className="w-full md:w-auto py-3 px-6 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-emerald-600"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>View in My Registrations</span>
                  </button>
                  <p className="text-xs text-slate-500 text-center md:text-right">
                    Seat reserved under your student record
                  </p>
                </div>
              ) : (
                <div className="space-y-2 w-full md:w-auto">
                  <button
                    onClick={() => onRegister(event.id)}
                    className="w-full md:w-auto py-3.5 px-8 text-base font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-600 cursor-pointer"
                  >
                    <span>Register Now</span>
                  </button>
                  <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-900 tabular-nums">
                      {event.availableSeats} of {event.totalSeats} seats open
                    </span>
                    <span>· Free Student Entry</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* KEY EVENT SUMMARY GRID (Directly targets Usability Scenario 2) */}
        <div className="bg-slate-50/70 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-slate-200">
          
          {/* 1. Date */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Event Date
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">
                {event.date}
              </span>
              <span className="text-xs text-slate-500">Fall Semester 2026</span>
            </div>
          </div>

          {/* 2. Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Time &amp; Schedule
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">
                {event.time}
              </span>
              <span className="text-xs text-slate-500">Doors open 15m early</span>
            </div>
          </div>

          {/* 3. Venue */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Event Venue
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">
                {event.venue}
              </span>
              <span className="text-xs text-slate-500">{event.locationDetails.building}</span>
            </div>
          </div>

          {/* 4. Eligibility */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Eligibility
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5 line-clamp-2">
                {event.eligibility}
              </span>
            </div>
          </div>

        </div>

        {/* SECONDARY INFO: DEADLINE & CAPACITY */}
        <div className="px-6 py-4 bg-white flex flex-wrap items-center justify-between text-xs text-slate-600 gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Registration Deadline: <strong className="text-slate-800">{event.registrationDeadline}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Total Seat Capacity: <strong className="text-slate-800">{event.totalSeats} students</strong> ({event.availableSeats} available)
            </span>
          </div>
        </div>

      </div>

      {/* TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Event Description, What Participants Learn */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Event Description */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              About This Event
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {event.fullDescription}
            </p>
          </section>

          {/* What Participants Will Learn / Experience */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              What Participants Will Learn &amp; Experience
            </h2>
            <div className="space-y-3">
              {event.learningOutcomes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* VENUE & LOCATION INFORMATION (Directly targets Usability Scenario 5) */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Campus Navigation Guide
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  Venue &amp; Location Information
                </h2>
              </div>
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
            </div>

            {/* Structured location metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-600" />
                  Building &amp; Wing
                </span>
                <p className="font-bold text-slate-900">
                  {event.locationDetails.building}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <DoorOpen className="w-3.5 h-3.5 text-slate-600" />
                  Floor &amp; Room Number
                </span>
                <p className="font-bold text-slate-900">
                  {event.locationDetails.floor} · {event.locationDetails.roomNumber}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  Campus Landmark
                </span>
                <p className="font-semibold text-slate-800">
                  {event.locationDetails.landmark}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-slate-600" />
                  Accessibility &amp; Elevators
                </span>
                <p className="font-semibold text-slate-800">
                  {event.locationDetails.accessibility}
                </p>
              </div>
            </div>

            {/* Detailed Walking Directions */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-blue-950 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-blue-700" />
                How to Reach from Main Entrance:
              </span>
              <p className="text-slate-700 leading-relaxed">
                {event.locationDetails.directions}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-blue-900 font-semibold">
                <span>Recommended Entry: <strong>{event.locationDetails.gateEntry}</strong></span>
              </div>
            </div>

          </section>

        </div>

        {/* Right Column (4 cols): Organizer Info, Quick Register Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Registration Action Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 sticky top-20">
            <h3 className="text-base font-bold text-slate-900">
              Registration Overview
            </h3>
            
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Registration Fee:</span>
                <span className="font-bold text-emerald-600">Free for Students</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Seats Remaining:</span>
                <span className="font-bold text-slate-900 tabular-nums">{event.availableSeats} of {event.totalSeats}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Closes on:</span>
                <span className="font-medium text-slate-800">{event.registrationDeadline}</span>
              </div>
            </div>

            {/* Progress bar of seats */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(10, 100 - percentageSeatsLeft)}%` }}
                />
              </div>
              <p className="text-2xs text-slate-400 text-right">
                {100 - percentageSeatsLeft}% booked
              </p>
            </div>

            <button
              onClick={() => onRegister(event.id)}
              className="w-full py-3 px-4 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <span>{isRegistered ? 'Update Registration' : 'Register Now'}</span>
            </button>

            <button
              onClick={() => onNavigate({ name: 'events' })}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
            >
              Browse Other Events
            </button>

            {/* ORGANIZER CONTACT INFO */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Event Organizer
              </span>
              
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">
                  {event.organizer.name}
                </p>
                <p className="text-xs text-slate-600">
                  {event.organizer.role}
                </p>
                <p className="text-xs font-medium text-blue-900">
                  {event.organizer.clubOrDept}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${event.organizer.email}`} className="text-blue-900 hover:underline">
                    {event.organizer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{event.organizer.phone}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
