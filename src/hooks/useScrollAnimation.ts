import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface ScrollAnimationOptions {
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
}

export function useScrollAnimation(
  selector: string,
  animation: gsap.TweenVars,
  options?: ScrollAnimationOptions,
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll(selector)
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...animation,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          ...options,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [selector, animation, options])

  return ref
}
