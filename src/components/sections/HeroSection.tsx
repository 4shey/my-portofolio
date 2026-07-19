import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'
import { introLines } from '../../constants/content'
import { InteractiveAbout } from './InteractiveAbout'

const taClass =
  'font-display select-none text-[clamp(8rem,22vw,18rem)] leading-none font-semibold tracking-[-0.04em] text-light'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!
    const lines = section.querySelectorAll<HTMLDivElement>('.home-line')
    const travel = window.innerWidth * 1.2

    // satu glyph di tengah yang membesar; panel split baru muncul saat siap belah
    gsap.set('.ta-grow', { scale: 0.18, transformOrigin: '50% 50%' })
    gsap.set('.split-top, .split-bottom', { yPercent: 0, autoAlpha: 0 })
    gsap.set('.about-reveal', { autoAlpha: 0 })
    gsap.set('.ta-bg', { autoAlpha: 1 })
    gsap.set('.intro-layer', { autoAlpha: 1 })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=220%',
        scrub: 0.65,
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
          duration: 0.3,
          stagger: 0,
        },
        0,
      )
      .to('.intro-layer', { autoAlpha: 0, duration: 0.05 }, 0.28)
      // membesar utuh (atas+bawah bareng) — satu elemen
      .to('.ta-grow', { scale: 1, ease: 'power3.out', duration: 0.28 }, 0.3)
      // swap ke panel split (ukuran penuh) lalu belah
      .to('.ta-grow', { autoAlpha: 0, duration: 0.01 }, 0.58)
      .to('.ta-bg', { autoAlpha: 0, duration: 0.01 }, 0.58)
      .to('.split-top, .split-bottom', { autoAlpha: 1, duration: 0.01 }, 0.58)
      .to('.about-reveal', { autoAlpha: 1, duration: 0.01 }, 0.64)
      .to('.split-top', { yPercent: -100, ease: 'power3.inOut', duration: 0.28 }, 0.58)
      .to('.split-bottom', { yPercent: 100, ease: 'power3.inOut', duration: 0.28 }, 0.58)
      .from(
        '.about-line',
        { opacity: 0, y: 40, ease: 'power3.out', stagger: 0.05, duration: 0.24 },
        0.64,
      )
  })

  return (
    <section ref={sectionRef} className="relative bg-dark">
      <div className="relative h-screen w-full overflow-hidden bg-dark">
        <div className="about-reveal absolute inset-0 z-0 bg-light">
          <InteractiveAbout />
        </div>

        {/* backdrop gelap selama fase scale — ilang pas panel split */}
        <div className="ta-bg pointer-events-none absolute inset-0 z-[5] bg-dark" />

        {/* layer T.A */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* glyph tunggal — animasi scale yang benar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`ta-grow ${taClass} will-change-transform`}>T.A</span>
          </div>

          {/* panel split — muncul setelah scale selesai */}
          <div className="split-top absolute top-0 left-0 h-1/2 w-full overflow-hidden bg-dark will-change-transform">
            <div className="flex h-screen items-center justify-center">
              <span className={taClass}>T.A</span>
            </div>
          </div>
          <div className="split-bottom absolute bottom-0 left-0 h-1/2 w-full overflow-hidden bg-dark will-change-transform">
            <div className="flex h-screen -translate-y-1/2 items-center justify-center">
              <span className={taClass}>T.A</span>
            </div>
          </div>
        </div>

        <div className="intro-layer absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 overflow-hidden bg-dark px-4 md:gap-8">
          {introLines.map((line) => (
            <div
              key={line.text}
              className="home-line font-display w-full whitespace-nowrap text-center text-[clamp(3rem,10vw,9.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-light will-change-transform"
              data-dir={line.dir}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
