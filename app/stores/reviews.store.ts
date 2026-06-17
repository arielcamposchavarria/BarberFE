import { defineStore } from 'pinia'
import type { Review } from '~/types'
import { listReviewsByBarber, submitReview } from '~/services/review.service'

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    items: [] as Review[],
    isLoading: false
  }),

  getters: {
    averageRating: (state): number | null => state.items.length === 0
      ? null
      : state.items.reduce((sum, review) => sum + review.rating, 0) / state.items.length
  },

  actions: {
    async fetchByBarber(barberId: string) {
      this.isLoading = true
      try {
        this.items = await listReviewsByBarber(barberId)
      } finally {
        this.isLoading = false
      }
    },

    async submit(data: Parameters<typeof submitReview>[0]) {
      const review = await submitReview(data)
      this.items.push(review)
      return review
    }
  }
})
