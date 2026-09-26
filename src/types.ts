export type EventCategory = 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Student Club';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // e.g. "10 October 2026"
  isoDate: string; // "2026-10-10"
  time: string; // e.g. "10:00 AM – 3:00 PM"
  venue: string; // e.g. "Computer Science Lab"
  shortDescription: string;
  fullDescription: string;
  image: string;
  fallbackGradient: string;
  eligibility: string;
  registrationDeadline: string;
  availableSeats: number;
  totalSeats: number;
  featured?: boolean;
  learningOutcomes: string[];
  organizer: {
    name: string;
    role: string;
    clubOrDept: string;
    email: string;
    phone: string;
  };
  locationDetails: {
    building: string;
    floor: string;
    roomNumber: string;
    landmark: string;
    accessibility: string;
    directions: string;
    gateEntry: string;
  };
}

export interface Registration {
  id: string; // e.g. "REG-CS2026-8912"
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCategory: EventCategory;
  studentName: string;
  studentEmail: string;
  department: string;
  yearOfStudy: string;
  phoneNumber: string;
  studentId?: string;
  registeredAt: string;
  status: 'Registered' | 'Attended' | 'Cancelled';
}

export type PageView = 
  | { name: 'home' }
  | { name: 'events'; categoryFilter?: EventCategory | 'All' }
  | { name: 'event-details'; eventId: string }
  | { name: 'register'; eventId?: string }
  | { name: 'success'; registrationId: string }
  | { name: 'my-registrations'; highlightId?: string }
  | { name: 'about' };
