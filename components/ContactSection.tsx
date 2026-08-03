'use client'

import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import ProfileCard from '@/components/ProfileCard'
import SectionHeading from '@/components/SectionHeading'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <div className="section-container relative z-10">
        <div className="mb-16">
          <SectionHeading index="06" eyebrow="Let's connect" title="Get in" italicWord="touch" />
          <p
            className="prose-body max-w-xl text-base -mt-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            I&apos;m open to full-time roles, internships, and interesting projects.
            Feel free to reach out — I&apos;d love to chat!
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <ProfileCard enlarged />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { icon: FiMail, label: 'mohit_a@mt.iitr.ac.in', href: 'mailto:mohit_a@mt.iitr.ac.in' },
            { icon: FiGithub, label: 'github.com/genosis18m', href: 'https://github.com/genosis18m' },
            {
              icon: FiLinkedin,
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/mohit-adoni-a65b42284/',
            },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 px-5 py-3 transition-colors duration-300"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bg-card-border)',
                color: 'var(--text-secondary)',
                borderRadius: '2px',
              }}
            >
              <Icon size={18} style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {label}
              </span>
            </a>
          ))}
        </div>

        <div
          className="pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--divider)' }}
        >
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 Mohit Adoni · Built with Next.js + TypeScript
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Open to opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
