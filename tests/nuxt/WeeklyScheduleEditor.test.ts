import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import WeeklyScheduleEditor from '~/components/barber/WeeklyScheduleEditor.vue'
import type { WeeklyAvailabilityRule } from '~/types'

const initialRules: WeeklyAvailabilityRule[] = [
  { id: 'rule-1', barberId: 'barber-1', dayOfWeek: 1, startMinutes: 540, endMinutes: 780 }
]

function findButtonByText(wrapper: VueWrapper, text: string) {
  const button = wrapper.findAll('button').find(candidate => candidate.text() === text)
  if (!button) throw new Error(`Button with text "${text}" not found`)
  return button
}

describe('WeeklyScheduleEditor', () => {
  it('emits the current rules unchanged when saving without edits', async () => {
    const wrapper = await mountSuspended(WeeklyScheduleEditor, { props: { rules: initialRules } })
    await findButtonByText(wrapper, 'Guardar horario').trigger('click')

    const emitted = wrapper.emitted('save')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual([{ dayOfWeek: 1, startMinutes: 540, endMinutes: 780 }])
  })

  it('adding a row and saving includes the new entry', async () => {
    const wrapper = await mountSuspended(WeeklyScheduleEditor, { props: { rules: initialRules } })
    await findButtonByText(wrapper, 'Agregar horario').trigger('click')
    await findButtonByText(wrapper, 'Guardar horario').trigger('click')

    const emitted = wrapper.emitted('save')
    expect(emitted?.[0]?.[0]).toHaveLength(2)
  })

  it('removing the only row and saving emits an empty list', async () => {
    const wrapper = await mountSuspended(WeeklyScheduleEditor, { props: { rules: initialRules } })
    await findButtonByText(wrapper, 'Quitar').trigger('click')
    await findButtonByText(wrapper, 'Guardar horario').trigger('click')

    const emitted = wrapper.emitted('save')
    expect(emitted?.[0]?.[0]).toEqual([])
  })
})
