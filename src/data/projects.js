// Dummy data — Phase 1. Shape kept flat so it maps cleanly onto a future
// Firestore document (Phase 2). See context.md → Data Model.
//
//   id       number   (Firestore: auto-generated doc id)
//   name     string
//   cat      'living' | 'kitchen' | 'bedroom' | 'commercial'
//   catLabel string   display label for `cat`
//   area     string
//   year     string
//   status   'published' | 'draft'
//   img      string   cover image URL
//   images   string[] gallery image URLs
//   desc     string

const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'living', label: 'Living Room' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'commercial', label: 'Commercial' },
]

export const projects = [
  {
    id: 1,
    name: 'The Serenity Residence',
    cat: 'living',
    catLabel: 'Living Room',
    area: '1,800 sqft',
    year: '2024',
    status: 'published',
    img: u('photo-1586023492125-27b2c045efd7'),
    images: [
      u('photo-1586023492125-27b2c045efd7'),
      u('photo-1567767292278-a4f21aa2d36e'),
      u('photo-1616137466211-f939a420be84'),
    ],
    desc: 'An airy living space layered with warm timber, linen, and soft natural light — designed for slow mornings and unhurried gatherings.',
  },
  {
    id: 2,
    name: 'Marble & Brass Kitchen',
    cat: 'kitchen',
    catLabel: 'Kitchen',
    area: '420 sqft',
    year: '2024',
    status: 'published',
    img: u('photo-1556911220-bff31c812dba'),
    images: [
      u('photo-1556911220-bff31c812dba'),
      u('photo-1600489000022-c2086d79f9d4'),
      u('photo-1556909114-f6e7ad7d3136'),
    ],
    desc: 'A culinary centrepiece pairing honed marble with brushed brass — generous storage hidden behind handleless joinery.',
  },
  {
    id: 3,
    name: 'Quiet Light Bedroom',
    cat: 'bedroom',
    catLabel: 'Bedroom',
    area: '320 sqft',
    year: '2023',
    status: 'published',
    img: u('photo-1505693416388-ac5ce068fe85'),
    images: [
      u('photo-1505693416388-ac5ce068fe85'),
      u('photo-1522708323590-d24dbb6b0267'),
      u('photo-1560185007-cde436f6a4d0'),
    ],
    desc: 'A restful retreat in muted earth tones, with bespoke headboard panelling and diffused, indirect lighting.',
  },
  {
    id: 4,
    name: 'Atelier Coffee House',
    cat: 'commercial',
    catLabel: 'Commercial',
    area: '2,400 sqft',
    year: '2023',
    status: 'published',
    img: u('photo-1559925393-8be0ec4767c8'),
    images: [
      u('photo-1559925393-8be0ec4767c8'),
      u('photo-1554118811-1e0d58224f24'),
      u('photo-1521017432531-fbd92d768814'),
    ],
    desc: 'A boutique café interior using textured plaster, reclaimed timber, and brass accents to create an enveloping warmth.',
  },
  {
    id: 5,
    name: 'Garden View Living',
    cat: 'living',
    catLabel: 'Living Room',
    area: '1,200 sqft',
    year: '2023',
    status: 'published',
    img: u('photo-1618220179428-22790b461013'),
    images: [
      u('photo-1618220179428-22790b461013'),
      u('photo-1616486338812-3dadae4b4ace'),
      u('photo-1493809842364-78817add7ffb'),
    ],
    desc: 'Floor-to-ceiling glazing dissolves the line between lounge and garden, framed by a calm, tonal material palette.',
  },
  {
    id: 6,
    name: 'Heritage Suite',
    cat: 'bedroom',
    catLabel: 'Bedroom',
    area: '540 sqft',
    year: '2024',
    status: 'draft',
    img: u('photo-1616594039964-ae9021a400a0'),
    images: [
      u('photo-1616594039964-ae9021a400a0'),
      u('photo-1540518614846-7eded433c457'),
    ],
    desc: 'A master suite that marries colonial detailing with contemporary comfort — a work in progress.',
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}
