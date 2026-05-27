import { Navigate, useLocation } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'

// Phase 1 guard: gate /admin behind the in-memory demo session.
// Phase 2 swaps this for a Firebase Auth check.
export default function RequireAuth({ children }) {
  const { isAuthed } = useProjects()
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return children
}
