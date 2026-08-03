'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.documentElement.classList.add('lenis-disabled')
      return
    }

    document.documentElement.classList.add('lenis')

    const lenis = new Lenis({
      // lerp-based feel is smoother than duration-only
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.85,
      autoRaf: true,
      overscroll: true,
      anchors: {
        offset: -80,
        lerp: 0.1,
      },
      prevent: (node) => {
        if (!(node instanceof HTMLElement)) return false
        return (
          node.closest('[data-lenis-prevent]') != null ||
          node.closest('.overflow-x-auto') != null
        )
      },
    })

    // Expose for optional GSAP / debug sync
    ;(window as unknown as { __lenis?: typeof lenis }).__lenis = lenis

    return () => {
      delete (window as unknown as { __lenis?: typeof lenis }).__lenis
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
