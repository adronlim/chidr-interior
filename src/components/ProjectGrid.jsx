import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectLightbox from './ProjectLightbox'
import { categories } from '../data/projects'

export default function ProjectGrid({ projects }) {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.cat === filter)),
    [projects, filter],
  )

  return (
    <section id="work" className="border-t border-charcoal/10 dark:border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold dark:text-gold-light">
              Selected work
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal dark:text-cream md:text-5xl">
              Spaces we&rsquo;ve brought to life.
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                filter === c.value
                  ? 'bg-gold text-white dark:bg-gold-light dark:text-charcoal'
                  : 'border border-charcoal/15 text-charcoal/70 hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream/70 dark:hover:border-gold-light dark:hover:text-gold-light'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-charcoal/50 dark:text-cream/50">
            No projects in this category yet.
          </p>
        ) : (
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setActive} />
            ))}
          </div>
        )}
      </div>

      <ProjectLightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
