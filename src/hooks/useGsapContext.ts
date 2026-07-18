import { useEffect, type RefObject } from 'react'
import { gsap } from '../lib/gsap'

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = scope.current
    if (!el) return

    const ctx = gsap.context(() => {
      setup()
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
