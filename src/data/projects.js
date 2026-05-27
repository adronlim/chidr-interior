// Dummy data — replace with a real API / CMS later.
// Shape kept intentionally flat so it maps cleanly onto a backend response.

export const projects = [
  {
    id: 'modern-loft',
    title: 'Modern Loft',
    category: 'Residential',
    location: 'Singapore',
    year: 2024,
    cover: 'https://placehold.co/800x600?text=Modern+Loft',
    images: [
      'https://placehold.co/1200x800?text=Loft+1',
      'https://placehold.co/1200x800?text=Loft+2',
      'https://placehold.co/1200x800?text=Loft+3',
    ],
    description:
      'A bright, open-plan loft balancing warm timber tones with clean industrial lines.',
  },
  {
    id: 'boutique-cafe',
    title: 'Boutique Café',
    category: 'Commercial',
    location: 'Kuala Lumpur',
    year: 2023,
    cover: 'https://placehold.co/800x600?text=Boutique+Cafe',
    images: [
      'https://placehold.co/1200x800?text=Cafe+1',
      'https://placehold.co/1200x800?text=Cafe+2',
    ],
    description:
      'An intimate café interior using textured plaster and brass accents to create warmth.',
  },
  {
    id: 'minimal-office',
    title: 'Minimal Office',
    category: 'Commercial',
    location: 'Singapore',
    year: 2023,
    cover: 'https://placehold.co/800x600?text=Minimal+Office',
    images: [
      'https://placehold.co/1200x800?text=Office+1',
      'https://placehold.co/1200x800?text=Office+2',
    ],
    description:
      'A calm, productivity-focused workspace with muted palettes and natural light.',
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}
