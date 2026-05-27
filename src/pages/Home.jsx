import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProjectGrid from '../components/ProjectGrid'
import ContactForm from '../components/ContactForm'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid projects={projects} />
        <ContactForm />
      </main>
      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} CHIDR Interior
      </footer>
    </div>
  )
}
