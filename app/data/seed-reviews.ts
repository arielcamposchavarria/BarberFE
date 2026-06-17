import type { Review } from '~/types'
import { isoDateFromToday } from '~/utils/datetime'

export const seedReviews: Review[] = [
  {
    id: 'review-1',
    appointmentId: 'appt-3',
    clientId: 'client-1',
    barberId: 'barber-3',
    rating: 5,
    comment: 'Excelente corte, muy puntual y profesional.',
    createdAt: isoDateFromToday(-3)
  }
]
