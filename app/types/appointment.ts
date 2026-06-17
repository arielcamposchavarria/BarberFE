export type AppointmentStatus = 'pending' | 'accepted' | 'rejected' | 'completed'

export interface Appointment {
  id: string
  clientId: string
  barberId: string
  serviceId: string
  date: string
  startMinutes: number
  /** Snapshot of the service's duration at request time, so later price/duration edits don't retroactively change booked slots. */
  durationMinutes: number
  status: AppointmentStatus
  rejectionMessage?: string
  createdAt: string
}
