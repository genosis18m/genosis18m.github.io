'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

const education = {
  institution: 'Indian Institute of Technology Roorkee',
  location: 'Roorkee, India',
  degree: 'B.Tech in Materials Engineering',
  period: 'Aug 2023 – May 2027',
  coursework: [
    'Probability & Statistics',
    'Linear Algebra',
    'Calculus',
    'Data Structures & Algorithms',
    'Machine Learning',
    'Data Science',
  ],
}

const facts = [
  { label: 'Based in Roorkee' },
  { label: 'Go & TypeScript' },
  { label: 'Agentic systems' },
  { label: 'Anime & manga' },
]

const stats = [
  { value: '7+', label: 'Projects shipped' },
  { value: '2', label: 'Internships' },
  { value: '3', label: 'Leadership roles' },
  { value: '25+', label: 'Technologies' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <style>{`
        .about-card {
          background: var(--bg-card);
          border: 1px solid var(--bg-card-border);
          border-radius: 4px;
          padding: 2rem;
          box-shadow: 0 4px 20px var(--shadow);
          height: 100%;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .about-card:hover {
          border-color: rgba(244, 244, 241, 0.22);
          box-shadow: 0 12px 36px var(--shadow);
        }
        [data-theme="light"] .about-card:hover {
          border-color: rgba(22, 22, 20, 0.22);
        }
        .about-badge {
          background: var(--bg-badge);
          border: 1px solid var(--bg-card-border);
          color: var(--text-secondary);
          padding: 3px 10px;
          border-radius: 2px;
          font-size: 12px;
          font-family: var(--font-sans), sans-serif;
        }
        .about-fact {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: 2px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: var(--font-sans), sans-serif;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--bg-card-border);
          transition: border-color 0.3s ease, color 0.3s ease;
          cursor: default;
        }
        .about-fact:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }
      `}</style>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading index="01" eyebrow="Background" title="About" italicWord="me" />
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-5 gap-6 mb-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="lg:col-span-3" variants={item}>
            <div className="about-card flex flex-col justify-center">
              <p
                className="font-display font-bold mb-5 leading-[1.15] tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(1.45rem, 3vw, 2.05rem)',
                  color: 'var(--text-primary)',
                }}
              >
                I turn ideas into{' '}
                <em className="emphasis" style={{ color: 'var(--accent-ink)' }}>
                  working software
                </em>
                .
              </p>
              <p className="prose-body text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
                3rd-year student at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>IIT Roorkee</strong>, studying
                Materials Engineering — though most of my time goes into building software, not studying it.
                I got into development because I genuinely enjoy the craft, and I gravitate toward{' '}
                <em className="emphasis">AI systems</em>,{' '}
                <em className="emphasis">high-performance backends</em>, and anything that pushes what software can do.
              </p>
              <p className="prose-body text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                Outside of code, I&apos;m deep into{' '}
                <em className="emphasis">anime and manga</em>{' '}
                — the kind of storytelling that makes you think.
              </p>

              <div className="flex flex-wrap gap-2">
                {facts.map((fact) => (
                  <span key={fact.label} className="about-fact">
                    {fact.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2" variants={item} whileHover={{ y: -4 }}>
            <div className="about-card">
              <div
                className="w-14 h-14 overflow-hidden flex items-center justify-center mb-5"
                style={{
                  background: 'var(--bg-badge)',
                  border: '1px solid var(--bg-card-border)',
                  borderRadius: '4px',
                }}
              >
                <Image
                  src="/images/indian-institute-of-technology-roorkee-logo.png"
                  alt="IIT Roorkee"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain p-1"
                  unoptimized
                />
              </div>
              <p
                className="text-[11px] font-medium tracking-[0.16em] uppercase mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Education
              </p>
              <h3
                className="font-display font-semibold text-lg leading-snug tracking-[-0.02em]"
                style={{ color: 'var(--text-primary)' }}
              >
                {education.institution}
              </h3>
              <p className="font-serif italic text-sm mt-2" style={{ color: 'var(--accent-ink)' }}>
                {education.degree}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {education.period} · {education.location}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {education.coursework.map((course) => (
                  <span key={course} className="about-badge">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'var(--divider)' }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="px-6 py-6 text-left"
              style={{ background: 'var(--bg-section)' }}
            >
              <p
                className="font-display font-bold tracking-[-0.04em] leading-none"
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                  color: 'var(--text-primary)',
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-serif italic text-sm mt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
