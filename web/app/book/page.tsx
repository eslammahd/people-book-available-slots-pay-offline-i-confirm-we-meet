import { createClient } from '@/lib/supabase/server'
import BookingClient from './BookingClient'

export default async function BookPage() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const future = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const { data: slots } = await supabase
    .from('slots')
    .select('*')
    .eq('is_available', true)
    .gte('slot_date', today)
    .lte('slot_date', future)
    .order('slot_date', { ascending: true })
    .order('slot_time', { ascending: true })
  return <BookingClient slots={slots ?? []} />
}
