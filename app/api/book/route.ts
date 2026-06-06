import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; phone?: string; slotId?: string }
  const { name, email, phone, slotId } = body

  if (!name || !email || !phone || !slotId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: patient, error: patientErr } = await supabase
    .from('patients')
    .insert({ name, email, phone })
    .select('id')
    .single()

  if (patientErr || !patient) {
    return NextResponse.json({ error: 'Failed to save patient: ' + (patientErr?.message ?? 'unknown') }, { status: 500 })
  }

  const { data: booking, error: bookingErr } = await supabase
    .from('bookings')
    .insert({ slot_id: slotId, patient_id: patient.id, patient_name: name, patient_email: email, patient_phone: phone, payment_status: 'pending' })
    .select('id')
    .single()

  if (bookingErr || !booking) {
    return NextResponse.json({ error: 'Failed to create booking: ' + (bookingErr?.message ?? 'unknown') }, { status: 500 })
  }

  await supabase.from('slots').update({ is_available: false }).eq('id', slotId)

  return NextResponse.json({ bookingId: booking.id })
}
