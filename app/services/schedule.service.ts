import type { AvailabilityException, WeeklyAvailabilityRule } from '~/types'
import { repositories } from '~/repositories'

export type WeeklyRuleInput = Array<Omit<WeeklyAvailabilityRule, 'id' | 'barberId'>>

export async function getWeeklyRules(barberId: string): Promise<WeeklyAvailabilityRule[]> {
  return repositories.availability.listWeeklyRules(barberId)
}

export async function setWeeklyRules(barberId: string, rules: WeeklyRuleInput): Promise<WeeklyAvailabilityRule[]> {
  for (const rule of rules) {
    if (rule.startMinutes >= rule.endMinutes) {
      throw new Error('La hora de inicio debe ser anterior a la hora de fin')
    }
  }
  return repositories.availability.setWeeklyRules(barberId, rules)
}

export async function getExceptions(barberId: string): Promise<AvailabilityException[]> {
  return repositories.availability.listExceptions(barberId)
}

export async function addException(data: Omit<AvailabilityException, 'id'>): Promise<AvailabilityException> {
  if (data.kind === 'partial-block' && (data.startMinutes === undefined || data.endMinutes === undefined || data.startMinutes >= data.endMinutes)) {
    throw new Error('Rango de horas inválido para el bloqueo parcial')
  }
  return repositories.availability.addException(data)
}

export async function removeException(id: string): Promise<void> {
  return repositories.availability.removeException(id)
}
