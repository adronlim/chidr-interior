import { processSteps } from '../data/settings'

export default function Process() {
  return (
    <section id="process" className="border-t border-charcoal/10 dark:border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold dark:text-gold-light">
            How we work
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight text-charcoal dark:text-cream md:text-5xl">
            A clear path from first idea to finished space.
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal/10 dark:border-cream/10 dark:bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li
              key={s.step}
              className="bg-cream p-8 transition-colors hover:bg-stone dark:bg-charcoal dark:hover:bg-charcoal-soft"
            >
              <span className="font-display text-4xl font-semibold text-gold/40 dark:text-gold-light/40">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-charcoal dark:text-cream">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
