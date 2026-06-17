import { describe, expect, it } from 'vitest'
import { login } from '~/services/auth.service'
import { repositories } from '~/repositories'

describe('auth.service login', () => {
  it('logs in with correct credentials', async () => {
    const user = await login('admin', 'admin123')
    expect(user.role).toBe('admin')
  })

  it('rejects an unknown username', async () => {
    await expect(login('nobody', 'whatever')).rejects.toThrow()
  })

  it('rejects a wrong password', async () => {
    await expect(login('admin', 'wrong-password')).rejects.toThrow()
  })

  it('rejects an inactive account', async () => {
    await repositories.auth.create({ username: 'inactive.user', password: 'secret123', role: 'client', status: 'inactive', linkedProfileId: 'client-x' })
    await expect(login('inactive.user', 'secret123')).rejects.toThrow()
  })
})
