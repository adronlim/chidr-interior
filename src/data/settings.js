// Company settings — Phase 1 dummy values. Editable in the admin Settings view
// (held in ProjectsContext in-memory). Persisted to Firestore in Phase 2.

export const companySettings = {
  name: 'CH iDesign & Renovation',
  tagline: 'Spaces that inspire the way you live',
  phone: '+60 4-123 4567',
  email: 'info@chidr.com.my',
  address: 'Batu Kawan, 14110 Bandar Cassia, Penang, Malaysia',
  hours: 'Mon – Sat, 9:00 AM – 6:00 PM',
  about:
    'CH iDesign & Renovation is a Penang-based interior design and renovation studio. We craft warm, considered spaces — from full home makeovers to bespoke commercial fit-outs — guided by light, material, and the way you actually live.',
}

// Demo credentials (Phase 1). Replaced by Firebase Auth in Phase 2.
export const ADMIN_CREDENTIALS = {
  email: 'admin@chidr.com.my',
  password: 'password',
}

export const testimonials = [
  {
    id: 1,
    quote:
      'They listened first, then designed. Our home finally feels like us — warm, calm, and effortless to live in.',
    author: 'Mei Ling & Daniel',
    role: 'The Serenity Residence',
  },
  {
    id: 2,
    quote:
      'The team handled our café fit-out end to end. Every detail, from lighting to joinery, was considered and on budget.',
    author: 'Arvind Kumar',
    role: 'Atelier Coffee House',
  },
  {
    id: 3,
    quote:
      'Professional, patient, and genuinely creative. The renovation ran smoothly and the result exceeded what we imagined.',
    author: 'Siti Rahman',
    role: 'Garden View Living',
  },
]

export const services = [
  {
    title: 'Interior Design',
    desc: 'Full-room concepts, space planning, and material palettes tailored to how you live and work.',
    items: [
      'Space planning',
      'Material & finish palettes',
      'Lighting design',
      'Custom joinery',
      'Soft furnishing & styling',
    ],
  },
  {
    title: 'Renovation',
    desc: 'End-to-end renovation and fit-out — managed builds, trusted trades, and a single point of contact.',
    items: [
      'Demolition & structural',
      'M&E coordination',
      'Wet works & tiling',
      'Carpentry & cabinetry',
      'Final commissioning',
    ],
  },
  {
    title: 'Styling & Furnishing',
    desc: 'Bespoke joinery, furniture curation, and finishing touches that make a space feel complete.',
    items: [
      'Furniture sourcing',
      'Bespoke joinery design',
      'Art & accessory curation',
      'Window treatments',
      'Move-in styling',
    ],
  },
]

// Dummy team data — Phase 1 placeholder. Replace with real bios + photos in Phase 2.
export const team = [
  {
    id: 1,
    name: 'Chong Hui Lim',
    role: 'Founder & Lead Designer',
    bio: 'Twenty years shaping homes across northern Malaysia, with a soft spot for warm minimalism and considered light.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Aisha Tan',
    role: 'Project Architect',
    bio: 'Trained in Glasgow, returned to Penang in 2018. Obsessed with proportion, ventilation, and what light does at 4pm.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Rajesh Pillai',
    role: 'Site & Build Lead',
    bio: 'Fifteen years on Penang sites; the steady hand from demolition to handover. Knows every reliable trade in the state.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
  },
]

// Dummy press / recognition — Phase 1 placeholder. Replace with real mentions when available.
export const press = [
  'Habitat & Form',
  'Studio Quarterly',
  'Penang Design Week ’24',
  'Asia Renovation Awards',
  'Spaces SEA',
]

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We learn how you live, your taste, and your budget — then map the brief together.',
  },
  {
    step: '02',
    title: 'Concept',
    desc: 'Mood, layout, and material direction brought to life in clear visual concepts.',
  },
  {
    step: '03',
    title: 'Refinement',
    desc: 'We refine the details, finishes, and costs until the design is exactly right.',
  },
  {
    step: '04',
    title: 'Build',
    desc: 'Managed renovation and installation, delivered with care down to the last fixture.',
  },
]
