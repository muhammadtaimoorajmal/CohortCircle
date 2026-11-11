/**
 * CohortCircle Demonstration Dataset
 *
 * NOTE: All data herein is synthetic demonstration content crafted for
 * local interface evaluation and prototype testing. No real student
 * identities, contact details, or institutional records are represented.
 */

export const DEMO_CURRENT_USER = {
  id: 'usr-current',
  name: 'Alex Rivera',
  handle: '@arivera',
  initials: 'AR',
  role: 'learner', // 'learner' | 'host'
  bio: 'Computer science & cognitive psychology enthusiast. Passionate about human-centered interfaces, algorithms, and distributed systems.',
  avatarColor: '#4f46e5',
  academicLevel: 'Undergraduate Senior',
  joinedDate: 'October 2025',
  profileCompleteness: 92,
  topics: ['Algorithms & Data Structures', 'Human-Computer Interaction', 'Distributed Systems', 'Cognitive Psychology'],
  studyStyles: ['Collaborative Problem Solving', 'Discussion-Based Learning'],
  preferredModality: 'Hybrid',
  preferredCapacity: '4–6 peers',
  preferredCadence: 'Weekly (90 min)',
  primaryLanguage: 'English',
  availability: {
    Mon: ['Evening (6 PM - 10 PM)'],
    Tue: ['Evening (6 PM - 10 PM)'],
    Wed: ['Evening (6 PM - 10 PM)'],
    Thu: ['Evening (6 PM - 10 PM)'],
    Fri: ['Afternoon (12 PM - 5 PM)'],
    Sat: ['Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)'],
    Sun: []
  },
  stats: {
    circlesJoined: 3,
    sessionsAttended: 14,
    hoursLearned: 28,
    activeStreakWeeks: 4
  }
};

