import { useCallback, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorFollowLabelProps {
  children: ReactNode
  label: string
  className?: string
  /** visual tone for the floating label */
  tone?: 'light' | 'dark'
}

/**
 * Saat hover, label kecil mengikuti pointer di dalam area ini.
 * Dipakai sparingly — satu motif per section.
 */
export function CursorFollowLabel({
  children,
  label,
  className = '',
  tone = 'light',
}: CursorFollowLabelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 280, damping: 28 })
  const y = useSpring(rawY, { stiffness: 280, damping: 28 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      rawX.set(e.clientX - rect.left)
      rawY.set(e.clientY - rect.top)
    },
    [rawX, rawY],
  )

  const toneClass =
    tone === 'dark'
      ? 'bg-dark text-light'
      : 'bg-light text-dark'

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
    >
      {children}
      <motion.div
        className={`pointer-events-none absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase ${toneClass}`}
        style={{ x, y }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </div>
  )
}
