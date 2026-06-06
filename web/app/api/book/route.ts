import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  const { slotId, name, email, phone } = await request.json()
  if (!slotId || !name || !email || !phone) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(_: Array<{ name: string; value: string; options: CookieOptions }>) {},
      },
    }
  )
  const { data: slot } = await supabase.from('slots').select('id, is_available').eq('id', slotId).single()
  if (!slot) return NextResponse.json({ error: 'Slot not found.' }, { status: 404 })
  if (!slot.is_available) return NextResponse.json({ error: 'This slot is no longer available.' }, { status: 409 })
  const { data: patient } = await supabase.from('patients').insert({ name, email, phone }).select('id').single()
  if (!patient) return NextResponse.json({ error: 'Failed to save patient.' }, { status: 500 })
  const { data: booking } = await supabase.from('bookings').insert({
    slot_id: slotId, patient_id: patient.id,
    patient_name: name, patient_email: email, patient_phone: phone, payment_status: 'pending',
  }).select('id').single()
  if (!booking) return NextResponse.json({ error: 'Failed to create booking.' }, { status: 500 })
  await supabase.from('slots').update({ is_available: false }).eq('id', slotId)
  return NextResponse.json({ bookingId: booking.id })
}
