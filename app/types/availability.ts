export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** A recurring weekly open interval, e.g. Monday 09:00-13:00. Minutes are counted from midnight. */
export interface WeeklyAvailabilityRule {
  id: string
  barberId: string
  dayOfWeek: DayOfWeek
  startMinutes: number
  endMinutes: number
}

export type AvailabilityExceptionKind = 'full-day-block' | 'partial-block'

/** A one-off override of the recurring weekly rules for a specific date. */
export interface AvailabilityException {
  id: string
  barberId: string
  date: string
  kind: AvailabilityExceptionKind
  /** Required when kind === 'partial-block'. */
  startMinutes?: number
  endMinutes?: number
}
