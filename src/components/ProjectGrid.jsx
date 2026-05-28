import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import { categories } from '../data/projects'

export default function ProjectGrid({ projects, onSelect }) {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.cat === filter)),
    [projects, filter],
  )

  return (
    <section id="work">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
              04 — Selected work
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
              Spaces we&rsquo;ve brought to life.
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {categories.map((c) => {
              const isActive = filter === c.value
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFilter(c.value)}
                  className={`relative pb-1.5 transition-colors ${
                    isActive
                      ? 'text-charcoal dark:text-cream'
                      : 'text-charcoal/45 hover:text-charcoal dark:text-cream/45 dark:hover:text-cream'
                  }`}
                >
                  {c.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100 bg-gold dark:bg-gold-light' : 'scale-x-0 bg-charcoal/40 dark:bg-cream/40'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="mt-20 text-center text-charcoal/45 dark:text-cream/45">
            No projects in this category yet.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
            {visible.map((project, idx) => {
              const isFeature = idx % 5 === 0
              return (
                <div key={project.id} className={isFeature ? 'md:col-span-2' : ''}>
                  <ProjectCard project={project} onSelect={onSelect} featured={isFeature} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
