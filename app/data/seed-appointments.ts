import type { Appointment } from '~/types'
import { isoDateFromToday } from '~/utils/datetime'

export const seedAppointments: Appointment[] = [
  {
    id: 'appt-1',
    clientId: 'client-1',
    barberId: 'barber-1',
    serviceId: 'svc-1',
    date: isoDateFromToday(2),
    startMinutes: 600,
    durationMinutes: 30,
    status: 'accepted',
    createdAt: isoDateFromToday(-1)
  },
  {
    id: 'appt-2',
    clientId: 'client-2',
    barberId: 'barber-1',
    serviceId: 'svc-2',
    date: isoDateFromToday(3),
    startMinutes: 900,
    durationMinutes: 45,
    status: 'pending',
    createdAt: isoDateFromToday(0)
  },
  {
    id: 'appt-3',
    clientId: 'client-1',
    barberId: 'barber-3',
    serviceId: 'svc-4',
    date: isoDateFromToday(-3),
    startMinutes: 540,
    durationMinutes: 35,
    status: 'completed',
    createdAt: isoDateFromToday(-5)
  },
  {
    id: 'appt-4',
    clientId: 'client-2',
    barberId: 'barber-2',
    serviceId: 'svc-3',
    date: isoDateFromToday(1),
    startMinutes: 660,
    durationMinutes: 40,
    status: 'rejected',
    rejectionMessage: 'Tuve una emergencia ese día, por favor agenda otra fecha u hora.',
    createdAt: isoDateFromToday(-1)
  }
]
