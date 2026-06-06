'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Slot } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface Props {
  slot: Slot
  onClose: () => void
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${display}:${m} ${ampm}`
}

export default function BookingModal({ slot, onClose }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      // Insert patient
      const { data: patient, error: patientError } = await supabase
        .from('patients')
        .insert({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() })
        .select('id')
        .single()

      if (patientError || !patient) {
        throw new Error('Failed to save patient details.')
      }

      // Insert booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          slot_id: slot.id,
          patient_id: patient.id,
          patient_name: name.trim(),
          patient_email: email.trim().toLowerCase(),
          patient_phone: phone.trim(),
          payment_status: 'pending',
        })
        .select('id')
        .single()

      if (bookingError || !booking) {
        throw new Error('Failed to save booking.')
      }

      // Mark slot as unavailable
      await supabase
        .from('slots')
        .update({ is_available: false })
        .eq('id', slot.id)

      router.push(`/confirmation/${booking.id}?name=${encodeURIComponent(name)}&date=${slot.slot_date}&time=${slot.slot_time}&duration=${slot.duration_minutes}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Book Your Session</h2>
            <p className="text-sm text-brand-600 mt-0.5">
              {formatDate(slot.slot_date)} at {formatTime(slot.slot_time)} · {slot.duration_minutes} min
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 1XX XXX XXXX"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors mt-2"
          >
            {loading ? 'Confirming booking…' : 'Confirm Booking'}
          </button>
          <p className="text-xs text-center text-slate-400">
            By booking you agree to attend the session and complete payment via Vodafone Cash.
          </p>
        </form>
      </div>
    </div>
  )
}
