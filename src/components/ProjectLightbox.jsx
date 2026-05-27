import { useEffect } from 'react'

export default function ProjectLightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div
        className="w-full max-w-4xl rounded-xl bg-cream dark:bg-charcoal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 p-6 dark:border-cream/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold dark:text-gold-light">
              {project.catLabel}
            </span>
            <h2 className="mt-1 font-display text-3xl font-medium text-charcoal dark:text-cream">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
              {project.area} · {project.year}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-charcoal/40 transition-colors hover:text-gold dark:text-cream/40 dark:hover:text-gold-light"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="px-6 py-5 leading-relaxed text-charcoal/70 dark:text-cream/70">
          {project.desc}
        </p>

        <div className="grid grid-cols-1 gap-3 p-6 pt-0 sm:grid-cols-2">
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} — view ${i + 1}`}
              loading="lazy"
              className="w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
