import Link from 'next/link'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:${m} ${ampm}`
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { bookingId?: string; name?: string; date?: string; time?: string; duration?: string }
}) {
  const { bookingId, name, date, time, duration } = searchParams

  if (!bookingId) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500">No booking found.</p>
          <Link href="/book" className="text-teal-600 hover:underline mt-4 inline-block">Book a session</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="bg-teal-600 text-white rounded-2xl px-6 py-8 text-center mb-6 shadow-lg">
          <div className="text-5xl mb-3">&#10003;</div>
          <h1 className="text-2xl font-bold mb-1">Booking Confirmed!</h1>
          <p className="text-teal-100 text-sm">Your session has been reserved. Please complete payment to secure your spot.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Booking Details</h2>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Patient</dt><dd className="font-medium text-gray-900">{name ?? '&mdash;'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Date</dt><dd className="font-medium text-gray-900">{date ? formatDate(date) : '&mdash;'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Time</dt><dd className="font-medium text-gray-900">{time ? formatTime(time) : '&mdash;'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Duration</dt><dd className="font-medium text-gray-900">{duration ?? '60'} minutes</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Booking ID</dt><dd className="font-mono text-xs text-gray-500 break-all">{bookingId}</dd></div>
          </dl>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-amber-900 mb-3">&#128179; Payment Instructions</h2>
          <p className="text-amber-800 text-sm mb-4">Please send the session fee via <strong>Vodafone Cash</strong> to secure your booking:</p>
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Vodafone Cash Number</span><span className="font-bold text-gray-900">010 XXXX XXXX</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-bold text-gray-900">XXX EGP</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Reference</span><span className="font-mono text-xs text-gray-600">{bookingId.slice(0, 8).toUpperCase()}</span></div>
          </div>
          <p className="text-amber-700 text-xs mt-3">After payment, Dr. Saad will confirm your session via phone or email within 24 hours.</p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-teal-600 hover:underline text-sm">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
