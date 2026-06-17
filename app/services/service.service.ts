import type { Service } from '~/types'
import { repositories } from '~/repositories'
import { isPositiveInteger } from '~/utils/validators'

export type CreateServiceInput = Omit<Service, 'id' | 'active'>
export type UpdateServiceInput = Partial<Omit<Service, 'id' | 'barberId'>>

function assertValidPricing(priceCents: number, durationMinutes: number) {
  if (!isPositiveInteger(priceCents)) throw new Error('El precio debe ser un número entero positivo de céntimos')
  if (!isPositiveInteger(durationMinutes)) throw new Error('La duración debe ser un número positivo de minutos')
}

export async function listServicesByBarber(barberId: string): Promise<Service[]> {
  return repositories.service.listByBarber(barberId)
}

export async function getServiceById(id: string): Promise<Service | null> {
  return repositories.service.getById(id)
}

export async function createService(data: CreateServiceInput): Promise<Service> {
  assertValidPricing(data.priceCents, data.durationMinutes)
  return repositories.service.create({ ...data, active: true })
}

export async function updateService(id: string, data: UpdateServiceInput): Promise<Service> {
  if (data.priceCents !== undefined || data.durationMinutes !== undefined) {
    const current = await repositories.service.getById(id)
    if (!current) throw new Error('Servicio no encontrado')
    assertValidPricing(data.priceCents ?? current.priceCents, data.durationMinutes ?? current.durationMinutes)
  }
  return repositories.service.update(id, data)
}

export async function removeService(id: string): Promise<void> {
  return repositories.service.remove(id)
}
