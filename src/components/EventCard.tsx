import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (eventId: string) => void;
  onQuickRegister?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onQuickRegister
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      
      {/* Event Image Banner with Resilient Fallback */}
      <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={event.image}
            alt={event.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${event.fallbackGradient} p-6 flex flex-col justify-end text-white`}>
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
              {event.category}
            </span>
            <p className="text-base font-bold mt-1 line-clamp-1">
              {event.title}
            </p>
          </div>
        )}

        {/* Category Label (Quiet, readable overlay) */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-white/95 text-slate-900 rounded-md backdrop-blur-xs shadow-xs">
            {event.category}
          </span>
        </div>

        {/* Available seats indicator */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-900/80 text-white rounded-md backdrop-blur-xs">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="tabular-nums font-semibold">{event.availableSeats}</span> seats left
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata with Zero-Pill Typography Discipline */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2.5">
            <span className="text-blue-900 font-semibold">{event.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{event.date}</span>
          </div>

          {/* Event Title */}
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors line-clamp-1 mb-2">
            <button
              onClick={() => onViewDetails(event.id)}
              className="text-left focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
            >
              {event.title}
            </button>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Key Event Facts: Time & Venue */}
          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="line-clamp-1">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="line-clamp-1 font-medium text-slate-800">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => onViewDetails(event.id)}
            className="flex-1 py-2 px-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onQuickRegister && (
            <button
              onClick={() => onQuickRegister(event.id)}
              className="py-2 px-3 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Register
            </button>
          )}
        </div>

      </div>

    </article>
  );
};
