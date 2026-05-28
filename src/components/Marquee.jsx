const defaultItems = [
  'Interior Design',
  'Renovation',
  'Batu Kawan · Penang',
  'Considered. Crafted. Lived-in.',
  'Since 2010',
]

export default function Marquee({ items = defaultItems }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-cream py-5 dark:border-cream/10 dark:bg-charcoal">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-10 inline-flex items-center gap-10 font-display text-2xl text-charcoal/85 dark:text-cream/85 md:text-3xl"
          >
            {item}
            <span aria-hidden className="text-gold dark:text-gold-light">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
