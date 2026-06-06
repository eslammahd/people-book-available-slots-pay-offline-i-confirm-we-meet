import { supabase } from '@/lib/supabase'
import SlotsGrid from './SlotsGrid'

export const revalidate = 0

export default async function BookPage() {
  const today = new Date().toISOString().split('T')[0]
  const { data: slots } = await supabase
    .from('slots')
    .select('id, slot_date, slot_time, duration_minutes, is_available')
    .eq('is_available', true)
    .gte('slot_date', today)
    .order('slot_date', { ascending: true })
    .order('slot_time', { ascending: true })

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a href="/" className="text-teal-600 hover:underline text-sm">
            &larr; Back to Home
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Available Therapy Slots</h1>
          <p className="text-gray-500">Pick a time that works for you &mdash; sessions are 60 minutes each.</p>
        </div>
        <SlotsGrid slots={slots ?? []} />
      </div>
    </main>
  )
}
