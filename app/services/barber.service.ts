import type { Barber } from '~/types'
import { repositories } from '~/repositories'
import { isValidPassword, isValidUsername } from '~/utils/validators'

export interface CreateBarberInput {
  barbershopId: string
  displayName: string
  username: string
  password: string
  bio?: string
  avatarUrl?: string
  phone?: string
}

export async function listBarbersByBarbershop(barbershopId: string): Promise<Barber[]> {
  return repositories.barber.listByBarbershop(barbershopId)
}

export async function getBarberByUserId(userId: string): Promise<Barber | null> {
  return repositories.barber.getByUserId(userId)
}

export async function getBarberById(id: string): Promise<Barber | null> {
  return repositories.barber.getById(id)
}

/**
 * Admin-creates-barber flow: the Barber and the linked auth User are created
 * by two independent repositories that don't know about each other. The
 * barber is created first with a placeholder userId, then patched once the
 * user exists, avoiding a circular foreign-key requirement.
 */
export async function createBarber(input: CreateBarberInput): Promise<Barber> {
  if (!isValidUsername(input.username)) {
    throw new Error('El nombre de usuario debe tener entre 3 y 30 caracteres alfanuméricos')
  }
  if (!isValidPassword(input.password)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }

  const existingUser = await repositories.auth.findByUsername(input.username)
  if (existingUser) {
    throw new Error('Ese nombre de usuario ya está en uso')
  }

  const barber = await repositories.barber.create({
    barbershopId: input.barbershopId,
    displayName: input.displayName,
    bio: input.bio,
    avatarUrl: input.avatarUrl,
    phone: input.phone,
    status: 'active',
    userId: ''
  })

  const user = await repositories.auth.create({
    username: input.username,
    password: input.password,
    role: 'barber',
    status: 'active',
    linkedProfileId: barber.id
  })

  return repositories.barber.update(barber.id, { userId: user.id })
}

export async function updateBarberProfile(id: string, data: Partial<Pick<Barber, 'displayName' | 'bio' | 'avatarUrl' | 'phone'>>): Promise<Barber> {
  return repositories.barber.update(id, data)
}

export async function setBarberStatus(id: string, status: Barber['status']): Promise<void> {
  return repositories.barber.setStatus(id, status)
}
