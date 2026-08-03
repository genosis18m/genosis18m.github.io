'use client'

import { useEffect, useState } from 'react'
import CoffeeButton from '@/components/CoffeeButton'
import { useTheme } from '@/context/ThemeContext'

export default function PaintHero() {
  const [showName, setShowName] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300)
    const t2 = setTimeout(() => setShowSubtitle(true), 800)
    const t3 = setTimeout(() => setShowScroll(true), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden" id="home">
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(28,28,26,0.04) 0%, transparent 60%), var(--bg)'
            : 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,196,168,0.06) 0%, transparent 60%), var(--bg)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="hero-aurora hero-aurora-1" style={{ opacity: 0.28 }} />
      <div className="hero-aurora hero-aurora-2" style={{ opacity: 0.2 }} />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
        style={{ paddingTop: '2vh' }}
      >
        <div
          className={`flex flex-col items-center px-4 transition-all duration-1000 ${
            showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p
            className="font-serif text-sm italic mb-5"
            style={{ color: 'var(--text-muted)' }}
          >
            Portfolio / 2026
          </p>

          <div className="relative inline-flex items-center justify-center">
            <h1
              className="select-none text-center"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.75rem, 9.5vw, 7rem)',
                fontWeight: 600,
                letterSpacing: '-0.045em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
              }}
            >
              Mohit Adoni
            </h1>
            <div
              className="pointer-events-auto absolute left-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 -rotate-6 sm:block"
            >
              <CoffeeButton />
            </div>
          </div>

          <div
            className="mt-6 flex items-center gap-3"
            aria-hidden
          >
            <span
              className="h-px w-12 sm:w-16"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--text-muted))',
              }}
            />
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--accent-ink)' }}
            />
            <span
              className="h-px w-12 sm:w-16"
              style={{
                background: 'linear-gradient(90deg, var(--text-muted), transparent)',
              }}
            />
          </div>
        </div>

        <div
          className={`mt-7 flex flex-col items-center px-4 transition-all duration-1000 ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="font-serif text-[clamp(1.05rem,2.2vw,1.35rem)] leading-snug max-w-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Full-stack &amp; agentic AI developer building{' '}
            <em className="emphasis" style={{ color: 'var(--accent-ink)' }}>
              systems that ship
            </em>
            — from IIT Roorkee.
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.02em' }}
          >
            Materials Engineering · B.Tech 2027
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                borderRadius: '2px',
              }}
            >
              View projects
            </a>
            <a
              href="mailto:mohit_a@mt.iitr.ac.in"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold tracking-wide transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '1px solid var(--bg-card-border)',
                color: 'var(--text-primary)',
                borderRadius: '2px',
                background: 'transparent',
              }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {showScroll && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animation: 'fadeIn 1s ease both' }}
        >
          <span
            className="font-serif text-xs italic"
            style={{ color: 'var(--text-label)' }}
          >
            scroll
          </span>
          <div
            className="w-[1px] h-10 origin-top"
            style={{
              background: 'linear-gradient(180deg, var(--text-muted), transparent)',
              animation: 'float 1.8s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </section>
  )
}
