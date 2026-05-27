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
  },
  {
    title: 'Renovation',
    desc: 'End-to-end renovation and fit-out — managed builds, trusted trades, and a single point of contact.',
  },
  {
    title: 'Styling & Furnishing',
    desc: 'Bespoke joinery, furniture curation, and finishing touches that make a space feel complete.',
  },
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
