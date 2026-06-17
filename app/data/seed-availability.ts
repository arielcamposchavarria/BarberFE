import type { AvailabilityException, WeeklyAvailabilityRule } from '~/types'
import { isoDateFromToday } from '~/utils/datetime'

let ruleId = 0
function rule(barberId: string, dayOfWeek: WeeklyAvailabilityRule['dayOfWeek'], startMinutes: number, endMinutes: number): WeeklyAvailabilityRule {
  ruleId += 1
  return { id: `rule-${ruleId}`, barberId, dayOfWeek, startMinutes, endMinutes }
}

export const seedWeeklyAvailability: WeeklyAvailabilityRule[] = [
  // barber-1: Mon-Fri split shift (morning + afternoon), Saturday morning only
  rule('barber-1', 1, 540, 780), rule('barber-1', 1, 840, 1080),
  rule('barber-1', 2, 540, 780), rule('barber-1', 2, 840, 1080),
  rule('barber-1', 3, 540, 780), rule('barber-1', 3, 840, 1080),
  rule('barber-1', 4, 540, 780), rule('barber-1', 4, 840, 1080),
  rule('barber-1', 5, 540, 780), rule('barber-1', 5, 840, 1080),
  rule('barber-1', 6, 540, 720),

  // barber-2: Tue-Sat single continuous shift
  rule('barber-2', 2, 600, 1140),
  rule('barber-2', 3, 600, 1140),
  rule('barber-2', 4, 600, 1140),
  rule('barber-2', 5, 600, 1140),
  rule('barber-2', 6, 600, 1140),

  // barber-3: Mon-Fri single continuous shift
  rule('barber-3', 1, 480, 960),
  rule('barber-3', 2, 480, 960),
  rule('barber-3', 3, 480, 960),
  rule('barber-3', 4, 480, 960),
  rule('barber-3', 5, 480, 960)
]

export const seedAvailabilityExceptions: AvailabilityException[] = [
  // barber-1 takes a full day off a week from now
  { id: 'exc-1', barberId: 'barber-1', date: isoDateFromToday(7), kind: 'full-day-block' },
  // barber-2 blocks a lunch break three days from now
  { id: 'exc-2', barberId: 'barber-2', date: isoDateFromToday(3), kind: 'partial-block', startMinutes: 720, endMinutes: 780 }
]
