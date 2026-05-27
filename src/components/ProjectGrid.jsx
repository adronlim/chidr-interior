import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectLightbox from './ProjectLightbox'

export default function ProjectGrid({ projects }) {
  const [active, setActive] = useState(null)

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setActive} />
        ))}
      </div>

      <ProjectLightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
