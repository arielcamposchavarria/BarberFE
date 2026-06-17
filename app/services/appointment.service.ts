import type { Appointment, AppointmentStatus } from '~/types'
import { repositories } from '~/repositories'
import { getAvailableSlots, type Slot } from '~/utils/availability'

export interface RequestAppointmentInput {
  clientId: string
  barberId: string
  serviceId: string
  date: string
  startMinutes: number
}

export async function getSlotsForBarberOnDate(barberId: string, date: string, serviceDurationMinutes: number): Promise<Slot[]> {
  const [weeklyRules, exceptions, acceptedAppointments] = await Promise.all([
    repositories.availability.listWeeklyRules(barberId),
    repositories.availability.listExceptions(barberId),
    repositories.appointment.listByBarber(barberId, 'accepted')
  ])

  return getAvailableSlots({
    date,
    weeklyRules,
    exceptions,
    existingAppointments: acceptedAppointments,
    serviceDurationMinutes
  })
}

/** Re-validates the slot is still free right before creating, guarding against two clients racing for the same slot. */
export async function requestAppointment(input: RequestAppointmentInput): Promise<Appointment> {
  const service = await repositories.service.getById(input.serviceId)
  if (!service) throw new Error('Servicio no encontrado')

  const slots = await getSlotsForBarberOnDate(input.barberId, input.date, service.durationMinutes)
  const matchingSlot = slots.find(slot => slot.startMinutes === input.startMinutes)
  if (!matchingSlot || !matchingSlot.available) {
    throw new Error('Ese horario ya no está disponible')
  }

  return repositories.appointment.create({
    clientId: input.clientId,
    barberId: input.barberId,
    serviceId: input.serviceId,
    date: input.date,
    startMinutes: input.startMinutes,
    durationMinutes: service.durationMinutes
  })
}

export async function listAppointmentsForBarber(barberId: string, status?: AppointmentStatus): Promise<Appointment[]> {
  return repositories.appointment.listByBarber(barberId, status)
}

export async function listAppointmentsForClient(clientId: string, status?: AppointmentStatus): Promise<Appointment[]> {
  return repositories.appointment.listByClient(clientId, status)
}

export async function acceptAppointment(id: string): Promise<Appointment> {
  const appointment = await repositories.appointment.getById(id)
  if (!appointment) throw new Error('Cita no encontrada')
  if (appointment.status !== 'pending') throw new Error('Solo se pueden aceptar solicitudes pendientes')
  return repositories.appointment.updateStatus(id, 'accepted')
}

export async function rejectAppointment(id: string, message: string): Promise<Appointment> {
  const appointment = await repositories.appointment.getById(id)
  if (!appointment) throw new Error('Cita no encontrada')
  if (appointment.status !== 'pending') throw new Error('Solo se pueden rechazar solicitudes pendientes')
  if (!message.trim()) throw new Error('Debes indicar un motivo para el cliente')
  return repositories.appointment.updateStatus(id, 'rejected', message.trim())
}

export async function completeAppointment(id: string): Promise<Appointment> {
  const appointment = await repositories.appointment.getById(id)
  if (!appointment) throw new Error('Cita no encontrada')
  if (appointment.status !== 'accepted') throw new Error('Solo se pueden completar citas aceptadas')
  return repositories.appointment.updateStatus(id, 'completed')
}
