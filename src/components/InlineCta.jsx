export default function InlineCta() {
  return (
    <section className="bg-gold text-white dark:bg-gold-light dark:text-charcoal">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 sm:flex-row sm:items-center md:px-10 md:py-16">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-75">
            Now booking
          </p>
          <p className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight md:text-4xl lg:text-5xl">
            Currently taking on Q4 2026 projects.
          </p>
        </div>
        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-3 text-sm font-medium"
        >
          <span className="border-b border-current pb-1 opacity-90 transition-opacity group-hover:opacity-100">
            Start a conversation
          </span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  )
}
