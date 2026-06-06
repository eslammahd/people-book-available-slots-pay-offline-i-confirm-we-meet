'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

type Slot = { id: string; slot_date: string; slot_time: string; is_available: boolean; duration_minutes: number }

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function groupByDate(slots: Slot[]) {
  return slots.reduce((acc, s) => {
    if (!acc[s.slot_date]) acc[s.slot_date] = []
    acc[s.slot_date].push(s)
    return acc
  }, {} as Record<string, Slot[]>)
}

export default function SettingsClient({ slots: initial }: { slots: Slot[] }) {
  const [slots, setSlots] = useState(initial)
  const [toggling, setToggling] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function toggleAvailability(slotId: string, current: boolean) {
    setToggling(slotId)
    const { error } = await supabase.from('slots').update({ is_available: !current }).eq('id', slotId)
    if (!error) setSlots((prev) => prev.map((s) => s.id === slotId ? { ...s, is_available: !current } : s))
    setToggling(null)
  }

  const grouped = groupByDate(slots)
  const sortedDates = Object.keys(grouped).sort()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Slot Settings</h1>
          <p className="text-sm text-slate-500">Manage your availability</p>
        </div>
        <Link href="/admin/dashboard" className="text-sm text-sky-600 hover:text-sky-700 px-3 py-1.5 rounded-lg hover:bg-sky-50">← Dashboard</Link>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-8 text-sm text-sky-700">
          Click any slot to toggle its availability. Unavailable slots won&apos;t show on the booking page.
        </div>
        {slots.length === 0 ? (
          <div className="text-center py-20 text-slate-400"><p>No upcoming slots found.</p></div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{formatDate(date)}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {grouped[date].map((slot) => (
                    <button key={slot.id} onClick={() => toggleAvailability(slot.id, slot.is_available)} disabled={toggling === slot.id}
                      className={`rounded-xl p-4 text-left border-2 transition-all disabled:opacity-50 ${
                        slot.is_available ? 'bg-white border-green-300 hover:border-green-500' : 'bg-slate-100 border-slate-200 hover:border-slate-400'
                      }`}>
                      <div className={`text-lg font-bold ${slot.is_available ? 'text-slate-800' : 'text-slate-400'}`}>{slot.slot_time}</div>
                      <div className={`text-xs mt-1 font-medium ${slot.is_available ? 'text-green-600' : 'text-slate-400'}`}>
                        {toggling === slot.id ? 'Updating...' : slot.is_available ? 'Available' : 'Unavailable'}
                      </div>
                    </button>
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
