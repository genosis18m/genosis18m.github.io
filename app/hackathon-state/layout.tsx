import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hackathon State',
  description: 'Private student hackathon tracker.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function HackathonStateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
