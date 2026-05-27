import { useProjects } from '../context/ProjectsContext'

const stats = [
  { value: '120+', label: 'Projects delivered' },
  { value: '15 yrs', label: 'In Penang' },
]

export default function Hero() {
  const { settings } = useProjects()

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gold dark:text-gold-light">
          Interior Design &amp; Renovation · Penang
        </p>
        <h1 className="font-display text-5xl font-medium leading-[1.05] text-charcoal dark:text-cream md:text-6xl lg:text-7xl">
          {settings.tagline}.
        </h1>
        <p className="mt-6 max-w-md text-charcoal/70 dark:text-cream/70">
          {settings.name} crafts warm, considered interiors — from full home
          renovations to bespoke commercial fit-outs in Batu Kawan and beyond.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
          >
            Start a project
          </a>
          <a
            href="#work"
            className="rounded-md border border-charcoal/20 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-gold hover:text-gold dark:border-cream/20 dark:text-cream dark:hover:border-gold-light dark:hover:text-gold-light"
          >
            View our work
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-stone dark:bg-charcoal-soft">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="A warm, light-filled interior designed by CH iDesign"
            className="h-full w-full object-cover"
            width="1200"
            height="1500"
            fetchPriority="high"
          />
        </div>

        <div className="absolute -bottom-6 -left-6 hidden gap-3 sm:flex">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-charcoal/10 bg-cream/95 px-5 py-4 shadow-sm backdrop-blur dark:border-cream/10 dark:bg-charcoal/95"
            >
              <p className="font-display text-3xl font-semibold text-gold dark:text-gold-light">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/60 dark:text-cream/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
