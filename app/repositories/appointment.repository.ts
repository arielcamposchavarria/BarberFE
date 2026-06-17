import type { Appointment, AppointmentStatus } from '~/types'

export interface AppointmentRepository {
  listByBarber(barberId: string, status?: AppointmentStatus): Promise<Appointment[]>
  listByClient(clientId: string, status?: AppointmentStatus): Promise<Appointment[]>
  getById(id: string): Promise<Appointment | null>
  create(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment>
  updateStatus(id: string, status: AppointmentStatus, rejectionMessage?: string): Promise<Appointment>
}
