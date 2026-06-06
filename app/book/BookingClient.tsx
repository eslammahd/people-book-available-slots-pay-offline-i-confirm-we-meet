'use client'

import { useState } from 'react'
import BookingModal from './BookingModal'

type Slot = {
  id: string
  slot_date: string
  slot_time: string
  duration_minutes: number
  is_available: boolean
}

function groupByDate(slots: Slot[]) {
  return slots.reduce((acc, slot) => {
    if (!acc[slot.slot_date]) acc[slot.slot_date] = []
    acc[slot.slot_date].push(slot)
    return acc
  }, {} as Record<string, Slot[]>)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function BookingClient({ slots }: { slots: Slot[] }) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const grouped = groupByDate(slots)
  const dates = Object.keys(grouped).sort()

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-sky-100">
        <a href="/" className="text-xl font-bold text-sky-700">Dr. Saad Therapy</a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Available Sessions</h1>
        <p className="text-slate-500 mb-10">Select a time slot to book your therapy session.</p>

        {dates.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No available slots right now.</p>
            <p className="text-sm mt-2">Please check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {dates.map((date) => (
              <div key={date}>
                <h2 className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                  {formatDate(date)}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {grouped[date].map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className="bg-white border-2 border-sky-200 hover:border-sky-500 hover:bg-sky-50 rounded-xl p-4 text-left transition-all group"
                    >
                      <div className="text-lg font-bold text-slate-800">{slot.slot_time}</div>
                      <div className="text-xs text-slate-400 mt-1">{slot.duration_minutes} min session</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </main>
  )
}
