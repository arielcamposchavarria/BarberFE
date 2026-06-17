import { describe, expect, it } from 'vitest'
import { acceptAppointment, completeAppointment, getSlotsForBarberOnDate, rejectAppointment, requestAppointment } from '~/services/appointment.service'

/** barber-1/2/3 each have weekly rules covering most weekdays — scan ahead for the next date with an open slot. */
async function findOpenDate(barberId: string, serviceDurationMinutes: number): Promise<string> {
  for (let offset = 1; offset < 14; offset++) {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    const iso = date.toISOString().slice(0, 10)
    const slots = await getSlotsForBarberOnDate(barberId, iso, serviceDurationMinutes)
    if (slots.some(slot => slot.available)) return iso
  }
  throw new Error('No open date found in test window')
}

describe('appointment.service', () => {
  it('accepting an appointment blocks the slot for further requests', async () => {
    const date = await findOpenDate('barber-1', 30)
    const slots = await getSlotsForBarberOnDate('barber-1', date, 30)
    const freeSlot = slots.find(slot => slot.available)
    if (!freeSlot) throw new Error('expected a free slot')

    const appointment = await requestAppointment({
      clientId: 'client-1',
      barberId: 'barber-1',
      serviceId: 'svc-1',
      date,
      startMinutes: freeSlot.startMinutes
    })
    expect(appointment.status).toBe('pending')

    await acceptAppointment(appointment.id)

    const slotsAfter = await getSlotsForBarberOnDate('barber-1', date, 30)
    const sameSlot = slotsAfter.find(slot => slot.startMinutes === freeSlot.startMinutes)
    expect(sameSlot?.available).toBe(false)

    await expect(requestAppointment({
      clientId: 'client-2',
      barberId: 'barber-1',
      serviceId: 'svc-1',
      date,
      startMinutes: freeSlot.startMinutes
    })).rejects.toThrow()
  })

  it('rejecting a pending appointment requires a message', async () => {
    const date = await findOpenDate('barber-2', 40)
    const slots = await getSlotsForBarberOnDate('barber-2', date, 40)
    const freeSlot = slots.find(slot => slot.available)
    if (!freeSlot) throw new Error('expected a free slot')

    const appointment = await requestAppointment({
      clientId: 'client-1',
      barberId: 'barber-2',
      serviceId: 'svc-3',
      date,
      startMinutes: freeSlot.startMinutes
    })

    await expect(rejectAppointment(appointment.id, '')).rejects.toThrow()

    const rejected = await rejectAppointment(appointment.id, 'Por favor agenda otro día')
    expect(rejected.status).toBe('rejected')
    expect(rejected.rejectionMessage).toBe('Por favor agenda otro día')
  })

  it('completing an appointment is only valid from accepted', async () => {
    const date = await findOpenDate('barber-3', 35)
    const slots = await getSlotsForBarberOnDate('barber-3', date, 35)
    const freeSlot = slots.find(slot => slot.available)
    if (!freeSlot) throw new Error('expected a free slot')

    const appointment = await requestAppointment({
      clientId: 'client-2',
      barberId: 'barber-3',
      serviceId: 'svc-4',
      date,
      startMinutes: freeSlot.startMinutes
    })

    await expect(completeAppointment(appointment.id)).rejects.toThrow()

    await acceptAppointment(appointment.id)
    const completed = await completeAppointment(appointment.id)
    expect(completed.status).toBe('completed')
  })
})
