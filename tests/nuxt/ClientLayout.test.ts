import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import ClientLayout from '~/layouts/client.vue'
import AppSidebar from '~/components/shared/AppSidebar.vue'
import { useAuth } from '~/composables/useAuth'

const Wrapper = defineComponent({
  setup() {
    const { login } = useAuth()
    return { login }
  },
  render() {
    return h(ClientLayout, null, { default: () => h('div', 'contenido') })
  }
})

describe('client layout', () => {
  it('shows a login button for guests', async () => {
    const component = await mountSuspended(Wrapper)
    expect(component.text()).toContain('Iniciar sesión')
  })

  it('hides the login button and shows the sidebar once authenticated', async () => {
    const component = await mountSuspended(Wrapper)
    await component.vm.login('maria.jimenez', 'client123')
    await component.vm.$nextTick()

    expect(component.text()).not.toContain('Iniciar sesión')
    expect(component.text()).toContain('Mis citas')
  })

  it('opens the sidebar drawer when the mobile menu button is tapped', async () => {
    const component = await mountSuspended(Wrapper)
    await component.vm.login('maria.jimenez', 'client123')
    await component.vm.$nextTick()

    const sidebar = component.findComponent(AppSidebar)
    expect(sidebar.props('open')).toBe(false)

    await component.find('button[aria-label="Abrir menú"]').trigger('click')
    expect(sidebar.props('open')).toBe(true)
  })
})
