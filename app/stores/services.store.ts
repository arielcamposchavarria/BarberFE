import { defineStore } from 'pinia'
import type { Service } from '~/types'
import { createService, listServicesByBarber, removeService, updateService, type CreateServiceInput, type UpdateServiceInput } from '~/services/service.service'

export const useServicesStore = defineStore('services', {
  state: () => ({
    items: [] as Service[],
    isLoading: false
  }),

  actions: {
    async fetchByBarber(barberId: string) {
      this.isLoading = true
      try {
        this.items = await listServicesByBarber(barberId)
      } finally {
        this.isLoading = false
      }
    },

    async create(data: CreateServiceInput) {
      const service = await createService(data)
      this.items.push(service)
      return service
    },

    async update(id: string, data: UpdateServiceInput) {
      const updated = await updateService(id, data)
      const index = this.items.findIndex(service => service.id === id)
      if (index !== -1) this.items[index] = updated
      return updated
    },

    async remove(id: string) {
      await removeService(id)
      this.items = this.items.filter(service => service.id !== id)
    }
  }
})
