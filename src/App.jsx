import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ProjectsProvider } from './context/ProjectsContext'
import Home from './pages/Home'
import Login from './pages/admin/Login'
import RequireAuth from './pages/admin/RequireAuth'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProjectsTable from './pages/admin/ProjectsTable'
import UploadProject from './pages/admin/UploadProject'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <ProjectsProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsTable />} />
              <Route path="upload" element={<UploadProject />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectsProvider>
    </ThemeProvider>
  )
}
