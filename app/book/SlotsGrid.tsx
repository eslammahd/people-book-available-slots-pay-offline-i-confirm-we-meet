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

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:${m} ${ampm}`
}

export default function SlotsGrid({ slots }: { slots: Slot[] }) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set())

  // Group by date
  const grouped: Record<string, Slot[]> = {}
  for (const slot of slots) {
    if (bookedIds.has(slot.id)) continue
    if (!grouped[slot.slot_date]) grouped[slot.slot_date] = []
    grouped[slot.slot_date].push(slot)
  }

  const dates = Object.keys(grouped).sort()

  if (dates.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">No available slots at the moment.</p>
        <p className="text-sm mt-2">Please check back soon.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        {dates.map((date) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-teal-700 mb-3 border-b border-teal-100 pb-2">
              {formatDate(date)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {grouped[date].map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className="bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 rounded-xl px-4 py-3 text-center transition cursor-pointer shadow-sm"
                >
                  <div className="text-teal-700 font-semibold text-sm">{formatTime(slot.slot_time)}</div>
                  <div className="text-gray-400 text-xs mt-1">{slot.duration_minutes} min</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onBooked={(id) => {
            setBookedIds((prev) => new Set([...prev, id]))
            setSelectedSlot(null)
          }}
        />
      )}
    </>
  )
}
