import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import ProjectGrid from '../components/ProjectGrid'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { useProjects } from '../context/ProjectsContext'

export default function Home() {
  const { published } = useProjects()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProjectGrid projects={published} />
        <Process />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
