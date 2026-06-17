import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import AppointmentRequestCard from '~/components/barber/AppointmentRequestCard.vue'
import type { Appointment } from '~/types'

const pendingAppointment: Appointment = {
  id: 'appt-test',
  clientId: 'client-1',
  barberId: 'barber-1',
  serviceId: 'svc-1',
  date: '2026-06-22',
  startMinutes: 600,
  durationMinutes: 30,
  status: 'pending',
  createdAt: '2026-06-20'
}

function findButtonByText(wrapper: VueWrapper, text: string) {
  const button = wrapper.findAll('button').find(candidate => candidate.text() === text)
  if (!button) throw new Error(`Button with text "${text}" not found`)
  return button
}

describe('AppointmentRequestCard', () => {
  it('emits accept without requiring a message', async () => {
    const wrapper = await mountSuspended(AppointmentRequestCard, {
      props: { appointment: pendingAppointment, clientName: 'María', serviceName: 'Corte clásico' }
    })

    await findButtonByText(wrapper, 'Aceptar').trigger('click')
    expect(wrapper.emitted('accept')).toEqual([[pendingAppointment.id]])
  })

  it('blocks reject without a message', async () => {
    const wrapper = await mountSuspended(AppointmentRequestCard, {
      props: { appointment: pendingAppointment, clientName: 'María', serviceName: 'Corte clásico' }
    })

    await findButtonByText(wrapper, 'Rechazar').trigger('click')
    expect(wrapper.emitted('reject')).toBeUndefined()
    expect(wrapper.text()).toContain('Debes indicar un motivo')
  })

  it('emits reject with the typed message', async () => {
    const wrapper = await mountSuspended(AppointmentRequestCard, {
      props: { appointment: pendingAppointment, clientName: 'María', serviceName: 'Corte clásico' }
    })

    await wrapper.find('textarea').setValue('Por favor agenda otro día')
    await findButtonByText(wrapper, 'Rechazar').trigger('click')

    expect(wrapper.emitted('reject')).toEqual([[pendingAppointment.id, 'Por favor agenda otro día']])
  })
})
