import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Studio from '../components/Studio'
import InlineCta from '../components/InlineCta'
import FeaturedProject from '../components/FeaturedProject'
import ProjectGrid from '../components/ProjectGrid'
import Process from '../components/Process'
import Press from '../components/Press'
import Testimonials from '../components/Testimonials'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import ProjectLightbox from '../components/ProjectLightbox'
import { useProjects } from '../context/ProjectsContext'

export default function Home() {
  const { published } = useProjects()
  const [active, setActive] = useState(null)
  const featured = published[0]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Studio />
        <InlineCta />
        <FeaturedProject project={featured} onOpen={setActive} />
        <ProjectGrid projects={published} onSelect={setActive} />
        <Process />
        <Press />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ProjectLightbox project={active} onClose={() => setActive(null)} />
    </div>
  )
}
