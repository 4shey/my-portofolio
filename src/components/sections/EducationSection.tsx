import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'
import { education } from '../../constants/content'

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!

    gsap.set('.edu-content', { opacity: 0, y: 40 })
    gsap.set('.edu-spine', { strokeDashoffset: 800 })
    gsap.set('.edu-heading', {
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
        end: '+=170%',
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(
        '.edu-heading',
        {
          top: '6.5rem',
          left: '2rem',
          xPercent: 0,
          yPercent: 0,
          scale: 0.4,
          ease: 'power3.inOut',
          duration: 0.5,
        },
        0,
      )
      .to('.edu-content', { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 0.32)
      .to('.edu-spine', { strokeDashoffset: 0, ease: 'none', duration: 0.45 }, 0.35)
      .from(
        '.edu-card',
        {
          opacity: 0,
          x: (_i, el) => ((el as HTMLElement).dataset.side === 'left' ? -50 : 50),
          ease: 'power3.out',
          stagger: 0.1,
          duration: 0.3,
        },
        0.4,
      )
  })

  return (
    <section id="education" ref={sectionRef} className="relative bg-light">
      <div className="relative flex h-screen items-center overflow-hidden">
        <h2 className="edu-heading font-display absolute z-10 origin-top-left text-[clamp(3rem,11vw,7.5rem)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-dark will-change-transform">
          Education
        </h2>

        <div className="edu-content relative mx-auto w-full max-w-5xl px-8 pt-28 md:px-16">
          <div className="relative">
            <svg
              className="pointer-events-none absolute top-0 left-1/2 h-full w-24 -translate-x-1/2"
              viewBox="0 0 80 600"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                className="edu-spine"
                d="M 40 0 C 40 120, 10 180, 40 300 S 70 420, 40 600"
                stroke="#1d1d1d"
                strokeWidth="1.5"
                strokeDasharray="800"
                strokeDashoffset="800"
                strokeLinecap="round"
                opacity="0.25"
              />
            </svg>

            <div className="flex flex-col gap-20 md:gap-28">
              {education.map((item, i) => {
                const side = i % 2 === 0 ? 'left' : 'right'
                return (
                  <article
                    key={item.degree}
                    data-side={side}
                    className={`edu-card group relative w-full max-w-sm cursor-default md:max-w-md ${
                      side === 'left' ? 'mr-auto md:pr-16' : 'ml-auto md:pl-16 md:text-right'
                    }`}
                  >
                    <span className="font-body mb-2 block text-[10px] tracking-[0.4em] text-dark/40 uppercase">
                      {item.period}
                    </span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-dark transition-transform duration-500 group-hover:-translate-y-0.5 md:text-3xl">
                      {item.degree}
                    </h3>
                    <p className="font-body mt-1 text-sm tracking-wide text-dark/50 uppercase">
                      {item.school}
                    </p>
                    <p className="font-body mt-4 text-sm leading-relaxed text-dark/55">{item.detail}</p>
                    <div
                      className={`absolute top-1/2 hidden h-px w-10 bg-dark/20 md:block ${
                        side === 'left' ? '-right-10' : '-left-10'
                      }`}
                    />
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
