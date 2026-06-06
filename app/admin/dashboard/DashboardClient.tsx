'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

type Slot = { slot_date: string; slot_time: string; duration_minutes: number }
type Booking = {
  id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  payment_status: string
  created_at: string
  slots: Slot
}

const STATUS_CYCLE: Record<string, string> = {
  pending: 'paid',
  paid: 'complete',
  complete: 'pending',
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  complete: 'bg-green-100 text-green-800',
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function groupByDate(bookings: Booking[]) {
  return bookings.reduce((acc, b) => {
    const date = b.slots?.slot_date ?? 'Unknown'
    if (!acc[date]) acc[date] = []
    acc[date].push(b)
    return acc
  }, {} as Record<string, Booking[]>)
}

export default function DashboardClient({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState(initial)
  const [updating, setUpdating] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  async function toggleStatus(bookingId: string, currentStatus: string) {
    const nextStatus = STATUS_CYCLE[currentStatus] ?? 'pending'
    setUpdating(bookingId)

    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: nextStatus })
      .eq('id', bookingId)

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => b.id === bookingId ? { ...b, payment_status: nextStatus } : b)
      )
    }
    setUpdating(null)
  }

  const grouped = groupByDate(bookings)
  const sortedDates = Object.keys(grouped).sort()

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.payment_status === 'pending').length,
    paid: bookings.filter((b) => b.payment_status === 'paid').length,
    complete: bookings.filter((b) => b.payment_status === 'complete').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dr. Saad&apos;s Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="text-sm text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: counts.total, color: 'text-slate-800' },
            { label: 'Pending', value: counts.pending, color: 'text-yellow-600' },
            { label: 'Paid', value: counts.paid, color: 'text-blue-600' },
            { label: 'Complete', value: counts.complete, color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No bookings yet.</p>
            <p className="text-sm mt-2">Bookings will appear here once patients start booking sessions.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date}>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="bg-slate-200 rounded px-2 py-0.5">{formatDate(date)}</span>
                  <span className="text-slate-300">{grouped[date].length} booking{grouped[date].length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grouped[date].map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-slate-800">{booking.patient_name}</div>
                          <div className="text-sky-600 font-medium text-sm mt-0.5">{booking.slots?.slot_time}</div>
                        </div>
                        <button
                          onClick={() => toggleStatus(booking.id, booking.payment_status)}
                          disabled={updating === booking.id}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all hover:opacity-75 disabled:opacity-50 cursor-pointer ${STATUS_STYLES[booking.payment_status] ?? 'bg-slate-100 text-slate-600'}`}
                        >
                          {updating === booking.id ? '...' : booking.payment_status}
                        </button>
                      </div>
                      <div className="space-y-1 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {booking.patient_email}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          {booking.patient_phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
