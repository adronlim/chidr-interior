import { testimonials } from '../data/settings'

export default function Testimonials() {
  return (
    <section className="bg-charcoal text-cream dark:bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold-light">
          Kind words
        </p>
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight md:text-5xl">
          Trusted by homeowners and businesses across Penang.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col">
              <span className="font-display text-5xl leading-none text-gold-light">“</span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-cream/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-cream/15 pt-4">
                <p className="font-medium text-cream">{t.author}</p>
                <p className="text-sm text-cream/50">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
