import type { User } from '~/types'
import { repositories } from '~/repositories'

export async function login(username: string, password: string): Promise<User> {
  const user = await repositories.auth.findByUsername(username)
  if (!user || user.password !== password) {
    throw new Error('Usuario o contraseña incorrectos')
  }
  if (user.status === 'inactive') {
    throw new Error('Esta cuenta está desactivada')
  }
  return user
}
