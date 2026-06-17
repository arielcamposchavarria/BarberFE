import type { ReviewRepository } from './review.repository'
import { seedReviews } from '~/data/seed-reviews'
import { todayISODate } from '~/utils/datetime'
import { delay, generateId } from './shared'

const reviews = [...seedReviews]

export const reviewRepositoryMock: ReviewRepository = {
  async listByBarber(barberId) {
    await delay()
    return reviews.filter(review => review.barberId === barberId)
  },

  async getByAppointment(appointmentId) {
    await delay()
    return reviews.find(review => review.appointmentId === appointmentId) ?? null
  },

  async create(data) {
    await delay()
    const review = { ...data, id: generateId('review'), createdAt: todayISODate() }
    reviews.push(review)
    return review
  }
}
