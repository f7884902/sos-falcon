import { useEffect, useRef } from 'react'

// Adds .is-visible to any descendant with the `.reveal` class once it
// enters the viewport. Disconnects itself after the container's elements
// have all revealed, since these are one-shot entrance animations.
export function useScrollReveal(deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    const targets = node.classList?.contains('reveal')
      ? [node, ...node.querySelectorAll('.reveal')]
      : Array.from(node.querySelectorAll('.reveal'))

    if (targets.length === 0) return undefined

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
