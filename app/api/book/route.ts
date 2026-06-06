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
        setAll(_cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {},
      },
    }
  )

  // Check slot is still available
  const { data: slot, error: slotError } = await supabase
    .from('slots')
    .select('id, is_available')
    .eq('id', slotId)
    .single()

  if (slotError || !slot) {
    return NextResponse.json({ error: 'Slot not found.' }, { status: 404 })
  }

  if (!slot.is_available) {
    return NextResponse.json({ error: 'This slot is no longer available.' }, { status: 409 })
  }

  // Insert patient
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .insert({ name, email, phone })
    .select('id')
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Failed to save patient details.' }, { status: 500 })
  }

  // Insert booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      slot_id: slotId,
      patient_id: patient.id,
      patient_name: name,
      patient_email: email,
      patient_phone: phone,
      payment_status: 'pending',
    })
    .select('id')
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Failed to create booking.' }, { status: 500 })
  }

  // Mark slot as unavailable
  await supabase
    .from('slots')
    .update({ is_available: false })
    .eq('id', slotId)

  return NextResponse.json({ bookingId: booking.id })
}
