export default function ProjectCard({ project, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(project)}
      className="group block w-full break-inside-avoid text-left"
    >
      <div className="relative overflow-hidden rounded-xl bg-stone dark:bg-charcoal-soft">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur dark:bg-charcoal/90 dark:text-cream">
          {project.catLabel}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-medium text-charcoal transition-colors group-hover:text-gold dark:text-cream dark:group-hover:text-gold-light">
          {project.name}
        </h3>
        <span className="shrink-0 text-sm text-charcoal/50 dark:text-cream/50">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">{project.area}</p>
    </button>
  )
}
