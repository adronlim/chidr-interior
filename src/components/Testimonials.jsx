import { testimonials } from '../data/settings'

export default function Testimonials() {
  return (
    <section className="bg-charcoal text-cream dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-2xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold-light md:text-xs">
            04 — Kind words
          </p>
          <h2 className="font-display font-medium leading-[1.02] tracking-tight text-4xl md:text-6xl">
            Trusted by homeowners and businesses across Penang.
          </h2>
        </div>

        <div className="mt-20 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col">
              <span aria-hidden className="font-display text-6xl leading-none text-gold-light/80">
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 font-display text-2xl leading-snug text-cream/95 md:text-[1.65rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-cream/15 pt-5">
                <p className="font-medium text-cream">{t.author}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/45">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
