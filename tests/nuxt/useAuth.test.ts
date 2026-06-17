import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { useAuth } from '~/composables/useAuth'

const TestComponent = defineComponent({
  setup() {
    const { isAuthenticated, role, login, hasRole } = useAuth()
    return { isAuthenticated, role, login, hasRole }
  },
  render() {
    return h('div', this.isAuthenticated ? `role:${this.role}` : 'anonymous')
  }
})

describe('useAuth', () => {
  it('starts unauthenticated', async () => {
    const component = await mountSuspended(TestComponent)
    expect(component.text()).toBe('anonymous')
  })

  it('logs in and exposes the resulting role', async () => {
    const component = await mountSuspended(TestComponent)
    await component.vm.login('admin', 'admin123')
    await component.vm.$nextTick()
    expect(component.text()).toBe('role:admin')
  })

  it('hasRole only matches the current role', async () => {
    const component = await mountSuspended(TestComponent)
    await component.vm.login('carlos.ramirez', 'barber123')
    expect(component.vm.hasRole('barber')).toBe(true)
    expect(component.vm.hasRole('admin')).toBe(false)
  })
})
