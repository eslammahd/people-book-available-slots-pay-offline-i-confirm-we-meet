import Link from 'next/link'

interface Props {
  params: { bookingId: string }
  searchParams: { name?: string; date?: string; time?: string; duration?: string }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr?: string) {
  if (!timeStr) return '—'
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${display}:${m} ${ampm}`
}

export default function ConfirmationPage({ params, searchParams }: Props) {
  const { bookingId } = params
  const { name, date, time, duration } = searchParams

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Success banner */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500">Your session has been reserved. Complete your payment to secure the slot.</p>
      </div>

      {/* Booking summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-6">Booking Summary</h2>
        <dl className="space-y-4">
          <div className="flex justify-between">
            <dt className="text-slate-500">Patient Name</dt>
            <dd className="font-medium text-slate-800">{name ?? '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Session Date</dt>
            <dd className="font-medium text-slate-800">{formatDate(date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Session Time</dt>
            <dd className="font-medium text-slate-800">{formatTime(time)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Duration</dt>
            <dd className="font-medium text-slate-800">{duration ?? 60} minutes</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Booking ID</dt>
            <dd className="font-mono text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">{bookingId}</dd>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <dt className="text-slate-500">Payment Status</dt>
            <dd>
              <span className="inline-flex items-center bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full border border-amber-200">
                ⏳ Pending Payment
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Payment instructions */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">💳 Payment Instructions</h2>
        <p className="text-slate-600 mb-6">
          Please send the session fee via <strong>Vodafone Cash</strong> to complete your booking.
          Dr. Saad will confirm once payment is received.
        </p>
        <div className="bg-white rounded-xl border border-brand-100 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Send to (Vodafone Cash)</span>
            <span className="font-bold text-brand-700 text-lg tracking-wide">01X XXX XXXX</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Amount</span>
            <span className="font-bold text-slate-800 text-lg">To be confirmed</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Reference</span>
            <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
              {bookingId.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          After sending payment, Dr. Saad will reach out to confirm your session within 24 hours.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
