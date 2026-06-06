import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Saad Therapy — Book Your Session',
  description: 'Book a confidential therapy session with Dr. Saad. Simple online booking, flexible payment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <nav className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="text-brand-700 font-semibold text-lg tracking-tight">
              Dr. Saad · Therapy
            </a>
            <a
              href="/book"
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Book a Session
            </a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-20 border-t border-slate-200 py-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Dr. Saad Therapy. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
