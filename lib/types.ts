export interface Slot {
  id: string
  slot_date: string
  slot_time: string
  is_available: boolean
  duration_minutes: number
  created_at: string
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
}

export interface Booking {
  id: string
  slot_id: string
  patient_id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  payment_status: string
  created_at: string
  slot?: Slot
}

export interface Profile {
  id: string
  is_admin: boolean
  created_at: string
}
