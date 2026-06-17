import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import BookingForm from '~/components/client/BookingForm.vue'
import type { Service } from '~/types'
import type { Slot } from '~/utils/availability'

const services: Service[] = [
  { id: 'svc-1', barberId: 'barber-1', name: 'Corte clásico', priceCents: 800000, durationMinutes: 30, active: true }
]

const slots: Slot[] = [
  { startMinutes: 540, endMinutes: 570, available: true },
  { startMinutes: 570, endMinutes: 600, available: false }
]

function findButtonByText(wrapper: VueWrapper, text: string) {
  const button = wrapper.findAll('button').find(candidate => candidate.text() === text)
  if (!button) throw new Error(`Button with text "${text}" not found`)
  return button
}

describe('BookingForm', () => {
  it('disables unavailable slots and enables available ones once a date is picked', async () => {
    const wrapper = await mountSuspended(BookingForm, { props: { services, slots: [] } })
    await wrapper.find('input[type="date"]').setValue('2026-06-22')
    await wrapper.setProps({ slots })

    expect(findButtonByText(wrapper, '09:00').attributes('disabled')).toBeUndefined()
    expect(findButtonByText(wrapper, '09:30').attributes('disabled')).toBeDefined()
  })

  it('emits submit with the chosen service, date, and slot', async () => {
    const wrapper = await mountSuspended(BookingForm, { props: { services, slots: [] } })
    await wrapper.find('input[type="date"]').setValue('2026-06-22')
    await wrapper.setProps({ slots })

    await findButtonByText(wrapper, '09:00').trigger('click')
    await findButtonByText(wrapper, 'Solicitar cita').trigger('click')

    expect(wrapper.emitted('submit')).toEqual([[{ serviceId: 'svc-1', date: '2026-06-22', startMinutes: 540 }]])
  })

  it('keeps the submit button disabled until a slot is chosen', async () => {
    const wrapper = await mountSuspended(BookingForm, { props: { services, slots: [] } })
    expect(findButtonByText(wrapper, 'Solicitar cita').attributes('disabled')).toBeDefined()
  })
})
