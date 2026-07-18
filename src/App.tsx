import { Header } from './components/layout/Header'
import { HeroSection } from './components/sections/HeroSection'
import { EducationSection } from './components/sections/EducationSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { CertificatesSection } from './components/sections/CertificatesSection'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
      </main>
    </>
  )
}

export default App
