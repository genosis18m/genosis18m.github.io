'use client'

import { useState } from 'react'
import { FiGithub, FiExternalLink, FiGlobe, FiShield, FiHeart, FiMusic } from 'react-icons/fi'
import { FaServer, FaCamera, FaHospital, FaWaveSquare, FaSpaceShuttle } from 'react-icons/fa'

interface Project {
  id: string
  title: string
  shortTitle: string
  icon: React.ReactNode
  tagline: string
  description: string[]
  tech: string[]
  color: string
  github: string
  live?: string
  accentColor: string
}

const projects: Project[] = [
  {
    id: 'medical',
    title: 'Medical Appointment System',
    shortTitle: 'AI Medical Agent',
    icon: <FaHospital />,
    tagline: 'AI-powered scheduling with MCP integration',
    description: [
      'Built an AI-powered medical appointment system using FastAPI and React, integrating 13 custom MCP tools for intelligent booking, patient history management, and automated doctor reporting.',
      'Architected a standalone MCP server using JSON-RPC, enabling reusable AI tool access across multiple clients (Claude Desktop, VSCode) with strict role-based access control.',
      'Integrated Google Calendar API for automated scheduling, Gmail SMTP for patient notifications, and Slack webhooks for real-time doctor alerts — reducing manual coordination by 70%.',
    ],
    tech: ['FastAPI', 'React', 'MCP', 'JSON-RPC', 'Google Calendar API', 'Gmail SMTP', 'Slack API', 'Python'],
    color: 'from-green-500 to-teal-400',
    accentColor: '#10B981',
    github: 'https://github.com/genosis18m/Medic-assistant',
  },
  {
    id: 'metaverse',
    title: '2D Metaverse Platform',
    shortTitle: 'Real-time Metaverse',
    icon: <FaSpaceShuttle />,
    tagline: 'Real-time multiplayer virtual world',
    description: [
      'Engineered a real-time multiplayer platform using Go, WebSockets, and PostgreSQL to synchronize user movement, chat, and state across virtual spaces with <50ms latency.',
      'Architected scalable microservices with Gin framework and GORM, implementing JWT authentication, Google OAuth 2.0, and RESTful APIs for space management.',
      'Built a high-performance React + TypeScript frontend with Canvas API rendering at 60 FPS, optimistic UI updates, and responsive design for cross-device accessibility.',
    ],
    tech: ['Go', 'WebSockets', 'PostgreSQL', 'React', 'TypeScript', 'Canvas API', 'JWT', 'OAuth 2.0'],
    color: 'from-blue-600 to-cyan-500',
    accentColor: '#3B82F6',
    github: 'https://github.com/genosis18m/Metaverse_go',
    live: 'https://metaverse-frontend-production-3803.up.railway.app/',
  },
  {
    id: 'hair',
    title: 'Hair Analysis SaaS Platform',
    shortTitle: 'ML Hair Analyzer',
    icon: <FaCamera />,
    tagline: 'ML-powered hair health diagnostics',
    description: [
      'Developed a full-stack SaaS application integrating custom ML models to diagnose hair health from user images with high accuracy.',
      'Engineered a credit-based monetization system using Stripe Payment Intents and secure session management for seamless user experience.',
      'Deployed a responsive UI with persistent analysis history stored in PostgreSQL, optimized for mobile-first performance on Vercel.',
    ],
    tech: ['Next.js', 'Python', 'ML/CV', 'Stripe', 'PostgreSQL', 'Vercel', 'TypeScript'],
    color: 'from-orange-500 to-yellow-400',
    accentColor: '#F97316',
    github: 'https://github.com/genosis18m/Hair_Webapp',
    live: 'https://hair-analysis-app.vercel.app/',
  },
  {
    id: 'proxy',
    title: 'Custom Network Proxy Server',
    shortTitle: 'Go Forward Proxy',
    icon: <FaServer />,
    tagline: 'High-performance forward proxy in Go',
    description: [
      'Engineered a high-performance forward proxy using Go\'s net package, supporting HTTP forwarding and HTTPS tunneling via the CONNECT method.',
      'Implemented a goroutine-per-connection concurrency model to handle simultaneous traffic with non-blocking I/O and custom request logging.',
      'Designed a domain filtering system with subdomain matching to block blacklisted sites using configurable rules and strict request validation.',
    ],
    tech: ['Go', 'net/http', 'Goroutines', 'HTTPS Tunneling', 'Domain Filtering', 'Concurrency'],
    color: 'from-purple-600 to-pink-500',
    accentColor: '#8B5CF6',
    github: 'https://github.com/genosis18m/Proxy-Network-Server',
  },
  {
    id: 'astrosonification',
    title: 'Image Sonification Tool',
    shortTitle: 'Data Sonifier',
    icon: <FaWaveSquare />,
    tagline: 'Transforming astronomical data into sound',
    description: [
      'Engineered a Python-based CLI tool that converts complex astronomical image arrays (.npy) into high-fidelity audio streams by mapping brightness and color to sonic properties.',
      'Designed efficient data processing pipelines utilizing NumPy and FFmpeg to downsample massive datasets, ensuring performant audio generation without memory bottlenecks.',
      'Documented a comprehensive user guide with CLI parameter customization (e.g., downsample factor, max pixels) to support diverse scientific data exploration.',
    ],
    tech: ['Python', 'NumPy', 'FFmpeg', 'Data Processing', 'CLI', 'Audio Generation'],
    color: 'from-slate-900 to-indigo-900',
    accentColor: '#818CF8',
    github: 'https://github.com/genosis18m/Astrosonification_tool',
  },
]

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState(projects[0].id)

  const active = projects.find((p) => p.id === activeTab)!

  return (
    <section id="projects" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p
            className="text-xs font-display font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#8B5CF6' }}
          >
            Selected Work
          </p>
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}
          >
            Featured{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Projects
            </span>
          </h2>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-nowrap w-full gap-2 py-4 mb-8 justify-center px-4 custom-scrollbar">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveTab(project.id)}
              className="ui-btn"
              style={{
                '--hover-btn-color': project.accentColor,
                '--btn-default-bg': activeTab === project.id ? `${project.accentColor}1A` : 'var(--bg-card)',
                borderColor: activeTab === project.id ? `${project.accentColor}66` : 'var(--bg-card-border)',
                color: activeTab === project.id ? project.accentColor : 'var(--text-secondary)',
                boxShadow: activeTab === project.id ? `0 0 20px ${project.accentColor}33` : '0 4px 15px 0 rgba(0, 0, 0, 0.2)',
              } as React.CSSProperties}
            >
              <span>{project.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Project card */}
        <div
          key={active.id}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${active.accentColor}33`,
            boxShadow: `0 0 60px ${active.accentColor}15, 0 4px 24px var(--shadow)`,
            animation: 'fadeInUp 0.4s ease both',
          }}
        >
          {/* Card header with gradient */}
          <div
            className={`bg-gradient-to-r ${active.color} p-8 md:p-12 relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-4 opacity-90 drop-shadow-md">{active.icon}</div>
              <h3 className="font-display font-black text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                {active.title}
              </h3>
              <p className="text-white/70 font-medium text-lg">{active.tagline}</p>

              {/* Links */}
              <div className="flex gap-3 mt-6 items-center">
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-button-icon"
                >
                  <div className="gh-icon">
                    <FiGithub />
                  </div>
                  <div className="gh-cube">
                    <span className="gh-side gh-front">Code</span>
                    <span className="gh-side gh-top">GitHub</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
            {/* Description */}
            <div>
              <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-5" style={{ color: active.accentColor }}>
                What I Built
              </h4>
              <ul className="space-y-4">
                {active.description.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: active.accentColor }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-5" style={{ color: active.accentColor }}>
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-display font-semibold"
                    style={{
                      background: `${active.accentColor}15`,
                      border: `1px solid ${active.accentColor}33`,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project number indicator */}
              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--divider)' }}>
                <p className="text-xs" style={{ color: 'var(--text-label)' }}>
                  Project {projects.findIndex((p) => p.id === active.id) + 1} of {projects.length}
                </p>
                <div className="flex gap-1.5 mt-2">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveTab(p.id)}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: p.id === active.id ? '24px' : '8px',
                        background: p.id === active.id ? active.accentColor : 'var(--bg-card-border)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
