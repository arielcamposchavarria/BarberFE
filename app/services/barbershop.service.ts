import type { Barbershop } from '~/types'
import { repositories } from '~/repositories'
import { isValidCoordinates } from '~/utils/validators'

export type CreateBarbershopInput = Omit<Barbershop, 'id' | 'createdAt' | 'status'>
export type UpdateBarbershopInput = Partial<Omit<Barbershop, 'id'>>

function assertValidCoordinates(coordinates?: Barbershop['coordinates']) {
  if (coordinates && !isValidCoordinates(coordinates.lat, coordinates.lng)) {
    throw new Error('Coordenadas inválidas')
  }
}

export async function listBarbershops(): Promise<Barbershop[]> {
  return repositories.barbershop.list()
}

export async function createBarbershop(data: CreateBarbershopInput): Promise<Barbershop> {
  assertValidCoordinates(data.coordinates)
  return repositories.barbershop.create({ ...data, status: 'active' })
}

export async function updateBarbershop(id: string, data: UpdateBarbershopInput): Promise<Barbershop> {
  assertValidCoordinates(data.coordinates)
  return repositories.barbershop.update(id, data)
}

export async function setBarbershopStatus(id: string, status: Barbershop['status']): Promise<void> {
  return repositories.barbershop.setStatus(id, status)
}
