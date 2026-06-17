import { defineStore } from 'pinia'
import type { Appointment, AppointmentStatus } from '~/types'
import { acceptAppointment, completeAppointment, listAppointmentsForBarber, listAppointmentsForClient, rejectAppointment, requestAppointment, type RequestAppointmentInput } from '~/services/appointment.service'

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    items: [] as Appointment[],
    isLoading: false
  }),

  actions: {
    async fetchForBarber(barberId: string, status?: AppointmentStatus) {
      this.isLoading = true
      try {
        this.items = await listAppointmentsForBarber(barberId, status)
      } finally {
        this.isLoading = false
      }
    },

    async fetchForClient(clientId: string, status?: AppointmentStatus) {
      this.isLoading = true
      try {
        this.items = await listAppointmentsForClient(clientId, status)
      } finally {
        this.isLoading = false
      }
    },

    async request(input: RequestAppointmentInput) {
      const appointment = await requestAppointment(input)
      this.items.push(appointment)
      return appointment
    },

    async accept(id: string) {
      return this.applyUpdate(await acceptAppointment(id))
    },

    async reject(id: string, message: string) {
      return this.applyUpdate(await rejectAppointment(id, message))
    },

    async complete(id: string) {
      return this.applyUpdate(await completeAppointment(id))
    },

    applyUpdate(updated: Appointment) {
      const index = this.items.findIndex(appointment => appointment.id === updated.id)
      if (index !== -1) this.items[index] = updated
      return updated
    }
  }
})
