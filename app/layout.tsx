import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Saad Therapy Booking',
  description: 'Book a therapy session with Dr. Saad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
