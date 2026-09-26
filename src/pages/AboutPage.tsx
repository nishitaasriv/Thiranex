import React from 'react';
import { Compass, UserCheck, MapPin, Mail, Phone, Clock, HelpCircle, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { PageView } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'Is there any fee to register for college events?',
      a: 'No. All events hosted on CampusEvents are organized by university academic departments, student societies, or sports councils and are 100% free for currently enrolled students.'
    },
    {
      q: 'How do I confirm my registration on event day?',
      a: 'Simply present your Registration ID (visible in your confirmation or under the "My Registrations" tab) to the student coordinator at the check-in desk.'
    },
    {
      q: 'Can I cancel or change my registration if my schedule changes?',
      a: 'Yes. You can visit the "My Registrations" page anytime and click "Cancel" so your seat can be automatically offered to fellow students on the waitlist.'
    },
    {
      q: 'Where do I find the exact room or building location for an event?',
      a: 'Every event details page contains a comprehensive "Venue & Location Information" guide detailing building code, floor, room number, gate entry, and campus directions.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HERO SECTION */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          About CampusEvents Portal
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          About CampusEvents
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          CampusEvents is a centralized platform designed to help students discover and participate in college events, workshops, competitions, sports activities and student club programs.
        </p>
      </div>

      {/* THREE CORE FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Discover Events */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 hover:border-blue-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Discover Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse through technical coding sprints, academic workshops, cultural fiestas, and inter-department sports in one unified calendar. Filter by category, dates, and topics effortlessly.
          </p>
        </div>

        {/* Card 2: Easy Registration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Easy Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Quick, frictionless registration without external accounts or payment gates. Receive an immediate digital pass and unique Registration ID in under 60 seconds.
          </p>
        </div>

        {/* Card 3: Event Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Event Information
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Transparent event breakdowns detailing learning takeaways, exact building names, room numbers, accessibility access, parking notes, and faculty organizer contacts.
          </p>
        </div>

      </div>

      {/* PURPOSE & USABILITY EVALUATION MISSION */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-md space-y-4">
        <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
          Academic UI/UX Project
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold">
          Built for Usability Testing &amp; Analysis
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          This portal was structured specifically to evaluate real student navigation behaviors across five core usability scenarios: discovering technical contests, interpreting schedule/eligibility constraints, completing frictionless signups, retrieving digital tickets, and finding physical venue landmarks.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>WCAG Contrast Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Responsive Desktop, Tablet &amp; Mobile</span>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common questions regarding event registration and participation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SECTION (Clearly labeled as sample / academic contact) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
            Get in Touch
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Campus Event Secretariat &amp; Support
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Have questions about organizing an event or encountering registration issues? Reach out to our campus desk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs sm:text-sm">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-700" />
              Office Location
            </span>
            <p className="font-bold text-slate-900">
              Student Activity Center
            </p>
            <p className="text-xs text-slate-600">
              Room 204, 2nd Floor, Main Campus
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-700" />
              Email Inquiries
            </span>
            <p className="font-bold text-slate-900">
              events-desk@campus.edu
            </p>
            <p className="text-xs text-slate-600">
              Response within 24 business hours
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-700" />
              Telephone Support
            </span>
            <p className="font-bold text-slate-900">
              +1 (555) 019-2834
            </p>
            <p className="text-xs text-slate-600">
              Mon–Fri, 9:00 AM – 5:00 PM
            </p>
          </div>

        </div>

        <div className="text-2xs text-slate-400 border-t border-slate-100 pt-3">
          Note: This website is an academic UI/UX testing prototype. Contact information and student organizations listed above are simulated for testing purposes.
        </div>
      </div>

    </div>
  );
};
