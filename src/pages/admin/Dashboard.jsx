import { Link } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'

export default function Dashboard() {
  const { projects } = useProjects()

  const total = projects.length
  const publishedCount = projects.filter((p) => p.status === 'published').length
  const draftCount = total - publishedCount

  const stats = [
    { label: 'Total projects', value: total },
    { label: 'Published', value: publishedCount },
    { label: 'Drafts', value: draftCount },
  ]

  const recent = projects.slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
        Overview of your portfolio.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-charcoal/10 bg-white/50 p-6 dark:border-cream/10 dark:bg-charcoal-soft/40"
          >
            <p className="font-display text-4xl font-semibold text-gold dark:text-gold-light">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium">Recent projects</h2>
        <Link
          to="/admin/projects"
          className="text-sm text-gold hover:underline dark:text-gold-light"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-charcoal/10 bg-white/50 dark:border-cream/10 dark:bg-charcoal-soft/40">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/10 text-charcoal/50 dark:border-cream/10 dark:text-cream/50">
            <tr>
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Year</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((p) => (
              <tr
                key={p.id}
                className="border-b border-charcoal/5 last:border-0 dark:border-cream/5"
              >
                <td className="px-5 py-3 font-medium">{p.name}</td>
                <td className="px-5 py-3 text-charcoal/70 dark:text-cream/70">{p.catLabel}</td>
                <td className="px-5 py-3 text-charcoal/70 dark:text-cream/70">{p.year}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const published = status === 'published'
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        published
          ? 'bg-green-500/15 text-green-700 dark:text-green-300'
          : 'bg-charcoal/10 text-charcoal/60 dark:bg-cream/10 dark:text-cream/60'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}
