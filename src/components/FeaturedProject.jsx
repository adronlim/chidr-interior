export default function FeaturedProject({ project, onOpen }) {
  if (!project) return null

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
              03 — Signature project
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
              {project.name}.
            </h2>
          </div>
          <dl className="grid grid-cols-3 gap-6 text-sm md:gap-10 lg:text-right">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-charcoal/45 dark:text-cream/45">
                Type
              </dt>
              <dd className="mt-2 text-charcoal/85 dark:text-cream/85">{project.catLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-charcoal/45 dark:text-cream/45">
                Area
              </dt>
              <dd className="mt-2 text-charcoal/85 dark:text-cream/85">{project.area}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-charcoal/45 dark:text-cream/45">
                Year
              </dt>
              <dd className="mt-2 text-charcoal/85 dark:text-cream/85">{project.year}</dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={() => onOpen?.(project)}
          className="group mt-14 block w-full overflow-hidden bg-stone dark:bg-charcoal-soft"
        >
          <div className="aspect-[21/9]">
            <img
              src={project.img}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          </div>
        </button>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="font-display text-2xl leading-snug text-charcoal/85 dark:text-cream/85 md:col-span-7 md:text-3xl">
            {project.desc}
          </p>
          <div className="md:col-span-5 md:flex md:items-end md:justify-end">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 text-sm font-medium text-charcoal dark:text-cream"
            >
              <span className="border-b border-charcoal/40 pb-1 transition-colors group-hover:border-gold dark:border-cream/40 dark:group-hover:border-gold-light">
                See the full archive
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
