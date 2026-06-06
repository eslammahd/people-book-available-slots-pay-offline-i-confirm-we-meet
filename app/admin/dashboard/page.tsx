import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Booking } from '@/lib/types'
import BookingCard from './BookingCard'
import LogoutButton from './LogoutButton'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, slot:slots(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments Dashboard</h1>
          <p className="text-slate-500 mt-1">{bookings?.length ?? 0} total bookings</p>
        </div>
        <LogoutButton />
      </div>

      {!bookings?.length ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-lg">No bookings yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {(bookings as Booking[]).map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}
