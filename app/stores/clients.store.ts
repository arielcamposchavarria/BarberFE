import { defineStore } from 'pinia'
import type { AccountStatus, Client } from '~/types'
import { getClientByUserId, listClients, registerClient, setClientStatus, updateClientProfile, type RegisterClientInput } from '~/services/client.service'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    items: [] as Client[],
    currentClient: null as Client | null,
    isLoading: false
  }),

  actions: {
    async fetchAll() {
      this.isLoading = true
      try {
        this.items = await listClients()
      } finally {
        this.isLoading = false
      }
    },

    async fetchCurrentByUserId(userId: string) {
      this.currentClient = await getClientByUserId(userId)
      return this.currentClient
    },

    async register(data: RegisterClientInput) {
      const client = await registerClient(data)
      this.items.push(client)
      this.currentClient = client
      return client
    },

    async updateProfile(id: string, data: Parameters<typeof updateClientProfile>[1]) {
      const updated = await updateClientProfile(id, data)
      const index = this.items.findIndex(client => client.id === id)
      if (index !== -1) this.items[index] = updated
      if (this.currentClient?.id === id) this.currentClient = updated
      return updated
    },

    async setStatus(id: string, status: AccountStatus) {
      await setClientStatus(id, status)
      const client = this.items.find(candidate => candidate.id === id)
      if (client) client.status = status
    }
  }
})
