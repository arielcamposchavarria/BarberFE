import type { AvailabilityException, WeeklyAvailabilityRule } from '~/types'

export interface AvailabilityRepository {
  listWeeklyRules(barberId: string): Promise<WeeklyAvailabilityRule[]>
  /** Full replace of the barber's weekly rules — simplest mental model for an editable recurring schedule. */
  setWeeklyRules(barberId: string, rules: Array<Omit<WeeklyAvailabilityRule, 'id' | 'barberId'>>): Promise<WeeklyAvailabilityRule[]>
  listExceptions(barberId: string): Promise<AvailabilityException[]>
  addException(data: Omit<AvailabilityException, 'id'>): Promise<AvailabilityException>
  removeException(id: string): Promise<void>
}
