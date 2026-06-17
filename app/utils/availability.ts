import type { Appointment, AvailabilityException, WeeklyAvailabilityRule } from '~/types'
import { getDayOfWeek } from './datetime'

export interface Interval {
  startMinutes: number
  endMinutes: number
}

export interface Slot extends Interval {
  available: boolean
}

export interface GetAvailableSlotsInput {
  date: string
  weeklyRules: WeeklyAvailabilityRule[]
  exceptions: AvailabilityException[]
  /** Only appointments with status 'accepted' actually occupy a slot. */
  existingAppointments: Appointment[]
  serviceDurationMinutes: number
  /** Step between candidate slot start times. Defaults to 30 minutes. */
  slotGranularityMinutes?: number
}

function subtractInterval(base: Interval[], remove: Interval): Interval[] {
  const result: Interval[] = []
  for (const interval of base) {
    if (remove.endMinutes <= interval.startMinutes || remove.startMinutes >= interval.endMinutes) {
      result.push(interval)
      continue
    }
    if (remove.startMinutes > interval.startMinutes) {
      result.push({ startMinutes: interval.startMinutes, endMinutes: Math.min(remove.startMinutes, interval.endMinutes) })
    }
    if (remove.endMinutes < interval.endMinutes) {
      result.push({ startMinutes: Math.max(remove.endMinutes, interval.startMinutes), endMinutes: interval.endMinutes })
    }
  }
  return result
}

function intervalsOverlap(a: Interval, b: Interval): boolean {
  return a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes
}

/**
 * Computes bookable slots for a barber on a given date from their recurring
 * weekly hours, one-off exceptions, and already-accepted appointments.
 * Slots outside open hours are never generated; slots that fall inside open
 * hours but overlap an accepted appointment are returned with available:false
 * so the UI can grey them out instead of hiding them.
 */
export function getAvailableSlots(input: GetAvailableSlotsInput): Slot[] {
  const { date, weeklyRules, exceptions, existingAppointments, serviceDurationMinutes } = input
  const slotGranularityMinutes = input.slotGranularityMinutes ?? 30

  const dayOfWeek = getDayOfWeek(date)
  const exceptionsForDate = exceptions.filter(exception => exception.date === date)

  if (exceptionsForDate.some(exception => exception.kind === 'full-day-block')) {
    return []
  }

  let openIntervals: Interval[] = weeklyRules
    .filter(rule => rule.dayOfWeek === dayOfWeek)
    .map(rule => ({ startMinutes: rule.startMinutes, endMinutes: rule.endMinutes }))

  for (const exception of exceptionsForDate) {
    if (exception.kind === 'partial-block' && exception.startMinutes !== undefined && exception.endMinutes !== undefined) {
      openIntervals = subtractInterval(openIntervals, { startMinutes: exception.startMinutes, endMinutes: exception.endMinutes })
    }
  }

  const occupied: Interval[] = existingAppointments
    .filter(appointment => appointment.date === date && appointment.status === 'accepted')
    .map(appointment => ({ startMinutes: appointment.startMinutes, endMinutes: appointment.startMinutes + appointment.durationMinutes }))

  const slots: Slot[] = []
  for (const interval of openIntervals) {
    for (let start = interval.startMinutes; start + serviceDurationMinutes <= interval.endMinutes; start += slotGranularityMinutes) {
      const candidate: Interval = { startMinutes: start, endMinutes: start + serviceDurationMinutes }
      const available = !occupied.some(occupiedInterval => intervalsOverlap(occupiedInterval, candidate))
      slots.push({ ...candidate, available })
    }
  }

  return slots.sort((a, b) => a.startMinutes - b.startMinutes)
}
