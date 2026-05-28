import { press } from '../data/settings'

export default function Press() {
  return (
    <section className="border-y border-charcoal/10 bg-cream dark:border-cream/10 dark:bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-charcoal/45 dark:text-cream/45">
            Featured &amp; recognised in
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {press.map((name) => (
              <li
                key={name}
                className="font-display text-xl text-charcoal/55 transition-colors hover:text-charcoal dark:text-cream/55 dark:hover:text-cream md:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
