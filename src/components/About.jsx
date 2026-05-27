import { useProjects } from '../context/ProjectsContext'
import { services } from '../data/settings'

export default function About() {
  const { settings } = useProjects()

  return (
    <section id="about" className="border-t border-charcoal/10 dark:border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold dark:text-gold-light">
              About the studio
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal dark:text-cream md:text-5xl">
              Design that begins with how you live.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-charcoal/70 dark:text-cream/70">
            {settings.about}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="rounded-xl border border-charcoal/10 bg-white/40 p-8 dark:border-cream/10 dark:bg-charcoal-soft/40"
            >
              <span className="font-display text-2xl text-gold dark:text-gold-light">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-charcoal dark:text-cream">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
