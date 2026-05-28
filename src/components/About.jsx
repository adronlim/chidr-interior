import { useProjects } from '../context/ProjectsContext'
import { services } from '../data/settings'

export default function About() {
  const { settings } = useProjects()

  return (
    <section id="about">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
              01 — About the studio
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
              Design that begins with how you live.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-charcoal/70 dark:text-cream/70 md:col-span-5">
            {settings.about}
          </p>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 dark:border-cream/10 dark:bg-cream/10 md:mt-24 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="flex flex-col bg-cream p-8 transition-colors hover:bg-stone dark:bg-charcoal dark:hover:bg-charcoal-soft md:p-10"
            >
              <span className="font-display text-3xl font-medium text-gold/70 dark:text-gold-light/70">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium text-charcoal dark:text-cream md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
                {service.desc}
              </p>
              {service.items?.length ? (
                <ul className="mt-6 space-y-2 border-t border-charcoal/10 pt-5 text-sm text-charcoal/65 dark:border-cream/10 dark:text-cream/65">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 inline-block h-px w-3 shrink-0 bg-gold/60 dark:bg-gold-light/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