export const DEMO_CIRCLES = [
  {
    id: 'circle-alg-01',
    title: 'Algorithms & LeetCode Problem Solvers',
    slug: 'algorithms-leetcode-problem-solvers',
    category: 'Computer Science',
    subject: 'Algorithms & Data Structures',
    description: 'Weekly collaborative whiteboard problem solving covering graph theory, dynamic programming, and interview-grade algorithm patterns. We practice explaining our code out loud.',
    charter: '1. Prepare the designated problem set before each session.\n2. Respect diverse skill levels and encourage peer explanation.\n3. Keep cameras on for collaborative discussions.\n4. No copy-pasting solutions without understanding the underlying invariants.',
    host: {
      id: 'usr-host-01',
      name: 'Elena Rostova',
      handle: '@erostova',
      initials: 'ER',
      avatarColor: '#0d9488',
      role: 'Circle Facilitator'
    },
    membersCount: 5,
    maxCapacity: 6,
    joiningPolicy: 'moderated', // 'open' | 'moderated' | 'closed'
    studyStyle: 'Collaborative Problem Solving',
    modality: 'Online',
    cadence: 'Weekly',
    meetingTime: 'Tuesdays & Thursdays, 7:00 PM – 8:30 PM',
    compatibility: {
      overallScore: 94,
      breakdown: {
        topicAlignment: 96,
        scheduleOverlap: 92,
        studyStyleMatch: 95,
        modalityFit: 95,
        capacityFit: 90
      },
      matchReasons: [
        'Direct alignment on Algorithms & Data Structures',
        'Matches your preferred Collaborative Problem Solving format',
        'Overlaps with your Tuesday & Thursday evening availability windows'
      ]
    },
    tags: ['Algorithms', 'Data Structures', 'Tech Interview Prep', 'LeetCode'],
    isJoined: true,
    isHostedByMe: false,
    nextSession: {
      id: 'sess-alg-01',
      title: 'Graph Traversal & Dijkstra Algorithms Deep-Dive',
      date: 'Tomorrow, 7:00 PM',
      duration: '90m'
    }
  },
  {
    id: 'circle-des-02',
    title: 'Product Design & HCI Studio',
    slug: 'product-design-hci-studio',
    category: 'Design & UX',
    subject: 'Human-Computer Interaction',
    description: 'Bi-weekly portfolio critiques, Figma wireframing workshops, and usability heuristic evaluations. We evaluate real student prototypes and critique with empathy.',
    charter: '1. Constructive, actionable critique only.\n2. Share work-in-progress early and often.\n3. Ground feedback in established HCI and usability principles.\n4. Maintain confidentiality of unpublished concept work.',
    host: {
      id: 'usr-host-02',
      name: 'Marcus Chen',
      handle: '@mchen_design',
      initials: 'MC',
      avatarColor: '#6366f1',
      role: 'Lead Facilitator'
    },
    membersCount: 4,
    maxCapacity: 6,
    joiningPolicy: 'open',
    studyStyle: 'Discussion-Based Learning',
    modality: 'Hybrid',
    cadence: 'Bi-weekly',
    meetingTime: 'Wednesdays, 6:30 PM – 8:00 PM',
    compatibility: {
      overallScore: 89,
      breakdown: {
        topicAlignment: 92,
        scheduleOverlap: 88,
        studyStyleMatch: 90,
        modalityFit: 92,
        capacityFit: 85
      },
      matchReasons: [
        'Direct subject match with Human-Computer Interaction',
        'Aligns with your Wednesday evening availability',
        'Matches preferred hybrid cohort modality'
      ]
    },
    tags: ['UX Design', 'HCI', 'Figma', 'Design Systems', 'Usability'],
    isJoined: true,
    isHostedByMe: false,
    nextSession: {
      id: 'sess-des-01',
      title: 'Design Critique: Accessible Wireframe Prototypes',
      date: 'Thursday, 6:30 PM',
      duration: '90m'
    }
  },
  {
    id: 'circle-dis-03',
    title: 'Distributed Systems & Cloud Architecture',
    slug: 'distributed-systems-cloud-architecture',
    category: 'Computer Science',
    subject: 'Distributed Systems',
    description: 'Advanced paper reading and implementation circle deconstructing seminal papers (Raft, Paxos, Dynamo, MapReduce) and building miniature distributed stores.',
    charter: '1. Complete paper readings before the weekly synchronous discussion.\n2. Come prepared with 2 critical questions or critique points.\n3. Take turns leading paper deconstructions.',
    host: {
      id: 'usr-current', // Hosted by current user
      name: 'Alex Rivera',
      handle: '@arivera',
      initials: 'AR',
      avatarColor: '#4f46e5',
      role: 'Circle Creator & Host'
    },
    membersCount: 4,
    maxCapacity: 5,
    joiningPolicy: 'moderated',
    studyStyle: 'Peer Teaching',
    modality: 'Online',
    cadence: 'Weekly',
    meetingTime: 'Saturdays, 10:00 AM – 11:30 AM',
    compatibility: {
      overallScore: 100,
      breakdown: {
        topicAlignment: 100,
        scheduleOverlap: 100,
        studyStyleMatch: 100,
        modalityFit: 100,
        capacityFit: 100
      },
      matchReasons: [
        'You are the creator and host of this study circle'
      ]
    },
    tags: ['Distributed Systems', 'Cloud', 'Raft Consensus', 'Systems Architecture'],
    isJoined: true,
    isHostedByMe: true,
    nextSession: {
      id: 'sess-dis-01',
      title: 'Consensus in Practice: Raft Log Replication Analysis',
      date: 'Saturday, 10:00 AM',
      duration: '90m'
    }
  },
  {
    id: 'circle-math-04',
    title: 'Mathematics Practice & Proof Analysis',
    slug: 'mathematics-practice-proof-analysis',
    category: 'Mathematics',
    subject: 'Discrete Mathematics & Linear Algebra',
    description: 'A focused, quiet problem-drilling group tackling rigorous mathematical proofs, vector spaces, and graph combinatorics through timed exercise sprints.',
    charter: '1. Sprints are conducted in focused silence with structured Q&A afterward.\n2. Post steps cleanly on the shared whiteboard.\n3. Peer verification of theorem assumptions.',
    host: {
      id: 'usr-host-04',
      name: 'Devon Vance',
      handle: '@dvance_math',
      initials: 'DV',
      avatarColor: '#b45309',
      role: 'Facilitator'
    },
    membersCount: 3,
    maxCapacity: 4,
    joiningPolicy: 'open',
    studyStyle: 'Silent Co-Study',
    modality: 'In-Person',
    cadence: 'Weekly',
    meetingTime: 'Mondays, 5:00 PM – 7:00 PM',
    compatibility: {
      overallScore: 78,
      breakdown: {
        topicAlignment: 72,
        scheduleOverlap: 80,
        studyStyleMatch: 75,
        modalityFit: 85,
        capacityFit: 80
      },
      matchReasons: [
        'Complementary foundational mathematics topics',
        'Matches Monday evening block',
        'In-person library study format'
      ]
    },
    tags: ['Discrete Math', 'Linear Algebra', 'Proofs', 'Co-Working'],
    isJoined: false,
    isHostedByMe: false
  },
  {
    id: 'circle-lang-05',
    title: 'Language Exchange & Cultural Dialogue',
    slug: 'language-exchange-cultural-dialogue',
    category: 'Languages',
    subject: 'Conversational Japanese & Spanish',
    description: 'Reciprocal language practice pairing conversational learners for structured speaking drills, pronunciation feedback, and cultural idiom discussions.',
    charter: '1. Equal speaking time allocated to each target language.\n2. Patient, non-judgmental correction culture.\n3. Active engagement in topic cards.',
    host: {
      id: 'usr-host-05',
      name: 'Sara Takahashi',
      handle: '@sara_t',
      initials: 'ST',
      avatarColor: '#db2777',
      role: 'Coordinator'
    },
    membersCount: 6,
    maxCapacity: 8,
    joiningPolicy: 'open',
    studyStyle: 'Discussion-Based Learning',
    modality: 'Online',
    cadence: 'Weekly',
    meetingTime: 'Fridays, 4:00 PM – 5:30 PM',
    compatibility: {
      overallScore: 71,
      breakdown: {
        topicAlignment: 65,
        scheduleOverlap: 78,
        studyStyleMatch: 82,
        modalityFit: 80,
        capacityFit: 70
      },
      matchReasons: [
        'Fits Friday afternoon availability',
        'High conversational engagement style'
      ]
    },
    tags: ['Japanese', 'Spanish', 'Language Exchange', 'Speaking Practice'],
    isJoined: false,
    isHostedByMe: false
  },
  {
    id: 'circle-writ-06',
    title: 'Creative Writing & Scientific Communication Collective',
    slug: 'creative-writing-scientific-communication',
    category: 'Writing & Humanities',
    subject: 'Academic & Creative Writing',
    description: 'Weekly drafting accountability sessions, scientific paper abstract reviews, and structured peer-feedback rounds to build consistent writing routines.',
    charter: '1. Bring at least 500 words to each revision session.\n2. Line-by-line constructive suggestions.\n3. Celebrate creative experiments.',
    host: {
      id: 'usr-host-06',
      name: 'Jordan Blake',
      handle: '@jblake_writes',
      initials: 'JB',
      avatarColor: '#059669',
      role: 'Editor'
    },
    membersCount: 4,
    maxCapacity: 4, // Full circle
    joiningPolicy: 'closed',
    studyStyle: 'Peer Teaching',
    modality: 'Online',
    cadence: 'Bi-weekly',
    meetingTime: 'Sundays, 2:00 PM – 4:00 PM',
    compatibility: {
      overallScore: 64,
      breakdown: {
        topicAlignment: 60,
        scheduleOverlap: 65,
        studyStyleMatch: 70,
        modalityFit: 75,
        capacityFit: 50
      },
      matchReasons: [
        'Currently at maximum capacity (4/4 members)',
        'Waitlist or application window closed'
      ]
    },
    tags: ['Writing', 'Academic Publishing', 'Peer Review', 'Essays'],
    isJoined: false,
    isHostedByMe: false
  }
];

