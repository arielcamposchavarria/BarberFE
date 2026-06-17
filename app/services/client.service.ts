import type { Client } from '~/types'
import { repositories } from '~/repositories'
import { isValidPassword, isValidUsername } from '~/utils/validators'

export interface RegisterClientInput {
  name: string
  username: string
  password: string
  phone?: string
}

export async function listClients(): Promise<Client[]> {
  return repositories.client.list()
}

export async function getClientByUserId(userId: string): Promise<Client | null> {
  return repositories.client.getByUserId(userId)
}

/** Clients self-register, unlike barbers — same two-step User+profile creation pattern as createBarber. */
export async function registerClient(input: RegisterClientInput): Promise<Client> {
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

  const client = await repositories.client.create({
    name: input.name,
    phone: input.phone,
    status: 'active',
    userId: ''
  })

  const user = await repositories.auth.create({
    username: input.username,
    password: input.password,
    role: 'client',
    status: 'active',
    linkedProfileId: client.id
  })

  return repositories.client.update(client.id, { userId: user.id })
}

export async function updateClientProfile(id: string, data: Partial<Pick<Client, 'name' | 'phone'>>): Promise<Client> {
  return repositories.client.update(id, data)
}

export async function setClientStatus(id: string, status: Client['status']): Promise<void> {
  return repositories.client.setStatus(id, status)
}
