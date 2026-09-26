import React from 'react';
import { Calendar, ArrowRight, Code, Film, Trophy, Users2, MapPin, CheckCircle2, Search } from 'lucide-react';
import { EventItem, EventCategory, PageView } from '../types';
import { EventCard } from '../components/EventCard';

interface HomePageProps {
  events: EventItem[];
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ events, onNavigate }) => {
  // Show 4 upcoming events on homepage
  const upcomingFour = events.slice(0, 4);

  const categories: {
    name: EventCategory;
    title: string;
    description: string;
    count: number;
    icon: React.ReactNode;
    colorClass: string;
  }[] = [
    {
      name: 'Technical',
      title: 'Technical',
      description: 'Competitive coding, hackathons, robotics showdowns, and tech competitions.',
      count: events.filter(e => e.category === 'Technical').length,
      icon: <Code className="w-6 h-6 text-blue-600" />,
      colorClass: 'border-blue-200 hover:border-blue-400 bg-blue-50/30'
    },
    {
      name: 'Cultural',
      title: 'Cultural',
      description: 'Music concerts, dance performances, theater acts, and talent fiestas.',
      count: events.filter(e => e.category === 'Cultural').length,
      icon: <Film className="w-6 h-6 text-purple-600" />,
      colorClass: 'border-purple-200 hover:border-purple-400 bg-purple-50/30'
    },
    {
      name: 'Sports',
      title: 'Sports',
      description: 'Inter-department tournaments, athletic meets, volleyball, and varsity sports.',
      count: events.filter(e => e.category === 'Sports').length,
      icon: <Trophy className="w-6 h-6 text-emerald-600" />,
      colorClass: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30'
    },
    {
      name: 'Student Club',
      title: 'Student Clubs',
      description: 'Photography societies, debate clubs, literary circles, and student meetups.',
      count: events.filter(e => e.category === 'Student Club' || e.category === 'Workshop').length,
      icon: <Users2 className="w-6 h-6 text-amber-600" />,
      colorClass: 'border-amber-200 hover:border-amber-400 bg-amber-50/30'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Fall Semester 2026 Registration Open</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover. Participate. Connect.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Find college events, workshops, competitions and activities in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate({ name: 'events' })}
                className="py-3 px-6 text-sm sm:text-base font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate({ name: 'my-registrations' })}
                className="py-3 px-6 text-sm sm:text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                View My Registrations
              </button>
            </div>

            {/* Quick benefit bullet points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium border-t border-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero fees for students
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Instant confirmation pass
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Campus venue navigation
              </span>
            </div>

          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <img
                src="/src/assets/images/hero_campus_events_1790396304152.jpg"
                alt="University students gathered around campus event boards"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-sky-300">
                  Campus Life · October &amp; November 2026
                </span>
                <p className="text-lg font-bold mt-1">
                  Connect with your campus community through live events
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Over 800+ seats reserved this academic term across all campus clubs
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-900">
              Featured Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Upcoming Events
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Hand-picked competitions, workshops, and gatherings happening this month.
            </p>
          </div>

          <button
            onClick={() => onNavigate({ name: 'events' })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700 self-start sm:self-auto py-1"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFour.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={(id) => onNavigate({ name: 'event-details', eventId: id })}
              onQuickRegister={(id) => onNavigate({ name: 'register', eventId: id })}
            />
          ))}
        </div>

        {/* Central View All Events Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate({ name: 'events' })}
            className="py-3 px-8 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 inline-flex items-center gap-2"
          >
            <span>View All {events.length} Upcoming Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* EXPLORE EVENT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-purple-900">
            Browse by Interest
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Explore Event Categories
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Find the perfect events aligned with your academic focus and creative hobbies.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate({ name: 'events', categoryFilter: cat.name })}
              className={`p-6 rounded-xl border ${cat.colorClass} cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onNavigate({ name: 'events', categoryFilter: cat.name });
                }
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="text-slate-500">
                  {cat.count} {cat.count === 1 ? 'event' : 'events'} listed
                </span>
                <span className="inline-flex items-center gap-1 text-blue-900 group-hover:translate-x-0.5 transition-transform">
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK HOW IT WORKS FOR STUDENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-md">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
              Simple 3-Step Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              How CampusEvents Works for College Students
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              No account creation or payment fees. Designed to help students reserve event seats, track schedules, and find venues instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
              <span className="text-sky-400 font-mono text-sm font-bold">Step 01</span>
              <h3 className="text-base font-bold text-white mt-1">Browse &amp; Filter</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Filter by technical, cultural, sports, or workshops to discover events matching your schedule.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
              <span className="text-sky-400 font-mono text-sm font-bold">Step 02</span>
              <h3 className="text-base font-bold text-white mt-1">Quick Registration</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Fill in your student name, college email, department, and phone in under 60 seconds.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
              <span className="text-sky-400 font-mono text-sm font-bold">Step 03</span>
              <h3 className="text-base font-bold text-white mt-1">Access Your Pass</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Get an instant Registration ID and review campus venue directions under My Registrations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
