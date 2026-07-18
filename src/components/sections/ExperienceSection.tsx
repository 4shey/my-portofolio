import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'
import { experience } from '../../constants/content'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!
    const track = trackRef.current!
    const scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth)

    gsap.set(track, { opacity: 0, y: 40 })
    gsap.set('.exp-heading', {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${scrollDistance + window.innerHeight * 0.8}`,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(
        '.exp-heading',
        {
          top: '5.5rem',
          left: '2rem',
          xPercent: 0,
          yPercent: 0,
          scale: 0.36,
          ease: 'power3.inOut',
          duration: 0.35,
        },
        0,
      )
      .to(track, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.25)
      .from(
        '.exp-card',
        { opacity: 0, y: 40, rotate: 1.5, ease: 'power3.out', stagger: 0.06, duration: 0.2 },
        0.28,
      )
      .to(track, { x: -scrollDistance, ease: 'none', duration: 0.7 }, 0.4)
  })

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden bg-dark">
      <div className="relative flex h-screen flex-col justify-center">
        <h2 className="exp-heading font-display absolute z-10 origin-top-left text-[clamp(3rem,11vw,7.5rem)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-light will-change-transform">
          Experience
        </h2>

        <div
          ref={trackRef}
          className="mt-24 flex w-max gap-6 px-8 pb-4 will-change-transform md:mt-28 md:gap-8 md:px-16"
        >
          {experience.map((item, i) => (
            <article
              key={item.role}
              className="exp-card group relative h-[400px] w-[78vw] max-w-[400px] shrink-0 cursor-default overflow-hidden border border-light/15 md:w-[360px]"
            >
              <div className="absolute inset-0 origin-left scale-x-0 bg-light transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
                <div>
                  <span className="font-body mb-6 block text-[10px] tracking-[0.45em] text-light/40 uppercase transition-colors duration-500 group-hover:text-dark/40">
                    0{i + 1} — {item.period}
                  </span>
                  <h3 className="font-display text-3xl leading-tight font-semibold tracking-tight text-light transition-colors duration-500 group-hover:text-dark md:text-4xl">
                    {item.role}
                  </h3>
                  <p className="font-body mt-2 text-sm tracking-[0.2em] text-light/50 uppercase transition-colors duration-500 group-hover:text-dark/50">
                    {item.company}
                  </p>
                </div>

                <p className="font-body text-sm leading-[1.85] text-light/55 transition-colors duration-500 group-hover:text-dark/60">
                  {item.description}
                </p>

                <span className="font-display text-5xl font-light text-light/10 transition-colors duration-500 group-hover:text-dark/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </article>
          ))}

          <div className="w-[10vw] shrink-0" aria-hidden />
        </div>

        <p className="font-body absolute bottom-10 left-8 text-[10px] tracking-[0.5em] text-light/30 uppercase md:left-16">
          Scroll →
        </p>
      </div>
    </section>
  )
}
