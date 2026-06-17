import type { Review } from '~/types'

export interface ReviewRepository {
  listByBarber(barberId: string): Promise<Review[]>
  getByAppointment(appointmentId: string): Promise<Review | null>
  create(data: Omit<Review, 'id' | 'createdAt'>): Promise<Review>
}
