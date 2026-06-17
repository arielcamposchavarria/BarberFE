import { describe, expect, it } from 'vitest'
import { getAvailableSlots } from '~/utils/availability'
import type { Appointment, AvailabilityException, WeeklyAvailabilityRule } from '~/types'

const MONDAY = '2026-06-22' // a known Monday

function weeklyRule(overrides: Partial<WeeklyAvailabilityRule> = {}): WeeklyAvailabilityRule {
  return { id: 'rule-1', barberId: 'barber-1', dayOfWeek: 1, startMinutes: 540, endMinutes: 780, ...overrides }
}

describe('getAvailableSlots', () => {
  it('generates slots within weekly open hours only', () => {
    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule()],
      exceptions: [],
      existingAppointments: [],
      serviceDurationMinutes: 30,
      slotGranularityMinutes: 30
    })

    expect(slots.length).toBeGreaterThan(0)
    expect(slots.every(slot => slot.startMinutes >= 540 && slot.endMinutes <= 780)).toBe(true)
    expect(slots.every(slot => slot.available)).toBe(true)
  })

  it('returns no slots on a day with no weekly rule', () => {
    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule({ dayOfWeek: 2 })], // Tuesday only
      exceptions: [],
      existingAppointments: [],
      serviceDurationMinutes: 30
    })

    expect(slots).toEqual([])
  })

  it('returns no slots when a full-day-block exception applies', () => {
    const exceptions: AvailabilityException[] = [{ id: 'exc-1', barberId: 'barber-1', date: MONDAY, kind: 'full-day-block' }]

    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule()],
      exceptions,
      existingAppointments: [],
      serviceDurationMinutes: 30
    })

    expect(slots).toEqual([])
  })

  it('excludes slots inside a partial-block exception', () => {
    const exceptions: AvailabilityException[] = [
      { id: 'exc-1', barberId: 'barber-1', date: MONDAY, kind: 'partial-block', startMinutes: 600, endMinutes: 660 }
    ]

    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule()],
      exceptions,
      existingAppointments: [],
      serviceDurationMinutes: 30,
      slotGranularityMinutes: 30
    })

    const overlapsBlock = slots.some(slot => slot.startMinutes < 660 && slot.endMinutes > 600)
    expect(overlapsBlock).toBe(false)
  })

  it('marks slots overlapping an accepted appointment as unavailable but still returns them', () => {
    const existingAppointments: Appointment[] = [
      {
        id: 'appt-1',
        clientId: 'client-1',
        barberId: 'barber-1',
        serviceId: 'svc-1',
        date: MONDAY,
        startMinutes: 600,
        durationMinutes: 30,
        status: 'accepted',
        createdAt: MONDAY
      }
    ]

    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule()],
      exceptions: [],
      existingAppointments,
      serviceDurationMinutes: 30,
      slotGranularityMinutes: 30
    })

    const blockedSlot = slots.find(slot => slot.startMinutes === 600)
    expect(blockedSlot).toBeDefined()
    expect(blockedSlot?.available).toBe(false)
    expect(slots.some(slot => slot.available)).toBe(true)
  })

  it('ignores pending/rejected appointments when computing occupancy', () => {
    const existingAppointments: Appointment[] = [
      {
        id: 'appt-1',
        clientId: 'client-1',
        barberId: 'barber-1',
        serviceId: 'svc-1',
        date: MONDAY,
        startMinutes: 600,
        durationMinutes: 30,
        status: 'pending',
        createdAt: MONDAY
      }
    ]

    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule()],
      exceptions: [],
      existingAppointments,
      serviceDurationMinutes: 30,
      slotGranularityMinutes: 30
    })

    const slotAt600 = slots.find(slot => slot.startMinutes === 600)
    expect(slotAt600?.available).toBe(true)
  })

  it('does not generate a slot that would run past the end of an open interval', () => {
    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule({ startMinutes: 540, endMinutes: 600 })], // 09:00-10:00
      exceptions: [],
      existingAppointments: [],
      serviceDurationMinutes: 45,
      slotGranularityMinutes: 15
    })

    expect(slots.every(slot => slot.endMinutes <= 600)).toBe(true)
  })

  it('supports split shifts as separate weekly rules for the same day', () => {
    const slots = getAvailableSlots({
      date: MONDAY,
      weeklyRules: [weeklyRule({ startMinutes: 540, endMinutes: 780 }), weeklyRule({ id: 'rule-2', startMinutes: 840, endMinutes: 1080 })],
      exceptions: [],
      existingAppointments: [],
      serviceDurationMinutes: 30,
      slotGranularityMinutes: 30
    })

    const morningSlots = slots.filter(slot => slot.startMinutes < 780)
    const afternoonSlots = slots.filter(slot => slot.startMinutes >= 840)
    expect(morningSlots.length).toBeGreaterThan(0)
    expect(afternoonSlots.length).toBeGreaterThan(0)
  })
})
