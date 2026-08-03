'use client'

import { useState } from 'react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import SectionHeading from '@/components/SectionHeading'

interface Project {
  id: string
  title: string
  shortTitle: string
  year: string
  tagline: string
  description: string[]
  tech: string[]
  github: string
  live?: string
}

const projects: Project[] = [
  {
    id: 'autoconf',
    title: 'AutoConf',
    shortTitle: 'AutoConf',
    year: '2026',
    tagline: 'Seven AI agents that plan an entire conference in under a minute.',
    description: [
      'Built a fully autonomous conference planning platform powered by 7 specialized AI agents running concurrently via an async FastAPI orchestrator with real-time WebSocket streaming.',
      'Integrated Groq (LLaMA 3), Gemini, Tavily, and Google Places to ship sponsors, speaker lineups, revenue forecasts, and a full run-of-show.',
      'Shipped a React + TypeScript frontend with a live agent dashboard, PDF export, and a zero-backend demo mode on Vercel.',
    ],
    tech: ['FastAPI', 'React', 'TypeScript', 'Groq', 'Gemini', 'WebSockets', 'Supabase'],
    github: 'https://github.com/genosis18m/AutoConf-multiAgents',
    live: 'https://auto-conf-multi-agents.vercel.app',
  },
  {
    id: 'medical',
    title: 'Medical Appointment System',
    shortTitle: 'Medic Agent',
    year: '2025',
    tagline: 'AI scheduling with custom MCP tools for clinics.',
    description: [
      'Built an AI-powered medical appointment system using FastAPI and React, with 13 custom MCP tools for booking, history, and doctor reporting.',
      'Architected a standalone MCP server over JSON-RPC so the same tools work in Claude Desktop and VS Code, with role-based access.',
      'Wired Google Calendar, Gmail SMTP, and Slack alerts — cutting manual coordination by about 70%.',
    ],
    tech: ['FastAPI', 'React', 'MCP', 'Google Calendar', 'Slack', 'Python'],
    github: 'https://github.com/genosis18m/Medic-assistant',
  },
  {
    id: 'metaverse',
    title: '2D Metaverse',
    shortTitle: 'Metaverse',
    year: '2025',
    tagline: 'Real-time multiplayer spaces with sub-50ms sync.',
    description: [
      'Engineered a real-time multiplayer platform in Go, WebSockets, and PostgreSQL for movement, chat, and shared state.',
      'Built Gin microservices with JWT auth, Google OAuth, and REST APIs for space management.',
      'Rendered a React + TypeScript Canvas client at 60 FPS with optimistic updates.',
    ],
    tech: ['Go', 'WebSockets', 'PostgreSQL', 'React', 'TypeScript', 'Canvas'],
    github: 'https://github.com/genosis18m/Metaverse_go',
    live: 'https://go-metaverse.vercel.app/',
  },
  {
    id: 'golf-fego',
    title: 'Golf Charity Draw',
    shortTitle: 'GOLf-fego',
    year: '2026',
    tagline: 'Subscriptions, draws, and admin ops for charity golf.',
    description: [
      'Full-stack Next.js app with member dashboard, admin portal, auth, and role-based access.',
      'Stripe subscriptions + webhooks, Supabase storage, score tracking, and charity selection.',
      'Custom prize-draw workflow spanning public site, member flows, and ops tooling.',
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind'],
    github: 'https://github.com/genosis18m/golf-subscription-charity-platform',
    live: 'https://golf-subscription-charity-platform.vercel.app/',
  },
  {
    id: 'hair',
    title: 'Hair Analysis SaaS',
    shortTitle: 'Hair Analyzer',
    year: '2025',
    tagline: 'ML diagnostics from a selfie, with credit-based billing.',
    description: [
      'Full-stack SaaS integrating custom ML models to diagnose hair health from user images.',
      'Credit monetization via Stripe Payment Intents and secure sessions.',
      'Analysis history in PostgreSQL; mobile-first UI on Vercel.',
    ],
    tech: ['Next.js', 'Python', 'ML/CV', 'Stripe', 'PostgreSQL'],
    github: 'https://github.com/genosis18m/Hair_Webapp',
    live: 'https://hair-analysis-app.vercel.app/',
  },
  {
    id: 'proxy',
    title: 'Forward Proxy',
    shortTitle: 'Go Proxy',
    year: '2025',
    tagline: 'HTTP/HTTPS tunneling and domain filtering in Go.',
    description: [
      'High-performance forward proxy using Go’s net package — HTTP forward + HTTPS CONNECT tunnels.',
      'Goroutine-per-connection model with non-blocking I/O and request logging.',
      'Configurable domain filtering with subdomain matching and strict validation.',
    ],
    tech: ['Go', 'net/http', 'Goroutines', 'HTTPS Tunneling'],
    github: 'https://github.com/genosis18m/Proxy-Network-Server',
  },
  {
    id: 'astrosonification',
    title: 'Image Sonification',
    shortTitle: 'Sonifier',
    year: '2024',
    tagline: 'Turn astronomical image arrays into sound.',
    description: [
      'Python CLI that maps .npy image brightness and color into high-fidelity audio.',
      'NumPy + FFmpeg pipelines to downsample large datasets without memory spikes.',
      'Documented CLI knobs for downsample factor, max pixels, and exploration workflows.',
    ],
    tech: ['Python', 'NumPy', 'FFmpeg', 'CLI'],
    github: 'https://github.com/genosis18m/Astrosonification_tool',
  },
]

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) ?? projects[0]
  const activeIndex = projects.findIndex((p) => p.id === active.id)

  return (
    <section id="projects" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <div className="section-container relative z-10">
        <SectionHeading index="04" eyebrow="Selected work" title="Featured" italicWord="projects" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Index */}
          <nav className="lg:col-span-4" aria-label="Project list">
            <ol className="border-t" style={{ borderColor: 'var(--divider)' }}>
              {projects.map((project, i) => {
                const selected = project.id === active.id
                return (
                  <li key={project.id} style={{ borderColor: 'var(--divider)' }} className="border-b">
                    <button
                      type="button"
                      onClick={() => setActiveId(project.id)}
                      className="group flex w-full items-baseline gap-4 py-4 text-left transition-colors"
                      style={{ color: selected ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      <span
                        className="font-serif italic text-sm tabular-nums w-7 shrink-0"
                        style={{ color: selected ? 'var(--accent-ink)' : 'var(--text-label)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-[15px] sm:text-base font-semibold tracking-[-0.02em] transition-colors"
                          style={{
                            color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {project.shortTitle}
                        </span>
                        <span
                          className="mt-0.5 block text-xs"
                          style={{ color: 'var(--text-label)' }}
                        >
                          {project.year}
                        </span>
                      </span>
                      <span
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--text-muted)' }}
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Detail */}
          <article
            key={active.id}
            className="lg:col-span-8 lg:sticky lg:top-24 lg:self-start"
            style={{ animation: 'fadeInUp 0.35s ease both' }}
          >
            <p
              className="font-serif italic text-sm mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>

            <h3
              className="font-bold tracking-[-0.035em] leading-[1.05]"
              style={{
                fontSize: 'clamp(1.85rem, 4.2vw, 3rem)',
                color: 'var(--text-primary)',
              }}
            >
              {active.title}
            </h3>

            <p
              className="mt-4 font-serif text-lg sm:text-xl leading-snug max-w-xl"
              style={{ color: 'var(--accent-ink)' }}
            >
              {active.tagline}
            </p>

            <ul className="mt-8 space-y-4 max-w-2xl">
              {active.description.map((point) => (
                <li
                  key={point.slice(0, 40)}
                  className="prose-body text-[15px] pl-4"
                  style={{
                    color: 'var(--text-secondary)',
                    borderLeft: '1px solid var(--divider)',
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>

            <p
              className="mt-8 text-sm leading-relaxed max-w-2xl"
              style={{ color: 'var(--text-muted)' }}
            >
              {active.tech.join(' · ')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={active.github}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-button-icon"
                aria-label={`${active.title} on GitHub`}
              >
                <div className="gh-icon">
                  <FiGithub />
                </div>
                <div className="gh-cube">
                  <span className="gh-side gh-front bg-gray-900 border border-gray-700">
                    Code
                  </span>
                  <span className="gh-side gh-top bg-gray-800 text-white">GitHub</span>
                </div>
              </a>
              {active.live && (
                <a
                  href={active.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Live demo
                  <FiArrowUpRight size={15} />
                </a>
              )}
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveId(projects[activeIndex - 1].id)}
                className="text-sm disabled:opacity-30 underline-offset-4 hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                Prev
              </button>
              <span style={{ color: 'var(--divider)' }}>/</span>
              <button
                type="button"
                disabled={activeIndex === projects.length - 1}
                onClick={() => setActiveId(projects[activeIndex + 1].id)}
                className="text-sm disabled:opacity-30 underline-offset-4 hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                Next
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
