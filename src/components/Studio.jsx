import { team } from '../data/settings'

export default function Studio() {
  return (
    <section id="studio" className="bg-stone/40 dark:bg-charcoal-soft/30">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
              02 — The people
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
              Small studio, considered hands.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-charcoal/70 dark:text-cream/70 md:col-span-5">
            Three people, end to end. The same hands you meet on day one are the
            hands that hand over the keys.
          </p>
        </div>

        <div className="mt-20 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          {team.map((person) => (
            <figure key={person.id} className="flex flex-col">
              <div className="aspect-[4/5] overflow-hidden bg-stone dark:bg-charcoal-soft">
                <img
                  src={person.img}
                  alt={person.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-6">
                <h3 className="font-display text-2xl font-medium text-charcoal dark:text-cream md:text-3xl">
                  {person.name}
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gold dark:text-gold-light">
                  {person.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
                  {person.bio}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
