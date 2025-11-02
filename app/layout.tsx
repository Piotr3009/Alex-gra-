import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2D Boxing Game',
  description: 'Multiplayer 2D boxing game for two players',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
