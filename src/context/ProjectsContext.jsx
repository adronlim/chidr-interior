import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { projects as seedProjects } from '../data/projects'
import { companySettings, ADMIN_CREDENTIALS } from '../data/settings'

// Global in-memory store for Phase 1. The CRUD surface here is intentionally
// shaped like a future API/Firestore client so Phase 2 can swap the internals
// without touching the components that consume this context.

const ProjectsContext = createContext(null)

const AUTH_KEY = 'chidr-admin-auth'

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(seedProjects)
  const [settings, setSettings] = useState(companySettings)
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true',
  )

  const addProject = useCallback((project) => {
    setProjects((prev) => {
      const id = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1
      return [{ ...project, id }, ...prev]
    })
  }, [])

  const updateProject = useCallback((id, patch) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    )
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateSettings = useCallback((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const login = useCallback((email, password) => {
    const ok =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    if (ok) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthed(true)
    }
    return ok
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthed(false)
  }, [])

  const value = useMemo(
    () => ({
      projects,
      published: projects.filter((p) => p.status === 'published'),
      settings,
      isAuthed,
      addProject,
      updateProject,
      deleteProject,
      updateSettings,
      login,
      logout,
    }),
    [
      projects,
      settings,
      isAuthed,
      addProject,
      updateProject,
      deleteProject,
      updateSettings,
      login,
      logout,
    ],
  )

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider')
  return ctx
}
