import { Registration } from '../types';
import { MOCK_EVENTS } from './mockEvents';

const STORAGE_KEY = 'campusevents_registrations_v1';

// Seed registration so Scenario 4 is instantly testable right from first load
const INITIAL_DEMO_REGISTRATIONS: Registration[] = [
  {
    id: 'REG-AI2026-7842',
    eventId: 'ai-innovation-workshop',
    eventTitle: 'AI Innovation Workshop',
    eventDate: '14 October 2026',
    eventTime: '9:30 AM – 1:00 PM',
    eventVenue: 'Seminar Hall',
    eventCategory: 'Workshop',
    studentName: 'Alex Morgan',
    studentEmail: 'alex.morgan@campus.edu',
    department: 'Computer Science and Engineering',
    yearOfStudy: 'Third Year',
    phoneNumber: '555-019-4821',
    studentId: 'STU-2024-8831',
    registeredAt: '2026-09-24T14:30:00Z',
    status: 'Registered'
  }
];

export function getStoredRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REGISTRATIONS));
      return INITIAL_DEMO_REGISTRATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REGISTRATIONS));
      return INITIAL_DEMO_REGISTRATIONS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to read registrations from localStorage:', e);
    return INITIAL_DEMO_REGISTRATIONS;
  }
}

export function saveRegistration(registration: Registration): Registration[] {
  try {
    const existing = getStoredRegistrations();
    // Prepend new registration so it appears first
    const updated = [registration, ...existing.filter(r => r.id !== registration.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save registration:', e);
    return [registration];
  }
}

export function cancelRegistration(registrationId: string): Registration[] {
  try {
    const existing = getStoredRegistrations();
    const updated = existing.map(r => {
      if (r.id === registrationId) {
        return { ...r, status: 'Cancelled' as const };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to cancel registration:', e);
    return [];
  }
}

export function resetDemoRegistrations(): Registration[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REGISTRATIONS));
    return INITIAL_DEMO_REGISTRATIONS;
  } catch (e) {
    return INITIAL_DEMO_REGISTRATIONS;
  }
}

export function generateRegistrationId(eventCategory: string): string {
  const prefix = eventCategory.slice(0, 2).toUpperCase();
  const year = '2026';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `REG-${prefix}${year}-${randomSuffix}`;
}
