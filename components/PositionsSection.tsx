'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'
import SectionHeading from '@/components/SectionHeading'

const positions = [
  {
    role: 'Head of Dev',
    org: 'Student Technical Council',
    orgFull: 'Student Technical Council (STC), IIT Roorkee',
    period: 'Jan 2026 – Present',
    color: '#8B5CF6',
    colorB: '#3B82F6',
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
    colorB: '#22D3EE',
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
    colorB: '#FBBF24',
    logo: '/images/stand-up-logo.jpeg',
    points: [
      'Managing club operations & logistics',
      'Scheduling cultural performances & events',
      'Facilitating comedy workshops',
      'Hosting open-mic sessions',
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function PositionsSection() {
  return (
    <section id="positions" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <style>{`
        .pos-card {
          background: var(--bg-card);
          border: 1px solid var(--bg-card-border);
          border-radius: 4px;
          padding: 1.75rem;
          box-shadow: 0 4px 24px var(--shadow);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .pos-card::before {
          content: '';
          position: absolute;
          inset: 0 0 auto 0;
          height: 2px;
          background: var(--accent-a);
          opacity: 0.55;
        }
        .pos-card:hover {
          border-color: color-mix(in srgb, var(--accent-a) 35%, transparent);
          box-shadow: 0 12px 36px var(--shadow);
        }

        .pos-logo {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--bg-card-border);
          box-shadow: none;
        }

        .pos-period {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 2px;
          color: var(--text-muted);
          border: 1px solid var(--bg-card-border);
          background: var(--bg-badge);
          font-family: var(--font-sans), sans-serif;
          white-space: nowrap;
          width: fit-content;
        }

        .pos-org {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .pos-point {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .pos-point-dot {
          margin-top: 7px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--text-muted);
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 30%, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            index="03"
            eyebrow="Positions of responsibility"
            title="Campus"
            italicWord="leadership"
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {positions.map((pos) => (
            <motion.div key={pos.role} variants={item} whileHover={{ y: -6 }}>
              <div
                className="pos-card"
                style={{ '--accent-a': pos.color, '--accent-b': pos.colorB } as React.CSSProperties}
              >
                {/* Logo + role */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="pos-logo">
                    <Image
                      src={pos.logo}
                      alt={pos.org}
                      width={56} height={56}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg leading-tight tracking-[-0.02em]"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
                    >
                      {pos.role}
                    </h3>
                    <p className="pos-org" title={pos.orgFull}>{pos.org}</p>
                  </div>
                </div>

                <span className="pos-period mb-5">
                  <FiCalendar size={11} />
                  {pos.period}
                </span>

                {/* Points */}
                <ul className="space-y-2.5">
                  {pos.points.map((point, i) => (
                    <li key={i} className="pos-point">
                      <span className="pos-point-dot" />
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
