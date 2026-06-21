import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppSidebar from '~/components/shared/AppSidebar.vue'
import type { SidebarItem } from '~/types/sidebar'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline'

const items: SidebarItem[] = [
  { to: '/client/barbershops', label: 'Barberías', icon: BuildingStorefrontIcon }
]

describe('AppSidebar', () => {
  it('is translated off-screen on mobile when closed', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      props: { brand: 'BarberFE', roleLabel: 'Cliente', items, open: false }
    })

    expect(wrapper.find('aside').classes()).toContain('-translate-x-full')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('slides in and shows a backdrop on mobile when open', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      props: { brand: 'BarberFE', roleLabel: 'Cliente', items, open: true }
    })

    expect(wrapper.find('aside').classes()).toContain('translate-x-0')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
  })

  it('emits close when the backdrop is clicked', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      props: { brand: 'BarberFE', roleLabel: 'Cliente', items, open: true }
    })

    await wrapper.find('.fixed.inset-0').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when a nav link is clicked', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      props: { brand: 'BarberFE', roleLabel: 'Cliente', items, open: true }
    })

    await wrapper.find('nav a').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
