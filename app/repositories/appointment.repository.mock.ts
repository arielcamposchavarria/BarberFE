import type { AppointmentRepository } from './appointment.repository'
import { seedAppointments } from '~/data/seed-appointments'
import { todayISODate } from '~/utils/datetime'
import { delay, generateId } from './shared'

const appointments = [...seedAppointments]

export const appointmentRepositoryMock: AppointmentRepository = {
  async listByBarber(barberId, status) {
    await delay()
    return appointments.filter(appointment => appointment.barberId === barberId && (!status || appointment.status === status))
  },

  async listByClient(clientId, status) {
    await delay()
    return appointments.filter(appointment => appointment.clientId === clientId && (!status || appointment.status === status))
  },

  async getById(id) {
    await delay()
    return appointments.find(appointment => appointment.id === id) ?? null
  },

  async create(data) {
    await delay()
    const appointment: typeof appointments[number] = { ...data, id: generateId('appt'), status: 'pending', createdAt: todayISODate() }
    appointments.push(appointment)
    return appointment
  },

  async updateStatus(id, status, rejectionMessage) {
    await delay()
    const index = appointments.findIndex(candidate => candidate.id === id)
    const current = appointments[index]
    if (!current) throw new Error(`Appointment ${id} not found`)
    const updated = { ...current, status, ...(rejectionMessage !== undefined ? { rejectionMessage } : {}) }
    appointments[index] = updated
    return updated
  }
}
