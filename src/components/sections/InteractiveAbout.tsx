import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { aboutContent } from '../../constants/content'
import { MagneticText } from '../ui/MagneticText'

function InvertWord({ word }: { word: string }) {
  return (
    <motion.span
      className="about-line relative inline-block cursor-default overflow-hidden px-1"
      whileHover="hover"
      initial="rest"
    >
      <motion.span
        className="absolute inset-0 bg-dark"
        variants={{
          rest: { y: '100%' },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="relative font-display text-[clamp(1.4rem,3.5vw,2.4rem)] font-semibold tracking-[-0.03em] text-dark"
        variants={{
          rest: { color: '#1d1d1d' },
          hover: { color: '#dadada' },
        }}
        transition={{ duration: 0.25 }}
      >
        {word}
      </motion.span>
    </motion.span>
  )
}

export function InteractiveAbout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(-80)
  const rawY = useMotionValue(-80)
  const stampX = useSpring(rawX, { stiffness: 55, damping: 16 })
  const stampY = useSpring(rawY, { stiffness: 55, damping: 16 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      rawX.set(e.clientX - rect.left - 48)
      rawY.set(e.clientY - rect.top - 48)
    },
    [rawX, rawY],
  )

  const first = aboutContent.name.split(' ')[0].toUpperCase()
  const last = aboutContent.name.split(' ').slice(1).join(' ').toUpperCase()

  return (
    <div
      ref={rootRef}
      className="relative h-full overflow-hidden bg-light text-dark"
      onMouseMove={onMove}
    >
      {/* stamp mengikuti pointer — tidak block interaksi */}
      <motion.div
        className="pointer-events-none absolute z-30 flex h-24 w-24 items-center justify-center rounded-full border border-dark/25 bg-light/70 mix-blend-difference"
        style={{ x: stampX, y: stampY }}
      >
        <span className="font-body text-center text-[9px] leading-tight tracking-[0.2em] text-dark uppercase">
          About
          <br />
          Me
        </span>
      </motion.div>

      <h2 className="about-line pointer-events-none absolute top-[18%] left-[-2%] z-0 font-display text-[clamp(4.5rem,18vw,14rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-dark select-none">
        {first}
      </h2>

      <motion.div
        className="about-line absolute top-[48%] left-[8%] z-10 md:left-[18%]"
        whileHover={{ scale: 1.04, rotate: -1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        <MagneticText
          className="inline-block bg-dark px-5 py-3 font-display text-[clamp(2rem,7vw,5.5rem)] leading-none font-semibold tracking-[-0.04em] text-light md:px-8 md:py-4"
          radius={160}
          strength={0.35}
        >
          {last}
        </MagneticText>
      </motion.div>

      <svg
        className="about-line pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-20"
        aria-hidden
      >
        <line x1="0" y1="85%" x2="100%" y2="15%" stroke="#1d1d1d" strokeWidth="1" />
      </svg>

      <p
        className="about-line absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 font-body text-[10px] tracking-[0.55em] text-dark/40 uppercase md:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        {aboutContent.role}
      </p>

      <motion.div
        className="about-line absolute right-6 bottom-28 z-10 max-w-xs border border-dark bg-light p-5 md:right-16 md:bottom-32 md:max-w-sm md:p-6"
        style={{ rotate: -2 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <p className="font-body text-sm leading-[1.75] text-dark/70">{aboutContent.bio}</p>
        <p className="font-body mt-4 text-[10px] tracking-[0.35em] text-dark/40 uppercase">
          Indonesia · Open to work
        </p>
      </motion.div>

      <div className="about-line absolute bottom-6 left-6 z-10 flex flex-wrap items-end gap-x-4 gap-y-1 md:left-10">
        {aboutContent.highlights.map((skill, i) => (
          <span key={skill} className="flex items-baseline gap-4">
            {i > 0 && <span className="font-display text-dark/25">/</span>}
            <InvertWord word={skill.split(' ')[0]} />
          </span>
        ))}
      </div>

      <span className="about-line pointer-events-none absolute top-8 left-8 z-10 font-display text-6xl font-light text-dark/10 md:text-8xl">
        01
      </span>
    </div>
  )
}
