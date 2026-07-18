import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'
import { introLines, aboutContent } from '../../constants/content'
import { CurvedLines } from '../ui/CurvedLines'
import { MagneticText } from '../ui/MagneticText'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!
    const lines = section.querySelectorAll<HTMLDivElement>('.home-line')
    const travel = window.innerWidth * 1.15
    const vh = window.innerHeight

    gsap.set('.split-top, .split-bottom', { yPercent: 0 })
    gsap.set('.curve-path', { strokeDashoffset: 1000 })
    gsap.set('.curve-dot', { opacity: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=280%',
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(
        lines,
        {
          x: (_i, el) => travel * Number((el as HTMLElement).dataset.dir),
          filter: 'blur(28px)',
          opacity: 0,
          ease: 'power3.inOut',
          stagger: 0.04,
          duration: 0.28,
        },
        0,
      )
      .to('.hero-scroll', { y: -vh, ease: 'power2.inOut', duration: 0.32 }, 0.3)
      .to('.curve-path', { strokeDashoffset: 0, ease: 'power2.out', duration: 0.2 }, 0.52)
      .to('.curve-dot', { opacity: 1, stagger: 0.05, ease: 'power2.out', duration: 0.1 }, 0.58)
      .to('.split-top', { yPercent: -100, ease: 'power3.inOut', duration: 0.28 }, 0.68)
      .to('.split-bottom', { yPercent: 100, ease: 'power3.inOut', duration: 0.28 }, 0.68)
      .to('.curve-lines', { opacity: 0, duration: 0.12 }, 0.68)
      .to('.about-reveal', { opacity: 1, ease: 'power2.out', duration: 0.18 }, 0.78)
      .from(
        '.about-line',
        { opacity: 0, y: 28, ease: 'power3.out', stagger: 0.04, duration: 0.22 },
        0.82,
      )
  })

  return (
    <section ref={sectionRef} className="relative bg-dark">
      <div className="relative h-screen w-full overflow-hidden">
        <div className="about-reveal absolute inset-0 z-0 bg-light opacity-0">
          <div className="flex h-full flex-col justify-between px-8 py-24 md:px-16 lg:px-20">
            <div className="flex items-start justify-between gap-8">
              <p className="about-line font-body text-[11px] tracking-[0.45em] text-dark/40 uppercase">
                {aboutContent.role}
              </p>
              <p className="about-line font-body hidden text-[11px] tracking-[0.35em] text-dark/35 uppercase md:block">
                Based in Indonesia
              </p>
            </div>

            <div className="max-w-4xl">
              <h2 className="about-line font-display text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-dark">
                Hi, I&apos;m{' '}
                <MagneticText className="inline-block" radius={140} strength={0.25}>
                  Tholiul Asbah
                </MagneticText>
              </h2>
              <p className="about-line font-body mt-8 max-w-xl text-base leading-[1.85] text-dark/60 md:text-lg">
                {aboutContent.bio}
              </p>
            </div>

            <div className="about-line flex flex-wrap items-end justify-between gap-8 border-t border-dark/15 pt-8">
              <div className="flex flex-wrap gap-2.5">
                {aboutContent.highlights.map((skill) => (
                  <span
                    key={skill}
                    className="font-body cursor-default border border-dark/25 px-4 py-2 text-[11px] tracking-[0.16em] text-dark uppercase transition-all duration-300 hover:bg-dark hover:text-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="font-body text-[11px] tracking-[0.3em] text-dark/35 uppercase">
                Available for work
              </p>
            </div>
          </div>
        </div>

        <div className="hero-scroll absolute inset-x-0 top-0 will-change-transform">
          <div className="flex h-screen flex-col items-center justify-center gap-8 overflow-hidden px-4 md:gap-10">
            {introLines.map((line) => (
              <div
                key={line.text}
                className="home-line font-display w-full whitespace-nowrap text-center text-5xl font-semibold tracking-[-0.03em] text-light will-change-transform sm:text-6xl md:text-7xl lg:text-8xl"
                data-dir={line.dir}
              >
                {line.text}
              </div>
            ))}
          </div>

          <div className="relative h-screen w-full">
            <CurvedLines className="curve-lines pointer-events-none absolute inset-0 z-[5] text-light/25" />

            <div className="split-top pointer-events-none absolute top-0 left-0 z-10 h-1/2 w-full overflow-hidden bg-dark will-change-transform">
              <div className="flex h-screen items-center justify-center">
                <span className="font-display select-none text-[clamp(8rem,22vw,18rem)] leading-none font-semibold tracking-[-0.04em] text-light">
                  T.A
                </span>
              </div>
            </div>
            <div className="split-bottom pointer-events-none absolute bottom-0 left-0 z-10 h-1/2 w-full overflow-hidden bg-dark will-change-transform">
              <div className="flex h-screen -translate-y-1/2 items-center justify-center">
                <span className="font-display select-none text-[clamp(8rem,22vw,18rem)] leading-none font-semibold tracking-[-0.04em] text-light">
                  T.A
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
