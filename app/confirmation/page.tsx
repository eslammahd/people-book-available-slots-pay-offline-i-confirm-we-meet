import Link from 'next/link'

type SearchParams = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

function formatDate(s: string) {
  return new Date(s + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

function formatTime(s: string) {
  const [h, m] = s.split(':')
  const hour = parseInt(h, 10)
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const p = await searchParams
  const bookingId = first(p.bookingId)
  const name = first(p.name)
  const date = first(p.date)
  const time = first(p.time)
  const duration = first(p.duration)

  if (!bookingId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-teal-50 px-6">
        <div className="text-center">
          <p className="text-gray-500">No booking found.</p>
          <Link href="/book" className="text-teal-600 underline mt-4 inline-block">Book a session</Link>
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
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Patient</dt><dd className="font-medium">{name ?? '—'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Date</dt><dd className="font-medium">{date ? formatDate(date) : '—'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Time</dt><dd className="font-medium">{time ? formatTime(time) : '—'}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Duration</dt><dd className="font-medium">{duration ?? '60'} minutes</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-gray-500">Booking ID</dt><dd className="font-mono text-xs text-gray-500 break-all">{bookingId}</dd></div>
          </dl>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-amber-900 mb-3">&#128179; Payment Instructions</h2>
          <p className="text-amber-800 text-sm mb-4">Send the session fee via <strong>Vodafone Cash</strong>:</p>
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Vodafone Cash Number</span><span className="font-bold">010 XXXX XXXX</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-bold">XXX EGP</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Reference</span><span className="font-mono text-xs">{bookingId.slice(0, 8).toUpperCase()}</span></div>
          </div>
          <p className="text-amber-700 text-xs mt-3">Dr. Saad will confirm within 24 hours after payment.</p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-teal-600 hover:underline text-sm">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
