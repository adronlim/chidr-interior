export default function ProjectCard({ project, onSelect, featured = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(project)}
      className="group block w-full text-left"
    >
      <div
        className={`relative overflow-hidden bg-stone dark:bg-charcoal-soft ${
          featured ? 'aspect-[16/9]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold dark:text-gold-light">
            {project.catLabel}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-charcoal dark:text-cream md:text-3xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {project.name}
            </span>
          </h3>
          <p className="mt-2 text-sm text-charcoal/55 dark:text-cream/55">{project.area}</p>
        </div>
        <span className="shrink-0 font-display text-sm text-charcoal/40 dark:text-cream/40">
          {project.year}
        </span>
      </div>
    </button>
  )
}
