import Navbar from '@/components/Navbar'
import HeroPaint from '@/components/HeroPaint'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import PositionsSection from '@/components/PositionsSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'
import JsonLd from '@/components/JsonLd'

export default function Home() {
  return (
    <>
      <JsonLd />
      <main className="relative" id="main-content">
        <Navbar />
        <HeroPaint />
        <AboutSection />
        <ExperienceSection />
        <PositionsSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  )
}
