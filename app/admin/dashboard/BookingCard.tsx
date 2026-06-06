'use client'

import { useState } from 'react'
import type { Booking } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface Props {
  booking: Booking
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(timeStr?: string) {
  if (!timeStr) return '—'
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${display}:${m} ${ampm}`
}

const STATUS_CONFIG: Record<string, { label: string; color: string; next: string; nextLabel: string }> = {
  pending: { label: '⏳ Pending', color: 'bg-amber-50 text-amber-700 border-amber-200', next: 'paid', nextLabel: 'Mark as Paid' },
  paid: { label: '✅ Paid', color: 'bg-green-50 text-green-700 border-green-200', next: 'complete', nextLabel: 'Mark as Complete' },
  complete: { label: '🎉 Complete', color: 'bg-brand-50 text-brand-700 border-brand-200', next: 'pending', nextLabel: 'Reset to Pending' },
}

export default function BookingCard({ booking }: Props) {
  const [status, setStatus] = useState(booking.payment_status)
  const [loading, setLoading] = useState(false)
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending

  async function cycleStatus() {
    setLoading(true)
    const supabase = createClient()
    const nextStatus = cfg.next
    await supabase.from('bookings').update({ payment_status: nextStatus }).eq('id', booking.id)
    setStatus(nextStatus)
    setLoading(false)
  }

  const slot = booking.slot as { slot_date?: string; slot_time?: string } | undefined

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-slate-800">{booking.patient_name}</h3>
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Email</span>
              <span className="text-slate-700">{booking.patient_email}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Phone</span>
              <span className="text-slate-700">{booking.patient_phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Date</span>
              <span className="text-slate-700">{formatDate(slot?.slot_date)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Time</span>
              <span className="text-slate-700">{formatTime(slot?.slot_time)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={cycleStatus}
          disabled={loading}
          className="shrink-0 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? '…' : cfg.nextLabel}
        </button>
      </div>
    </div>
  )
}
