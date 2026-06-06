import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const { bookingId } = await params
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, slots(slot_date, slot_time, duration_minutes)')
    .eq('id', bookingId)
    .single()

  if (!booking) notFound()

  const slot = booking.slots as { slot_date: string; slot_time: string; duration_minutes: number }
  const formattedDate = new Date(slot.slot_date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <nav className="px-6 py-4 border-b border-sky-100">
        <a href="/" className="text-xl font-bold text-sky-700">Dr. Saad Therapy</a>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h1>
          <p className="text-slate-500 mt-2">Your session has been reserved.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="bg-sky-600 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Session Details</h2>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Patient</span>
              <span className="font-medium text-slate-800">{booking.patient_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-800">{booking.patient_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium text-slate-800">{booking.patient_phone}</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between">
              <span className="text-slate-500">Date</span>
              <span className="font-medium text-slate-800">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Time</span>
              <span className="font-medium text-slate-800">{slot.slot_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Duration</span>
              <span className="font-medium text-slate-800">{slot.duration_minutes} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Payment Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-green-800 text-lg mb-3">💳 Payment Instructions</h3>
          <p className="text-green-700 mb-4">Please send your session fee via Vodafone Cash to confirm your booking:</p>
          <div className="bg-white rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Send to</span>
              <span className="font-bold text-slate-800 text-lg">01X-XXX-XXXX</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Amount</span>
              <span className="font-bold text-sky-700 text-lg">XXX EGP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Reference</span>
              <span className="font-mono text-xs text-slate-600">{bookingId.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-3">Dr. Saad will confirm your session once payment is received.</p>
        </div>

        <Link href="/" className="block text-center text-sky-600 hover:text-sky-700 font-medium">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
