import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'
import { certificates } from '../../constants/content'
import { CursorFollowLabel } from '../ui/CursorFollowLabel'

export function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!

    gsap.set('.cert-list', { opacity: 0, y: 48 })
    gsap.set('.cert-heading', {
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
        end: '+=160%',
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(
        '.cert-heading',
        {
          top: '6.5rem',
          left: '2rem',
          xPercent: 0,
          yPercent: 0,
          scale: 0.38,
          ease: 'power3.inOut',
          duration: 0.55,
        },
        0,
      )
      .to('.cert-list', { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35 }, 0.35)
      .from(
        '.cert-row',
        { x: 70, opacity: 0, ease: 'power3.out', stagger: 0.07, duration: 0.35 },
        0.42,
      )
  })

  return (
    <section id="certificates" ref={sectionRef} className="relative bg-dark">
      <div className="relative flex h-screen flex-col overflow-hidden">
        <h2 className="cert-heading font-display absolute z-10 origin-top-left text-[clamp(3rem,11vw,7.5rem)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-light will-change-transform">
          Certificates
        </h2>

        <div className="cert-list mt-auto mb-auto pt-36">
          {certificates.map((cert, i) => (
            <CursorFollowLabel key={cert.title} label={cert.year} tone="light" className="cert-row">
              <div className="group relative cursor-default overflow-hidden border-t border-light/15 last:border-b">
                <div className="absolute inset-0 translate-y-full bg-light transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />

                <div className="relative flex items-center gap-6 px-8 py-7 md:gap-10 md:px-16 md:py-9">
                  <span className="font-display w-14 shrink-0 text-3xl font-light text-light/25 transition-colors duration-500 group-hover:text-dark/20 md:text-5xl">
                    0{i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display truncate text-xl font-medium tracking-tight text-light transition-colors duration-500 group-hover:text-dark md:text-3xl">
                      {cert.title}
                    </h3>
                    <p className="font-body mt-1 text-xs tracking-[0.2em] text-light/45 uppercase transition-colors duration-500 group-hover:text-dark/45">
                      {cert.issuer}
                    </p>
                  </div>

                  <span className="font-body hidden text-sm tracking-[0.35em] text-light/35 transition-colors duration-500 group-hover:text-dark/35 sm:block">
                    {cert.year}
                  </span>
                </div>
              </div>
            </CursorFollowLabel>
          ))}
        </div>
      </div>
    </section>
  )
}
