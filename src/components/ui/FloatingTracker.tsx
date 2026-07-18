import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'

interface FloatingTrackerProps {
  children: ReactNode
  className?: string
  springConfig?: { stiffness: number; damping: number }
  offsetX?: number
  offsetY?: number
}

export function FloatingTracker({
  children,
  className = '',
  springConfig = { stiffness: 100, damping: 30 },
  offsetX = 0,
  offsetY = 0,
}: FloatingTrackerProps) {
  const { x, y } = useMousePosition(true, springConfig)

  return (
    <motion.div
      className={`pointer-events-none fixed top-0 left-0 z-50 ${className}`}
      style={{ x, y, translateX: offsetX, translateY: offsetY }}
    >
      {children}
    </motion.div>
  )
}
