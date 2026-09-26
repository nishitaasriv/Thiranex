import { EventItem } from '../types';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'codesprint-2026',
    title: 'CodeSprint 2026',
    category: 'Technical',
    date: '10 October 2026',
    isoDate: '2026-10-10',
    time: '10:00 AM – 3:00 PM',
    venue: 'Computer Science Lab',
    shortDescription: 'A coding challenge for students interested in programming, algorithmic problem solving, and competitive coding.',
    fullDescription: 'CodeSprint 2026 is our flagship competitive programming contest open to all undergraduate and postgraduate engineering students. Tackle algorithmic challenges ranging from dynamic programming and graph theory to system design optimizations. Compete individually or in pairs to earn certificates, tech merchandise, and recognition on the campus leader board.',
    image: '/src/assets/images/event_codesprint_tech_1790396323189.jpg',
    fallbackGradient: 'from-blue-600 to-indigo-900',
    eligibility: 'All undergraduate and graduate college students with valid student ID cards.',
    registrationDeadline: '08 October 2026, 11:59 PM',
    availableSeats: 34,
    totalSeats: 120,
    featured: true,
    learningOutcomes: [
      'Master efficient algorithmic problem-solving under strict time constraints',
      'Learn competitive coding edge cases and time-space complexity optimization',
      'Collaborate on peer code reviews and receive live debugging feedback from faculty mentors',
      'Earn certified participation credentials recognized by the Department of CS'
    ],
    organizer: {
      name: 'Dr. Sarah Jenkins & Alex Chen',
      role: 'Faculty Coordinator & Head of Coding Club',
      clubOrDept: 'Department of Computer Science & Engineering',
      email: 'codesprint@campus.edu',
      phone: '+1 (555) 234-8901'
    },
    locationDetails: {
      building: 'Alan Turing Computing Center (Building B)',
      floor: '3rd Floor',
      roomNumber: 'Lab B-304 & B-305',
      landmark: 'Opposite to Central Library, West Wing Entrance',
      accessibility: 'Elevator access available via Lobby B; wheelchair accessible workstations provided.',
      directions: 'Enter through Campus Main Gate 2. Walk straight past the fountain plaza toward the red-brick engineering quad. Building B is on your right.',
      gateEntry: 'Gate 2 (North Campus Boulevard)'
    }
  },
  {
    id: 'ai-innovation-workshop',
    title: 'AI Innovation Workshop',
    category: 'Workshop',
    date: '14 October 2026',
    isoDate: '2026-10-14',
    time: '9:30 AM – 1:00 PM',
    venue: 'Seminar Hall',
    shortDescription: 'An introductory workshop on artificial intelligence, large language models, and practical emerging technologies.',
    fullDescription: 'Explore modern developments in machine learning, neural networks, and generative artificial intelligence. This hands-on workshop walks through building practical AI-powered software, prompt engineering techniques, and ethical AI deployment. Laptops are recommended for the live coding segment.',
    image: '/src/assets/images/event_ai_workshop_1790396341363.jpg',
    fallbackGradient: 'from-purple-600 to-indigo-950',
    eligibility: 'Open to all departments and all academic years (no prior AI expertise required).',
    registrationDeadline: '12 October 2026, 6:00 PM',
    availableSeats: 18,
    totalSeats: 150,
    featured: true,
    learningOutcomes: [
      'Foundations of modern transformer architectures and generative models',
      'Hands-on prompt engineering and API integration patterns',
      'Understanding real-world deployment challenges and bias mitigation',
      'Receive official workshop toolkit and starter code repositories'
    ],
    organizer: {
      name: 'Prof. Marcus Vance',
      role: 'Director, Emerging Technologies Lab',
      clubOrDept: 'Interdisciplinary AI Research Group',
      email: 'ai-workshop@campus.edu',
      phone: '+1 (555) 345-9012'
    },
    locationDetails: {
      building: 'Sir C.V. Raman Academic Block (Building A)',
      floor: 'Ground Floor',
      roomNumber: 'Main Auditorium / Seminar Hall 1',
      landmark: 'Adjacent to Administrative Office and Welcome Foyer',
      accessibility: 'Ground level, step-free access with assisted hearing loop and ramp entry.',
      directions: 'From Main Gate 1, take the central tree-lined walkway to Building A. Seminar Hall 1 is located immediately past the reception foyer.',
      gateEntry: 'Gate 1 (University Drive)'
    }
  },
  {
    id: 'cultural-fiesta-2026',
    title: 'Cultural Fiesta 2026',
    category: 'Cultural',
    date: '18 October 2026',
    isoDate: '2026-10-18',
    time: '4:00 PM – 8:00 PM',
    venue: 'College Auditorium',
    shortDescription: 'A cultural celebration featuring music, dance, theatrical arts, and vibrant student performances.',
    fullDescription: 'Join the grandest evening of the semester as CampusEvents hosts the Cultural Fiesta 2026! Witness extraordinary talent across classical and contemporary dance troupes, acoustic band showcases, stand-up comedy, and inter-collegiate drama performances. Light refreshments will be provided during the intermission.',
    image: '/src/assets/images/event_cultural_fiesta_1790396353726.jpg',
    fallbackGradient: 'from-amber-600 to-rose-900',
    eligibility: 'Open to all college students, faculty, alumni, and invited guests.',
    registrationDeadline: '17 October 2026, 5:00 PM',
    availableSeats: 82,
    totalSeats: 400,
    featured: true,
    learningOutcomes: [
      'Celebrate multicultural student expression and stage performance arts',
      'Network with student club leaders, fine arts societies, and performers',
      'Enjoy an evening of creative entertainment and campus community building'
    ],
    organizer: {
      name: 'Elena Rostova & Priya Nair',
      role: 'Student Council Cultural Secretaries',
      clubOrDept: 'Campus Arts & Culture Union',
      email: 'cultural-fiesta@campus.edu',
      phone: '+1 (555) 456-0123'
    },
    locationDetails: {
      building: 'Grand Centennial Auditorium (Building C)',
      floor: 'Level 1 & Balcony Tier',
      roomNumber: 'Centennial Hall',
      landmark: 'Beside the Student Activity Center and North Lawn',
      accessibility: 'Dedicated wheelchair seating in Row G and automated entrance doors.',
      directions: 'Head past the central clock tower towards the North Lawn. The Centennial Auditorium is the glass facade structure directly facing the grass arena.',
      gateEntry: 'Gate 1 or Gate 3 (Auditorium Lane)'
    }
  },
  {
    id: 'inter-dept-volleyball',
    title: 'Inter-Department Volleyball Tournament',
    category: 'Sports',
    date: '21 October 2026',
    isoDate: '2026-10-21',
    time: '2:00 PM – 6:00 PM',
    venue: 'College Sports Ground',
    shortDescription: 'An inter-department volleyball tournament fostering athletic spirit, teamwork, and healthy competition.',
    fullDescription: 'Cheer on your department or register as an athlete in the annual Inter-Department Volleyball Championship! Teams representing CS, IT, ECE, Mechanical, Civil, and Management will battle through knockout brackets. Water stations, medical aid, and official refereeing provided.',
    image: '/src/assets/images/event_volleyball_sports_1790396365823.jpg',
    fallbackGradient: 'from-emerald-600 to-teal-950',
    eligibility: 'All currently enrolled undergraduate and graduate students with valid medical clearance.',
    registrationDeadline: '19 October 2026, 8:00 PM',
    availableSeats: 45,
    totalSeats: 160,
    featured: true,
    learningOutcomes: [
      'Experience competitive sportsmanship and high-intensity team coordination',
      'Foster inter-departmental camaraderie across academic disciplines',
      'Trophies and medals awarded to winners and runner-ups by the Sports Director'
    ],
    organizer: {
      name: 'Coach Dave Morrison',
      role: 'Head of Physical Education & Athletics',
      clubOrDept: 'Department of Sports & Recreation',
      email: 'athletics@campus.edu',
      phone: '+1 (555) 567-1234'
    },
    locationDetails: {
      building: 'Outdoor Sports Complex & Pavilions',
      floor: 'Ground Level Outdoor Court',
      roomNumber: 'Court 1 & Court 2',
      landmark: 'Behind the Indoor Gymnasium and Swimming Pool',
      accessibility: 'Paved walkways from parking lot with shaded spectator bleachers.',
      directions: 'Follow the South Ring Road past the varsity gymnasium. The volleyball sand and hard courts are located right next to the grandstand pavilion.',
      gateEntry: 'Gate 4 (Sports Complex Gate)'
    }
  },
  {
    id: 'photography-club-meetup',
    title: 'Photography Club Meetup',
    category: 'Student Club',
    date: '24 October 2026',
    isoDate: '2026-10-24',
    time: '3:00 PM – 5:00 PM',
    venue: 'Activity Room',
    shortDescription: 'A photography meetup for students interested in visual storytelling, street photography, and editing techniques.',
    fullDescription: 'Whether you shoot with a DSLR, mirrorless camera, or smartphone, the Campus Shutter Society welcomes you! We will cover composition rules, low-light techniques, and lead an interactive photowalk around historical campus architecture followed by a peer photo critique.',
    image: '/src/assets/images/hero_campus_events_1790396304152.jpg',
    fallbackGradient: 'from-slate-700 to-zinc-900',
    eligibility: 'All students interested in photography (all skill levels and camera types welcome).',
    registrationDeadline: '23 October 2026, 12:00 PM',
    availableSeats: 12,
    totalSeats: 35,
    featured: false,
    learningOutcomes: [
      'Understanding natural light framing, rule of thirds, and leading lines',
      'Hands-on practice during a guided architectural campus photowalk',
      'Color grading workflows using free mobile and desktop software',
      'Opportunity to have photos featured in the Annual University Magazine'
    ],
    organizer: {
      name: 'Kavita Patel',
      role: 'President, Shutter Society Photography Club',
      clubOrDept: 'Student Activity Council',
      email: 'photography-club@campus.edu',
      phone: '+1 (555) 678-2345'
    },
    locationDetails: {
      building: 'Student Activity Center (SAC)',
      floor: '2nd Floor',
      roomNumber: 'Media Room 208',
      landmark: 'Next to Campus Radio Studio and Student Lounge',
      accessibility: 'Elevator located in central atrium of SAC building.',
      directions: 'Head to the student union building (SAC). Take the central stairs or elevator to the 2nd floor, turn left past the cafe into Room 208.',
      gateEntry: 'Gate 1 (Central Plaza Entrance)'
    }
  },
  {
    id: 'web-dev-workshop',
    title: 'Web Development Workshop',
    category: 'Workshop',
    date: '28 October 2026',
    isoDate: '2026-10-28',
    time: '10:00 AM – 1:00 PM',
    venue: 'Innovation Lab',
    shortDescription: 'A beginner-friendly workshop covering modern web development concepts, responsive UI, and React basics.',
    fullDescription: 'Demystify modern frontend development in this engaging, zero-prerequisite workshop. Build and deploy your very first responsive web application using HTML, modern CSS, and React component architectures. TAs and student mentors will be circulating the room to debug code with you.',
    image: '/src/assets/images/event_codesprint_tech_1790396323189.jpg',
    fallbackGradient: 'from-cyan-600 to-blue-900',
    eligibility: 'Beginners from any academic branch interested in creating websites.',
    registrationDeadline: '26 October 2026, 11:59 PM',
    availableSeats: 22,
    totalSeats: 60,
    featured: false,
    learningOutcomes: [
      'Fundamentals of semantic HTML and responsive CSS layouts',
      'Building reusable component hierarchies with React hooks',
      'Deploying a live portfolio site to the web in under 10 minutes',
      'Access to recorded tutorials and GitHub code templates'
    ],
    organizer: {
      name: 'Devon Lee & Maya Lin',
      role: 'Lead Student Instructors',
      clubOrDept: 'Google Developer Student Club & Web Ops Team',
      email: 'webdev-club@campus.edu',
      phone: '+1 (555) 789-3456'
    },
    locationDetails: {
      building: 'Technology Innovation & Incubation Center',
      floor: '1st Floor',
      roomNumber: 'Innovation Studio Lab 102',
      landmark: 'East Wing of Engineering Complex',
      accessibility: 'Fully wheelchair accessible ground ramp and automated doors.',
      directions: 'Enter from East Gate 3. Walk past the cafeteria pavilion toward the glass Innovation Hub. Lab 102 is immediately on the first floor.',
      gateEntry: 'Gate 3 (East Engineering Gate)'
    }
  },
  {
    id: 'robowars-arena',
    title: 'RoboWars Arena 2026',
    category: 'Technical',
    date: '02 November 2026',
    isoDate: '2026-11-02',
    time: '11:00 AM – 4:00 PM',
    venue: 'Engineering Courtyard',
    shortDescription: 'Combat robotics and autonomous maze navigation showdown between student engineering teams.',
    fullDescription: 'Witness high-octane engineering as custom 15kg combat bots and autonomous rovers battle inside our reinforced polycarbonate arena. Featuring dual categories: Combat Arena and Obstacle Course Speed Run.',
    image: '/src/assets/images/event_codesprint_tech_1790396323189.jpg',
    fallbackGradient: 'from-red-600 to-slate-900',
    eligibility: 'Open to all engineering students and spectators.',
    registrationDeadline: '30 October 2026, 6:00 PM',
    availableSeats: 50,
    totalSeats: 250,
    featured: false,
    learningOutcomes: [
      'Observe embedded robotics hardware, microcontrollers, and wireless telemetry',
      'Network with robotics sponsors and research labs',
      'Vote for the best design innovation award'
    ],
    organizer: {
      name: 'Robotics Club Executive Committee',
      role: 'Event Coordinators',
      clubOrDept: 'Department of Mechanical & Mechatronics',
      email: 'robowars@campus.edu',
      phone: '+1 (555) 890-4567'
    },
    locationDetails: {
      building: 'Engineering Quadrangle Open Courtyard',
      floor: 'Ground Level Open Arena',
      roomNumber: 'Outdoor Arena Pit',
      landmark: 'Center of Mechanical Engineering workshops',
      accessibility: 'Open paved area with ramp access from all four perimeter walkways.',
      directions: 'Enter Gate 2, follow the signs toward Mechanical Workshop Block. The safety arena is assembled in the center courtyard.',
      gateEntry: 'Gate 2 (North Campus)'
    }
  },
  {
    id: 'campus-acoustic-night',
    title: 'Campus Acoustic Night',
    category: 'Cultural',
    date: '06 November 2026',
    isoDate: '2026-11-06',
    time: '5:30 PM – 8:30 PM',
    venue: 'Open Air Amphitheatre',
    shortDescription: 'An unplugged evening of vocalists, instrumentalists, and storytelling under the campus starlight.',
    fullDescription: 'Unwind at the end of the week with acoustic guitar melodies, violin performances, poetry readings, and open-mic student contributions. Bring your friends and picnic mats!',
    image: '/src/assets/images/event_cultural_fiesta_1790396353726.jpg',
    fallbackGradient: 'from-violet-700 to-indigo-950',
    eligibility: 'All students, staff, and faculty members.',
    registrationDeadline: '05 November 2026, 11:59 PM',
    availableSeats: 65,
    totalSeats: 300,
    featured: false,
    learningOutcomes: [
      'Enjoy an ambient musical experience supporting campus talent',
      'Optional sign-up for open-mic slots on stage',
      'Free warm beverages and cookies served'
    ],
    organizer: {
      name: 'Music & Literary Arts Society',
      role: 'Student Coordinators',
      clubOrDept: 'Campus Arts Council',
      email: 'acoustic@campus.edu',
      phone: '+1 (555) 901-5678'
    },
    locationDetails: {
      building: 'University Open Air Amphitheatre',
      floor: 'Tiered Grass & Stone Seating',
      roomNumber: 'Stage Level',
      landmark: 'Next to Campus Lake & Botanical Gardens',
      accessibility: 'Paved ramp leads to upper seating ring and stage accessible pathway.',
      directions: 'Head south from the library toward the botanical park. The stone amphitheatre is overlooking the campus lake.',
      gateEntry: 'Gate 1 (Main Boulevard)'
    }
  }
];

export const DEPARTMENTS = [
  'Computer Science and Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other'
];

export const YEARS_OF_STUDY = [
  'First Year',
  'Second Year',
  'Third Year',
  'Final Year'
];
