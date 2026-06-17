import { defineStore } from 'pinia'
import type { AccountStatus, Barber } from '~/types'
import { createBarber, getBarberByUserId, listBarbersByBarbershop, setBarberStatus, updateBarberProfile, type CreateBarberInput } from '~/services/barber.service'

export const useBarbersStore = defineStore('barbers', {
  state: () => ({
    items: [] as Barber[],
    currentBarber: null as Barber | null,
    isLoading: false
  }),

  actions: {
    async fetchByBarbershop(barbershopId: string) {
      this.isLoading = true
      try {
        this.items = await listBarbersByBarbershop(barbershopId)
      } finally {
        this.isLoading = false
      }
    },

    async fetchCurrentByUserId(userId: string) {
      this.currentBarber = await getBarberByUserId(userId)
      return this.currentBarber
    },

    async create(data: CreateBarberInput) {
      const barber = await createBarber(data)
      this.items.push(barber)
      return barber
    },

    async updateProfile(id: string, data: Parameters<typeof updateBarberProfile>[1]) {
      const updated = await updateBarberProfile(id, data)
      const index = this.items.findIndex(barber => barber.id === id)
      if (index !== -1) this.items[index] = updated
      if (this.currentBarber?.id === id) this.currentBarber = updated
      return updated
    },

    async setStatus(id: string, status: AccountStatus) {
      await setBarberStatus(id, status)
      const barber = this.items.find(candidate => candidate.id === id)
      if (barber) barber.status = status
    }
  }
})
