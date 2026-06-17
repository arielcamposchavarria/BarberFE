import type { DayOfWeek } from '~/types'

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function todayISODate(): string {
  return toISODate(new Date())
}

export function addDays(base: Date, days: number): Date {
  const result = new Date(base)
  result.setDate(result.getDate() + days)
  return result
}

export function isoDateFromToday(days: number): string {
  return toISODate(addDays(new Date(), days))
}

export function getDayOfWeek(isoDate: string): DayOfWeek {
  return new Date(`${isoDate}T00:00:00`).getDay() as DayOfWeek
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export function timeToMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  return hours * 60 + minutes
}
