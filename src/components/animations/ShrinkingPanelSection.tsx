import { useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../hooks/useGsapContext'

type PanelVariant = 'dark-frame' | 'light-frame'

interface ShrinkingPanelSectionProps {
  id: string
  title: string
  variant: PanelVariant
  children: ReactNode
}

const variantStyles = {
  'dark-frame': {
    outer: 'bg-dark',
    inner: 'bg-light text-dark',
    title: 'text-dark',
  },
  'light-frame': {
    outer: 'bg-light',
    inner: 'bg-dark text-light',
    title: 'text-light',
  },
} as const

export function ShrinkingPanelSection({
  id,
  title,
  variant,
  children,
}: ShrinkingPanelSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const styles = variantStyles[variant]

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current!

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=140%',
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(
        '.panel-inner',
        {
          scale: 0.88,
          borderRadius: '2rem',
          ease: 'power3.inOut',
          duration: 0.7,
        },
        0,
      )
      .to(
        '.panel-title',
        {
          scale: 0.75,
          y: -80,
          ease: 'power3.inOut',
          duration: 0.7,
        },
        0,
      )
      .to('.panel-content', { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 }, 0.35)
      .from(
        '.panel-item',
        { opacity: 0, y: 40, ease: 'power3.out', stagger: 0.08, duration: 0.4 },
        0.5,
      )
  }, [id])

  return (
    <section id={id} ref={sectionRef} className={`relative ${styles.outer}`}>
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className={`panel-inner flex h-full w-full origin-center flex-col items-center justify-center overflow-hidden rounded-none will-change-transform ${styles.inner}`}
        >
          <h2
            className={`panel-title font-display text-5xl font-semibold tracking-[-0.03em] will-change-transform md:text-7xl lg:text-8xl ${styles.title}`}
          >
            {title}
          </h2>
          <div className="panel-content mt-8 w-full max-w-5xl translate-y-8 px-6 opacity-0 md:px-12">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
