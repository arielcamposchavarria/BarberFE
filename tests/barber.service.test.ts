import { describe, expect, it } from 'vitest'
import { createBarber } from '~/services/barber.service'
import { repositories } from '~/repositories'

describe('barber.service createBarber', () => {
  it('creates a linked User and Barber with matching ids', async () => {
    const barber = await createBarber({
      barbershopId: 'bs-1',
      displayName: 'Nuevo Barbero',
      username: 'nuevo.barbero',
      password: 'secret123'
    })

    expect(barber.userId).toBeTruthy()

    const user = await repositories.auth.findByUsername('nuevo.barbero')
    expect(user).not.toBeNull()
    expect(user?.linkedProfileId).toBe(barber.id)
    expect(user?.id).toBe(barber.userId)
    expect(user?.role).toBe('barber')
  })

  it('rejects a duplicate username', async () => {
    await createBarber({
      barbershopId: 'bs-1',
      displayName: 'Primero',
      username: 'duplicado',
      password: 'secret123'
    })

    await expect(createBarber({
      barbershopId: 'bs-1',
      displayName: 'Segundo',
      username: 'duplicado',
      password: 'secret123'
    })).rejects.toThrow()
  })

  it('rejects a password shorter than 6 characters', async () => {
    await expect(createBarber({
      barbershopId: 'bs-1',
      displayName: 'Alguien',
      username: 'alguien.mas',
      password: '123'
    })).rejects.toThrow()
  })
})