export const DEMO_SESSIONS = [
  {
    id: 'sess-alg-01',
    circleId: 'circle-alg-01',
    circleTitle: 'Algorithms & LeetCode Problem Solvers',
    title: 'Graph Traversal & Dijkstra Algorithms Deep-Dive',
    date: '2026-11-13',
    time: '19:00',
    duration: '90m',
    modality: 'Online',
    locationOrLink: 'https://meet.cohortcircle.org/alg-graphs-live',
    hostName: 'Elena Rostova',
    status: 'scheduled',
    agenda: [
      { time: '19:00 - 19:15', item: 'Check-in and review of prior adjacency list exercises' },
      { time: '19:15 - 19:50', item: 'Collaborative breakout: Dijkstra priority queue implementation' },
      { time: '19:50 - 20:20', item: 'Edge-case debrief: negative weights and Bellman-Ford comparisons' },
      { time: '20:20 - 20:30', item: 'Homework distribution and next topic voting' }
    ],
    rsvpSummary: {
      attending: 4,
      tentative: 1,
      declined: 0,
      currentUserStatus: 'attending' // 'attending' | 'tentative' | 'declined'
    },
    attendees: [
      { name: 'Alex Rivera', handle: '@arivera', initials: 'AR', status: 'attending' },
      { name: 'Elena Rostova', handle: '@erostova', initials: 'ER', status: 'attending' },
      { name: 'Kenji Sato', handle: '@ksato', initials: 'KS', status: 'attending' },
      { name: 'Maya Patel', handle: '@mpatel', initials: 'MP', status: 'attending' },
      { name: 'Liam O’Connor', handle: '@loconnor', initials: 'LO', status: 'tentative' }
    ]
  },
  {
    id: 'sess-des-01',
    circleId: 'circle-des-02',
    circleTitle: 'Product Design & HCI Studio',
    title: 'Design Critique: Accessible Wireframe Prototypes',
    date: '2026-11-14',
    time: '18:30',
    duration: '90m',
    modality: 'Hybrid',
    locationOrLink: 'Design Lab 304 / Zoom Room 4',
    hostName: 'Marcus Chen',
    status: 'scheduled',
    agenda: [
      { time: '18:30 - 18:40', item: 'Welcome & spotlight on WCAG 2.2 touch target standards' },
      { time: '18:40 - 19:20', item: 'Peer critique: Alex & Maya present wireframe flows' },
      { time: '19:20 - 19:50', item: 'Heuristic evaluation sprint with Nielsen scorecards' },
      { time: '19:50 - 20:00', item: 'Wrap up and next week sprint targets' }
    ],
    rsvpSummary: {
      attending: 3,
      tentative: 1,
      declined: 0,
      currentUserStatus: 'attending'
    },
    attendees: [
      { name: 'Alex Rivera', handle: '@arivera', initials: 'AR', status: 'attending' },
      { name: 'Marcus Chen', handle: '@mchen_design', initials: 'MC', status: 'attending' },
      { name: 'Sophie Martin', handle: '@smartin', initials: 'SM', status: 'attending' },
      { name: 'Tariq Al-Mansoor', handle: '@talmansoor', initials: 'TA', status: 'tentative' }
    ]
  },
  {
    id: 'sess-dis-01',
    circleId: 'circle-dis-03',
    circleTitle: 'Distributed Systems & Cloud Architecture',
    title: 'Consensus in Practice: Raft Log Replication Analysis',
    date: '2026-11-15',
    time: '10:00',
    duration: '90m',
    modality: 'Online',
    locationOrLink: 'https://meet.cohortcircle.org/dis-raft-consensus',
    hostName: 'Alex Rivera (You)',
    status: 'scheduled',
    agenda: [
      { time: '10:00 - 10:15', item: 'Quick recap of leader election mechanics' },
      { time: '10:15 - 10:55', item: 'Paper deconstruction: Sections 5.3 & 5.4 Log Matching Property' },
      { time: '10:55 - 11:20', item: 'Live Go code walkthrough of Raft RPC handlers' },
      { time: '11:20 - 11:30', item: 'Assignment of Byzantine Fault Tolerance papers for next cycle' }
    ],
    rsvpSummary: {
      attending: 4,
      tentative: 0,
      declined: 0,
      currentUserStatus: 'attending'
    },
    attendees: [
      { name: 'Alex Rivera', handle: '@arivera', initials: 'AR', status: 'attending' },
      { name: 'Priya Sharma', handle: '@psharma', initials: 'PS', status: 'attending' },
      { name: 'Daniel Kim', handle: '@dkim', initials: 'DK', status: 'attending' },
      { name: 'Nadia El-Baz', handle: '@nelbaz', initials: 'NE', status: 'attending' }
    ]
  }
];

