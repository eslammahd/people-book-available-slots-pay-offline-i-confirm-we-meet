import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, slots(slot_date, slot_time, duration_minutes)')
    .order('created_at', { ascending: false })

  return <DashboardClient bookings={bookings ?? []} />
}
