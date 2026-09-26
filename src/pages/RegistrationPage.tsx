import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, Calendar, MapPin, Sparkles, User, Mail, GraduationCap, Building2, Phone } from 'lucide-react';
import { EventItem, PageView, Registration } from '../types';
import { DEPARTMENTS, YEARS_OF_STUDY } from '../data/mockEvents';
import { generateRegistrationId, saveRegistration } from '../data/storage';

interface RegistrationPageProps {
  events: EventItem[];
  preselectedEventId?: string;
  onNavigate: (page: PageView) => void;
  onRegistrationSuccess: (registration: Registration) => void;
}

interface FormErrors {
  fullName?: string;
  studentEmail?: string;
  department?: string;
  yearOfStudy?: string;
  eventId?: string;
  phoneNumber?: string;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  events,
  preselectedEventId,
  onNavigate,
  onRegistrationSuccess
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    preselectedEventId || events[0]?.id || ''
  );
  const [fullName, setFullName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  // Helper to pre-populate mock data for quick usability testing
  const handleFillTestData = () => {
    setFullName('Jordan Taylor');
    setStudentEmail('jordan.taylor@campus.edu');
    setDepartment('Computer Science and Engineering');
    setYearOfStudy('Third Year');
    setPhoneNumber('555-412-8921');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    // Student email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentEmail.trim()) {
      newErrors.studentEmail = 'Student Email is required.';
    } else if (!emailRegex.test(studentEmail.trim())) {
      newErrors.studentEmail = 'Please enter a valid email address (e.g., student@campus.edu).';
    }

    // Department
    if (!department) {
      newErrors.department = 'Please select your academic department.';
    }

    // Year of study
    if (!yearOfStudy) {
      newErrors.yearOfStudy = 'Please select your year of study.';
    }

    // Event selection
    if (!selectedEventId) {
      newErrors.eventId = 'Please select an event to register for.';
    }

    // Phone number
    const cleanedPhone = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required for SMS venue updates.';
    } else if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      newErrors.phoneNumber = 'Please enter a valid phone number (7 to 15 digits).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate fast processing (300ms)
    setTimeout(() => {
      if (!activeEvent) {
        setIsSubmitting(false);
        return;
      }

      const registrationId = generateRegistrationId(activeEvent.category);
      const newRegistration: Registration = {
        id: registrationId,
        eventId: activeEvent.id,
        eventTitle: activeEvent.title,
        eventDate: activeEvent.date,
        eventTime: activeEvent.time,
        eventVenue: activeEvent.venue,
        eventCategory: activeEvent.category,
        studentName: fullName.trim(),
        studentEmail: studentEmail.trim().toLowerCase(),
        department,
        yearOfStudy,
        phoneNumber: phoneNumber.trim(),
        registeredAt: new Date().toISOString(),
        status: 'Registered'
      };

      saveRegistration(newRegistration);
      setIsSubmitting(false);
      onRegistrationSuccess(newRegistration);
    }, 350);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            if (preselectedEventId) {
              onNavigate({ name: 'event-details', eventId: preselectedEventId });
            } else {
              onNavigate({ name: 'events' });
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Details</span>
        </button>
      </div>

      {/* Main Registration Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-sky-400">
                Official Student Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Register for Event
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Complete this simple form to secure your entry pass. No registration fee required.
              </p>
            </div>

            {/* Usability Testing Helper: Fill Sample Data Button */}
            <button
              type="button"
              onClick={handleFillTestData}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
              title="Automatically fills valid test student credentials for quick testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Test Details</span>
            </button>
          </div>
        </div>

        {/* Selected Event Preview Banner */}
        {activeEvent && (
          <div className="px-6 py-4 bg-blue-50/70 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-2xs block">
                Selected Event
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">
                {activeEvent.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-slate-600 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-800" />
                  {activeEvent.date} ({activeEvent.time})
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-800" />
                  {activeEvent.venue}
                </span>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <span className="px-2.5 py-1 text-xs font-semibold bg-white border border-blue-200 text-blue-900 rounded-md">
                {activeEvent.category}
              </span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
          
          <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Fields marked with an asterisk (<strong className="text-rose-600">*</strong>) are required.</span>
            <span>Academic Year 2026</span>
          </div>

          {/* Field 1: Event Selection Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="eventId" className="block text-sm font-bold text-slate-800">
              Select Event <span className="text-rose-600">*</span>
            </label>
            <select
              id="eventId"
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                if (errors.eventId) setErrors({ ...errors, eventId: undefined });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                errors.eventId ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.category} — {evt.date})
                </option>
              ))}
            </select>
            {errors.eventId && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.eventId}
              </p>
            )}
          </div>

          {/* Row: Full Name & Student Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Field 2: Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-sm font-bold text-slate-800">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.fullName ? (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              ) : (
                <p className="text-2xs text-slate-500">
                  As it should appear on your attendance pass and certificate.
                </p>
              )}
            </div>

            {/* Field 3: Student Email */}
            <div className="space-y-1.5">
              <label htmlFor="studentEmail" className="block text-sm font-bold text-slate-800">
                Student Email <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="studentEmail"
                  type="email"
                  value={studentEmail}
                  onChange={(e) => {
                    setStudentEmail(e.target.value);
                    if (errors.studentEmail) setErrors({ ...errors, studentEmail: undefined });
                  }}
                  placeholder="e.g. student@campus.edu"
                  autoComplete="email"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                    errors.studentEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.studentEmail ? (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.studentEmail}
                </p>
              ) : (
                <p className="text-2xs text-slate-500">
                  Confirmation and schedule reminders will be sent here.
                </p>
              )}
            </div>

          </div>

          {/* Row: Department & Year of Study */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Field 4: Department Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="department" className="block text-sm font-bold text-slate-800">
                Department <span className="text-rose-600">*</span>
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  if (errors.department) setErrors({ ...errors, department: undefined });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                  errors.department ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="">-- Select Your Department --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.department}
                </p>
              )}
            </div>

            {/* Field 5: Year of Study Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="yearOfStudy" className="block text-sm font-bold text-slate-800">
                Year of Study <span className="text-rose-600">*</span>
              </label>
              <select
                id="yearOfStudy"
                value={yearOfStudy}
                onChange={(e) => {
                  setYearOfStudy(e.target.value);
                  if (errors.yearOfStudy) setErrors({ ...errors, yearOfStudy: undefined });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                  errors.yearOfStudy ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="">-- Select Year of Study --</option>
                {YEARS_OF_STUDY.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.yearOfStudy && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.yearOfStudy}
                </p>
              )}
            </div>

          </div>

          {/* Field 6: Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phoneNumber" className="block text-sm font-bold text-slate-800">
              Phone Number <span className="text-rose-600">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
              }}
              placeholder="e.g. 555-019-2834"
              autoComplete="tel"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.phoneNumber ? (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phoneNumber}
              </p>
            ) : (
              <p className="text-2xs text-slate-500">
                Used for instant emergency venue changes and SMS check-in reminders.
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Student Privacy Notice: </span>
            Information collected is strictly used for event registration, seat reservation, and campus verification. No external sharing or fees.
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ name: 'events' })}
              className="w-full sm:w-auto py-2.5 px-5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto py-3 px-8 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-600 order-1 sm:order-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Submitting Registration...</span>
              ) : (
                <span>Submit Registration</span>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
