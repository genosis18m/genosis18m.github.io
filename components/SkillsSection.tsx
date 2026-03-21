'use client'

import { FaCode, FaBrain, FaGlobe, FaCubes } from 'react-icons/fa'

const skillGroups = [
  {
    category: 'Languages',
    icon: <FaCode />,
    color: '#3B82F6',
    skills: ['Go', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash', 'LaTeX'],
  },
  {
    category: 'AI / ML',
    icon: <FaBrain />,
    color: '#8B5CF6',
    skills: ['LangChain', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'YOLO', 'RAG'],
  },
  {
    category: 'Full Stack',
    icon: <FaGlobe />,
    color: '#10B981',
    skills: ['Next.js', 'React', 'Node.js', 'Flask', 'Streamlit', 'Gin', 'FastAPI'],
  },
  {
    category: 'DevOps',
    icon: <FaCubes />,
    color: '#F97316',
    skills: ['Git', 'Docker', 'Linux', 'Redis', 'Postman', 'CI/CD'],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="text-xs font-display font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#10B981' }}
          >
            Expertise
          </p>
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}
          >
            Technical{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {skillGroups.map((group, groupIdx) => (
            <div
              key={group.category}
              className="skill-card group"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${group.color}22`,
                animationDelay: `${groupIdx * 0.1}s`,
              }}
            >
              {/* Heading (First Content) */}
              <div className="skill-first-content p-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-2 drop-shadow-md"
                  style={{ background: 'transparent', color: group.color }}
                >
                  {group.icon}
                </div>
                <h3
                  className="font-display font-black text-2xl text-center tracking-wide"
                  style={{ color: group.color }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Detailing (Second Content) */}
              <div className="skill-second-content p-6" style={{ background: 'var(--bg-card-hover)' }}>
                <div className="flex flex-col gap-2 justify-center content-center w-full h-full text-center">
                  {group.skills.slice(0, 7).map((skill, i) => (
                    <span
                      key={skill}
                      className="text-xs font-bold tracking-widest transition-all duration-300 hover:scale-110 cursor-default"
                      style={{
                        color: 'var(--text-primary)',
                        opacity: 1 - (i * 0.1),
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {group.skills.length > 7 && (
                    <span className="text-[9px] uppercase tracking-widest font-semibold opacity-50 mt-1.5" style={{ color: group.color }}>
                      + {group.skills.length - 7} More
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
