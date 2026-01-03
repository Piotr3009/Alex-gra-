import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Joinery Core | The Intelligent OS for Modern Joinery Workshops',
  description: 'Stop relying on spreadsheets and whiteboards. Unify production, stock, team, and finances in one platform. The complete workshop management solution for joinery businesses.',
  keywords: ['joinery', 'workshop management', 'production scheduling', 'inventory management', 'joinery software'],
  authors: [{ name: 'Skylon Development LTD' }],
  openGraph: {
    title: 'Joinery Core | The Intelligent OS for Modern Joinery Workshops',
    description: 'Stop relying on spreadsheets and whiteboards. Unify production, stock, team, and finances in one platform.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Joinery Core',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joinery Core | The Intelligent OS for Modern Joinery Workshops',
    description: 'Stop relying on spreadsheets and whiteboards. Unify production, stock, team, and finances in one platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative z-10 bg-gradient-base min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
