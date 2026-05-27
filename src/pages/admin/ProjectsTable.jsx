import { projects } from '../../data/projects'

export default function ProjectsTable() {
  return (
    <div>
      <h1 className="text-2xl font-light">Projects</h1>

      <div className="mt-8 overflow-x-auto rounded border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Year</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 font-medium text-neutral-900">{p.title}</td>
                <td className="px-4 py-3 text-neutral-600">{p.category}</td>
                <td className="px-4 py-3 text-neutral-600">{p.location}</td>
                <td className="px-4 py-3 text-neutral-600">{p.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
