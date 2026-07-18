import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function useMousePosition(spring = false, springConfig = { stiffness: 100, damping: 30 }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [x, y])

  return spring ? { x: springX, y: springY } : { x, y }
}
