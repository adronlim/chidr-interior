import { projects } from '../../data/projects'

export default function Dashboard() {
  const total = projects.length
  const byCategory = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const stats = [
    { label: 'Total projects', value: total },
    ...Object.entries(byCategory).map(([label, value]) => ({ label, value })),
  ]

  return (
    <div>
      <h1 className="text-2xl font-light">Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded border border-neutral-200 bg-white p-6">
            <p className="text-3xl font-light">{stat.value}</p>
            <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
