import { ShrinkingPanelSection } from '../animations/ShrinkingPanelSection'
import { projects } from '../../constants/content'
import { CursorFollowLabel } from '../ui/CursorFollowLabel'

export function ProjectsSection() {
  return (
    <ShrinkingPanelSection id="projects" title="Projects" variant="dark-frame">
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {projects.map((project, i) => (
          <CursorFollowLabel key={project.title} label="Explore" tone="dark" className="panel-item">
            <article className="group relative cursor-default overflow-hidden rounded-2xl border border-dark/15 p-6 transition-colors duration-500 hover:border-dark">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-dark transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative mb-6 block font-body text-[10px] tracking-[0.35em] text-dark/40 uppercase transition-colors duration-500 group-hover:text-light/50">
                0{i + 1} — {project.tag}
              </span>
              <h3 className="relative mb-3 font-display text-xl font-semibold tracking-tight text-dark transition-colors duration-500 group-hover:text-light">
                {project.title}
              </h3>
              <p className="relative font-body text-sm leading-relaxed text-dark/55 transition-colors duration-500 group-hover:text-light/60">
                {project.description}
              </p>
            </article>
          </CursorFollowLabel>
        ))}
      </div>
    </ShrinkingPanelSection>
  )
}
