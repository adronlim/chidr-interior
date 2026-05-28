import { useProjects } from '../context/ProjectsContext'

const stats = [
  { value: '120+', label: 'Projects delivered' },
  { value: '15 yrs', label: 'In Penang' },
]

export default function Hero() {
  const { settings } = useProjects()

  return (
    <section className="relative">
      <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden bg-charcoal">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
          alt="A warm, light-filled interior designed by CH iDesign"
          className="h-full w-full object-cover"
          width="2000"
          height="1333"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/80" />

        <div className="absolute inset-0 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-12 md:px-10 md:py-16 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.45em] text-cream/85 md:text-xs">
            Interior Design &amp; Renovation · Penang
          </p>

          <div className="max-w-5xl">
            <h1 className="font-display font-medium leading-[0.95] tracking-tight text-cream text-5xl md:text-7xl lg:text-8xl">
              {settings.tagline}.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
              {settings.name} crafts warm, considered interiors — from full home
              renovations to bespoke commercial fit-outs in Batu Kawan and beyond.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#contact"
                className="rounded-sm bg-gold-light px-7 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-cream"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-sm font-medium text-cream"
              >
                <span className="border-b border-cream/40 pb-1 transition-colors group-hover:border-cream">
                  View our work
                </span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-charcoal/10 dark:border-cream/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-charcoal/10 px-6 dark:divide-cream/10 md:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 first:pr-6 md:py-14 md:first:pr-10">
              <p className="font-display text-5xl font-medium text-gold dark:text-gold-light md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-charcoal/55 dark:text-cream/55 md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
