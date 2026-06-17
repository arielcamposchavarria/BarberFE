import type { Review } from '~/types'
import { repositories } from '~/repositories'

export async function listReviewsByBarber(barberId: string): Promise<Review[]> {
  return repositories.review.listByBarber(barberId)
}

export async function getReviewForAppointment(appointmentId: string): Promise<Review | null> {
  return repositories.review.getByAppointment(appointmentId)
}

export async function submitReview(data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const appointment = await repositories.appointment.getById(data.appointmentId)
  if (!appointment) throw new Error('Cita no encontrada')
  if (appointment.status !== 'completed') throw new Error('Solo puedes calificar citas completadas')

  const existing = await repositories.review.getByAppointment(data.appointmentId)
  if (existing) throw new Error('Ya calificaste esta cita')

  return repositories.review.create(data)
}
