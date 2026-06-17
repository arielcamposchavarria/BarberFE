import { defineStore } from 'pinia'
import type { Barbershop } from '~/types'
import { createBarbershop, listBarbershops, setBarbershopStatus, updateBarbershop, type CreateBarbershopInput, type UpdateBarbershopInput } from '~/services/barbershop.service'

export const useBarbershopsStore = defineStore('barbershops', {
  state: () => ({
    items: [] as Barbershop[],
    isLoading: false
  }),

  getters: {
    activeOnly: state => state.items.filter(shop => shop.status === 'active')
  },

  actions: {
    async fetchAll() {
      this.isLoading = true
      try {
        this.items = await listBarbershops()
      } finally {
        this.isLoading = false
      }
    },

    async create(data: CreateBarbershopInput) {
      const shop = await createBarbershop(data)
      this.items.push(shop)
      return shop
    },

    async update(id: string, data: UpdateBarbershopInput) {
      const updated = await updateBarbershop(id, data)
      const index = this.items.findIndex(shop => shop.id === id)
      if (index !== -1) this.items[index] = updated
      return updated
    },

    async toggleStatus(id: string) {
      const shop = this.items.find(candidate => candidate.id === id)
      if (!shop) return
      const nextStatus = shop.status === 'active' ? 'inactive' : 'active'
      await setBarbershopStatus(id, nextStatus)
      shop.status = nextStatus
    }
  }
})
