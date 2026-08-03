import type { Metadata } from 'next'
import { Bricolage_Grotesque, Fraunces } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const siteUrl = 'https://mohitadoni.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mohit Adoni — Full-Stack & Agentic AI Developer',
    template: '%s · Mohit Adoni',
  },
  description:
    'Portfolio of Mohit Adoni, Full-Stack & Agentic AI Developer from IIT Roorkee. Building with Go, React, TypeScript, LangChain, and production AI systems.',
  keywords: [
    'Mohit Adoni',
    'Full Stack Developer',
    'Agentic AI Developer',
    'IIT Roorkee',
    'Go Developer',
    'React Developer',
    'TypeScript',
    'LangChain',
    'Portfolio',
    'Software Engineer India',
    'AI Engineer',
  ],
  authors: [{ name: 'Mohit Adoni', url: siteUrl }],
  creator: 'Mohit Adoni',
  publisher: 'Mohit Adoni',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'Mohit Adoni — Full-Stack & Agentic AI Developer',
    description:
      'Full-Stack & Agentic AI Developer from IIT Roorkee. Go, React, TypeScript, LangChain.',
    siteName: 'Mohit Adoni',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Mohit Adoni',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohit Adoni — Full-Stack & Agentic AI Developer',
    description:
      'Full-Stack & Agentic AI Developer from IIT Roorkee. Go, React, TypeScript, LangChain.',
    creator: '@mohitadoni',
    images: ['/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${bricolage.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
