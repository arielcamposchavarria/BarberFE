import type { FunctionalComponent } from 'vue'

export interface SidebarItem {
  to: string
  label: string
  icon: FunctionalComponent
}
