import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticTextProps {
  children: string
  className?: string
  radius?: number
  strength?: number
}

export function MagneticText({
  children,
  className = '',
  radius = 100,
  strength = 0.4,
}: MagneticTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength
        rawX.set(distX * factor)
        rawY.set(distY * factor)
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    },
    [radius, strength, rawX, rawY],
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.span
      ref={ref}
      className={`inline-block cursor-default ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.span>
  )
}
