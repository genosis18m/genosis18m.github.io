'use client'

import Image from 'next/image'

const education = {
  institution: 'Indian Institute of Technology Roorkee',
  location: 'Roorkee, India',
  degree: 'B.Tech in Materials Engineering',
  period: 'Aug 2023 – May 2027',
  coursework: ['Probability & Statistics', 'Linear Algebra', 'Calculus', 'Data Structures & Algorithms', 'Machine Learning', 'Data Science'],
}

const positions = [
  {
    role: 'Head of Dev',
    org: 'Student Technical Council',
    orgFull: 'Student Technical Council (STC), IIT Roorkee',
    period: 'Jan 2026 – Present',
    color: '#8B5CF6',
    logo: '/images/stc-logo.jpg',
    points: [
      'Leading the technical development wing of STC',
      'Overseeing campus-wide software projects',
      'Mentoring junior student developers',
      'Establishing code quality standards',
    ],
  },
  {
    role: 'Secretary',
    org: 'Eco Group',
    orgFull: 'Eco Group, IIT Roorkee',
    period: 'Aug 2025 – Present',
    color: '#10B981',
    logo: '/images/eco_iitr_logo.jpeg',
    points: [
      'Spearheading campus sustainability initiatives',
      'Leading solar-energy and green projects',
      'Coordinating NGO collaborations',
      'Managing volunteer teams of 30+ members',
    ],
  },
  {
    role: 'Joint Secretary',
    org: 'Comedy Club',
    orgFull: 'Comedy Club, IIT Roorkee',
    period: 'Aug 2025 – Present',
    color: '#F97316',
    logo: '/images/stand-up-logo.jpeg',
    points: [
      'Managing club operations & logistics',
      'Scheduling cultural performances & events',
      'Facilitating comedy workshops',
      'Hosting open-mic sessions',
    ],
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <style>{`
        /* ── Uiverse position card ── */
        .pos-uiverse-card {
          --card-font: var(--text-primary);
          --card-font-sub: var(--text-secondary);
          --card-bg: var(--bg-card);
          --card-main: var(--paint-purple);
          flex: 1 1 260px;
          max-width: 380px;
          min-width: 220px;
          height: auto;
          min-height: 220px;
          background: var(--card-bg);
          border: 2px solid var(--card-main);
          box-shadow: 4px 4px var(--card-main);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 20px 20px;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
          position: relative;
        }
        .pos-uiverse-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px var(--card-main);
        }

        .pos-card-logo {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--card-main);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139,92,246,0.08);
          flex-shrink: 0;
        }

        .pos-card-title {
          text-align: center;
          color: var(--text-primary);
          font-size: 18px;
          font-weight: 800;
          font-family: var(--font-nunito), sans-serif;
          line-height: 1.2;
        }
        .pos-card-title span {
          display: block;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          margin-top: 3px;
        }

        .pos-card-points {
          display: flex;
          flex-direction: column;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          gap: 5px;
          transition: opacity 0.4s ease, max-height 0.5s ease;
          width: 100%;
        }
        .pos-uiverse-card:hover .pos-card-points {
          opacity: 1;
          max-height: 200px;
        }
        .pos-card-point {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 12px;
          font-family: var(--font-nunito), sans-serif;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .pos-card-point-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
        }

        /* stagger in */
        @keyframes slideInCard {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pos-stagger {
          opacity: 0;
          animation: slideInCard 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
          display: flex;
          flex: 1 1 260px;
          max-width: 380px;
        }
        .pos-stagger:nth-child(1) { animation-delay: 0.1s; }
        .pos-stagger:nth-child(2) { animation-delay: 0.25s; }
        .pos-stagger:nth-child(3) { animation-delay: 0.4s; }

        /* About bio/edu cards */
        .about-card {
          background: var(--bg-card);
          border: 1px solid var(--bg-card-border);
          border-radius: 1rem;
          padding: 2rem;
          transition: background 0.3s;
          box-shadow: 0 4px 20px var(--shadow);
        }
        .about-badge {
          background: var(--bg-badge);
          border: 1px solid var(--bg-card-border);
          color: var(--text-secondary);
          padding: 3px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-family: var(--font-nunito), sans-serif;
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--paint-orange)' }}>
            Background
          </p>
          <h2 className="font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>
            About{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--paint-orange), var(--paint-yellow))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Me
            </span>
          </h2>
        </div>

        {/* Row 1: Bio + Education */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">

          {/* Bio */}
          <div className="about-card h-full">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I&apos;m a <strong style={{ color: 'var(--text-primary)' }}>Full-Stack &amp; Agentic AI Developer</strong> at IIT Roorkee,
              passionate about building systems at the intersection of{' '}
              <span style={{ color: 'var(--paint-purple)' }}>AI/ML</span> and{' '}
              <span style={{ color: 'var(--paint-blue)' }}>high-performance backend engineering</span>.
              I love turning complex ideas into production-ready products — from real-time multiplayer platforms to
              AI-powered SaaS tools.
            </p>
          </div>

          {/* Education */}
          <div className="about-card h-full" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                <Image
                  src="/images/indian-institute-of-technology-roorkee-logo.png"
                  alt="IIT Roorkee"
                  width={56} height={56}
                  className="w-full h-full object-contain p-1"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{education.institution}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--paint-purple)' }}>{education.degree}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {education.period} · {education.location}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {education.coursework.map((course) => (
                    <span key={course} className="about-badge">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Positions of Responsibility — Uiverse cards, full width, responsive */}
        <div>
          <h3 className="font-semibold text-sm tracking-widest uppercase mb-8 text-center"
            style={{ color: 'var(--text-label)' }}>
            Positions of Responsibility
          </h3>

          {/* flex-wrap: stacks vertically on small screens, horizontal row on large */}
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {positions.map((pos) => (
              <div key={pos.role} className="pos-stagger">
                <div className="pos-uiverse-card w-full" style={{ borderColor: pos.color, boxShadow: `4px 4px ${pos.color}` }}>
                  {/* Logo */}
                  <div className="pos-card-logo" style={{ borderColor: pos.color }}>
                    <Image
                      src={pos.logo}
                      alt={pos.org}
                      width={72} height={72}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Title */}
                  <div className="pos-card-title">
                    {pos.role}
                    <span>{pos.org}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{pos.period}</span>
                  </div>

                  {/* Bullet points on hover */}
                  <div className="pos-card-points">
                    {pos.points.map((point, i) => (
                      <div key={i} className="pos-card-point">
                        <span className="pos-card-point-dot" style={{ backgroundColor: pos.color }} />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
