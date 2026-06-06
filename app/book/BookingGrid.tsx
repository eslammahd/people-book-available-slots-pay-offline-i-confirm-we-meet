'use client'

import { useState } from 'react'
import type { Slot } from '@/lib/types'
import BookingModal from './BookingModal'

interface Props {
  slots: Slot[]
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

export default function BookingGrid({ slots }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  if (!slots.length) {
    return (
      <div className="text-center py-20 text-slate-500">
        <div className="text-5xl mb-4">📅</div>
        <p className="text-lg font-medium">No available slots at the moment.</p>
        <p className="text-sm mt-2">Please check back soon.</p>
      </div>
    )
  }

  // Group by date
  const grouped = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    if (!acc[slot.slot_date]) acc[slot.slot_date] = []
    acc[slot.slot_date].push(slot)
    return acc
  }, {})

  return (
    <>
      <div className="space-y-10">
        {Object.entries(grouped).map(([date, daySlots]) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-brand-700 mb-4 pb-2 border-b border-brand-100">
              {formatDate(date)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className="flex flex-col items-center justify-center bg-white border-2 border-brand-200 hover:border-brand-500 hover:bg-brand-50 rounded-xl p-4 transition-all group"
                >
                  <span className="text-xl font-bold text-brand-700 group-hover:text-brand-800">
                    {formatTime(slot.slot_time)}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">{slot.duration_minutes} min</span>
                  <span className="mt-2 text-xs font-medium text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                    Available
                  </span>
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
        />
      )}
    </>
  )
}
