export default function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohit Adoni',
    url: 'https://mohitadoni.dev',
    image: 'https://mohitadoni.dev/avatar.jpg',
    jobTitle: 'Full-Stack & Agentic AI Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Roorkee',
    },
    sameAs: [
      'https://github.com/genosis18m',
      'https://www.linkedin.com/in/mohit-adoni-a65b42284/',
    ],
    email: 'mailto:mohit_a@mt.iitr.ac.in',
    knowsAbout: [
      'Full-stack development',
      'Go',
      'React',
      'TypeScript',
      'Agentic AI',
      'LangChain',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mohit Adoni',
    url: 'https://mohitadoni.dev',
    description:
      'Portfolio of Mohit Adoni, Full-Stack & Agentic AI Developer from IIT Roorkee.',
    author: { '@id': 'https://mohitadoni.dev/#person' },
  }

  const personWithId = { ...person, '@id': 'https://mohitadoni.dev/#person' }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personWithId) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
