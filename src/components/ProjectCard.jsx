export default function ProjectCard({ project, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(project)}
      className="group block w-full text-left"
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-base font-medium text-neutral-900">{project.title}</h3>
        <p className="text-sm text-neutral-500">
          {project.category} · {project.location} · {project.year}
        </p>
      </div>
    </button>
  )
}