export const DEMO_PENDING_REQUESTS = [
  {
    id: 'req-01',
    circleId: 'circle-dis-03',
    circleTitle: 'Distributed Systems & Cloud Architecture',
    applicant: {
      name: 'Gabriel Morales',
      handle: '@gmorales',
      initials: 'GM',
      avatarColor: '#8b5cf6',
      academicLevel: 'Graduate Student',
      compatibilityScore: 91
    },
    requestedAt: '2 hours ago',
    introNote: 'Hello! I am taking Advanced Distributed Systems and building a KV-store in Rust. I would love to participate in weekly paper discussions and contribute my benchmark notes.',
    status: 'pending'
  },
  {
    id: 'req-02',
    circleId: 'circle-dis-03',
    circleTitle: 'Distributed Systems & Cloud Architecture',
    applicant: {
      name: 'Chloe Tremblay',
      handle: '@ctremblay',
      initials: 'CT',
      avatarColor: '#ec4899',
      academicLevel: 'Undergraduate Junior',
      compatibilityScore: 84
    },
    requestedAt: 'Yesterday',
    introNote: 'Hi Alex! I reviewed the circle charter and commit to the reading schedule. Eager to understand consensus algorithms deeply.',
    status: 'pending'
  }
];

export const DEMO_CATEGORIES = [
  'All Subjects',
  'Computer Science',
  'Design & UX',
  'Mathematics',
  'Languages',
  'Writing & Humanities',
  'Natural Sciences',
  'Business & Economics'
];

export const DEMO_STUDY_STYLES = [
  'All Study Styles',
  'Collaborative Problem Solving',
  'Discussion-Based Learning',
  'Silent Co-Study',
  'Peer Teaching',
  'Examination Preparation'
];

export const DEMO_MODALITIES = ['All Modalities', 'Online', 'In-Person', 'Hybrid'];
export const DEMO_CAPACITIES = ['Any Capacity', 'Micro (2–4)', 'Standard (5–8)', 'Large (8+)'];
