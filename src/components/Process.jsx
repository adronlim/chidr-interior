import { processSteps } from '../data/settings'

export default function Process() {
  return (
    <section id="process" className="bg-stone/40 dark:bg-charcoal-soft/30">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-2xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
            03 — How we work
          </p>
          <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
            A clear path from first idea to finished space.
          </h2>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 dark:border-cream/10 dark:bg-cream/10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li
              key={s.step}
              className="bg-cream p-8 transition-colors hover:bg-stone dark:bg-charcoal dark:hover:bg-charcoal-soft md:p-10"
            >
              <span className="font-display text-5xl font-medium text-gold/35 dark:text-gold-light/35">
                {s.step}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium text-charcoal dark:text-cream md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
