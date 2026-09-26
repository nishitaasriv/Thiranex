import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar as CalendarIcon, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { EventItem, EventCategory, PageView } from '../types';
import { EventCard } from '../components/EventCard';

interface EventsPageProps {
  events: EventItem[];
  initialCategory?: EventCategory | 'All';
  onNavigate: (page: PageView) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  initialCategory = 'All',
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>(initialCategory);
  const [dateFilter, setDateFilter] = useState<'all' | 'early-oct' | 'mid-oct' | 'late-oct' | 'nov'>('all');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'title-asc' | 'seats-desc'>('date-asc');

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Technical',
    'Workshop',
    'Cultural',
    'Sports',
    'Student Club'
  ];

  // Filtering & Sorting logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = event.title.toLowerCase().includes(q);
          const matchesVenue = event.venue.toLowerCase().includes(q);
          const matchesDesc = event.shortDescription.toLowerCase().includes(q);
          const matchesCat = event.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesVenue && !matchesDesc && !matchesCat) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }

        // Date filter
        if (dateFilter === 'early-oct') {
          // Oct 1 to Oct 12
          const day = parseInt(event.isoDate.split('-')[2], 10);
          const month = parseInt(event.isoDate.split('-')[1], 10);
          if (month !== 10 || day > 12) return false;
        } else if (dateFilter === 'mid-oct') {
          // Oct 13 to Oct 20
          const day = parseInt(event.isoDate.split('-')[2], 10);
          const month = parseInt(event.isoDate.split('-')[1], 10);
          if (month !== 10 || day < 13 || day > 20) return false;
        } else if (dateFilter === 'late-oct') {
          // Oct 21 to Oct 31
          const day = parseInt(event.isoDate.split('-')[2], 10);
          const month = parseInt(event.isoDate.split('-')[1], 10);
          if (month !== 10 || day < 21) return false;
        } else if (dateFilter === 'nov') {
          const month = parseInt(event.isoDate.split('-')[1], 10);
          if (month !== 11) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') {
          return a.isoDate.localeCompare(b.isoDate);
        }
        if (sortBy === 'date-desc') {
          return b.isoDate.localeCompare(a.isoDate);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'seats-desc') {
          return b.availableSeats - a.availableSeats;
        }
        return 0;
      });
  }, [events, searchQuery, selectedCategory, dateFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDateFilter('all');
    setSortBy('date-asc');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || dateFilter !== 'all' || sortBy !== 'date-asc';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 mb-1 uppercase tracking-wider">
          <span>College Event Directory</span>
          <span aria-hidden="true">·</span>
          <span>Fall 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upcoming College Events
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
          Search and filter through all university competitions, hackathons, workshops, and sports fixtures. Select any event to review complete schedules and reserve your student seat.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <label htmlFor="event-search" className="sr-only">
              Search events by title, venue, or keyword
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="event-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, venue (e.g. 'Lab', 'Auditorium'), or keyword..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sm:col-span-4 relative">
            <label htmlFor="sort-select" className="sr-only">
              Sort events by
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="date-asc">Date: Earliest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="title-asc">Title: Alphabetical (A-Z)</option>
              <option value="seats-desc">Available Seats (High to Low)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

        </div>

        {/* Row 2: Category Tabs & Date Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Date Filter Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              Timeline:
            </span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="all">All Dates (Oct – Nov 2026)</option>
              <option value="early-oct">Early October (Oct 1 – 12)</option>
              <option value="mid-oct">Mid October (Oct 13 – 20)</option>
              <option value="late-oct">Late October (Oct 21 – 31)</option>
              <option value="nov">November 2026</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-900 hover:text-blue-700 font-semibold px-2 py-1.5 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

        </div>

      </div>

      {/* RESULTS COUNT & STATUS */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>
          Showing <span className="font-bold text-slate-800 tabular-nums">{filteredEvents.length}</span> of{' '}
          <span className="font-bold text-slate-800 tabular-nums">{events.length}</span> total events
          {selectedCategory !== 'All' && <span> in <strong className="text-blue-900">{selectedCategory}</strong></span>}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs text-slate-600 hover:text-slate-900 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* EVENT CARDS GRID */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={(id) => onNavigate({ name: 'event-details', eventId: id })}
              onQuickRegister={(id) => onNavigate({ name: 'register', eventId: id })}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching events found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              We couldn't find any college events matching your search or filters. Try adjusting your search keywords or clearing the category filter.
            </p>
          </div>
          <div>
            <button
              onClick={handleResetFilters}
              className="py-2 px-4 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
