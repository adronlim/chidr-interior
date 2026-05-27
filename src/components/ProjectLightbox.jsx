import { useEffect } from 'react'

export default function ProjectLightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-neutral-200 p-6">
          <div>
            <h2 className="text-xl font-medium text-neutral-900">{project.title}</h2>
            <p className="text-sm text-neutral-500">
              {project.category} · {project.location} · {project.year}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="px-6 py-4 text-neutral-600">{project.description}</p>

        <div className="grid grid-cols-1 gap-2 p-6 pt-0 sm:grid-cols-2">
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} ${i + 1}`}
              className="w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
