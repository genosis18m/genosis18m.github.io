interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  italicWord?: string
  align?: 'left' | 'center'
}

/**
 * Shared section title: index + hairline + mixed display/serif hierarchy.
 * No gradient / paint-colored type.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  italicWord,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <header
      className={`mb-14 ${centered ? 'text-center' : 'text-left'}`}
    >
      <div
        className={`mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      >
        <span
          className="font-serif text-sm italic tabular-nums"
          style={{ color: 'var(--text-muted)' }}
        >
          {index}
        </span>
        <span
          className="h-px w-10 sm:w-14"
          style={{ background: 'var(--divider)' }}
          aria-hidden
        />
        <p
          className="text-[11px] font-medium tracking-[0.18em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
        >
          {eyebrow}
        </p>
      </div>

      <h2
        className="font-display font-bold leading-[1.05] tracking-[-0.03em]"
        style={{
          fontSize: 'clamp(2.1rem, 5.2vw, 3.6rem)',
          color: 'var(--text-primary)',
        }}
      >
        {title}
        {italicWord ? (
          <>
            {' '}
            <em
              className="font-serif italic font-medium tracking-normal"
              style={{ color: 'var(--text-primary)' }}
            >
              {italicWord}
            </em>
          </>
        ) : null}
      </h2>

      <div
        className={`mt-6 h-px ${centered ? 'mx-auto' : ''}`}
        style={{
          width: centered ? 'min(12rem, 40%)' : 'min(8rem, 30%)',
          background:
            'linear-gradient(90deg, var(--text-muted), transparent)',
          opacity: 0.55,
        }}
        aria-hidden
      />
    </header>
  )
}
