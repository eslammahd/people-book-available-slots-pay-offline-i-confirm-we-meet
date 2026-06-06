import { createClient } from '@/lib/supabase/server'
import type { Slot } from '@/lib/types'
import BookingGrid from './BookingGrid'

export const revalidate = 0

export default async function BookPage() {
  const supabase = await createClient()

  const { data: slots, error } = await supabase
    .from('slots')
    .select('*')
    .eq('is_available', true)
    .gte('slot_date', new Date().toISOString().split('T')[0])
    .order('slot_date', { ascending: true })
    .order('slot_time', { ascending: true })

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-red-500">Unable to load available slots. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Available Sessions</h1>
        <p className="text-slate-500">Choose a slot that works for you and fill in your details.</p>
      </div>
      <BookingGrid slots={(slots as Slot[]) ?? []} />
    </div>
  )
}
