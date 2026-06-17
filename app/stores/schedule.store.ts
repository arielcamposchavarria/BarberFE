import { defineStore } from 'pinia'
import type { AvailabilityException, WeeklyAvailabilityRule } from '~/types'
import { addException, getExceptions, getWeeklyRules, removeException, setWeeklyRules, type WeeklyRuleInput } from '~/services/schedule.service'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    weeklyRules: [] as WeeklyAvailabilityRule[],
    exceptions: [] as AvailabilityException[],
    isLoading: false
  }),

  actions: {
    async fetchByBarber(barberId: string) {
      this.isLoading = true
      try {
        const [rules, exceptions] = await Promise.all([getWeeklyRules(barberId), getExceptions(barberId)])
        this.weeklyRules = rules
        this.exceptions = exceptions
      } finally {
        this.isLoading = false
      }
    },

    async saveWeeklyRules(barberId: string, rules: WeeklyRuleInput) {
      this.weeklyRules = await setWeeklyRules(barberId, rules)
    },

    async addException(data: Omit<AvailabilityException, 'id'>) {
      const exception = await addException(data)
      this.exceptions.push(exception)
      return exception
    },

    async removeException(id: string) {
      await removeException(id)
      this.exceptions = this.exceptions.filter(exception => exception.id !== id)
    }
  }
})
