<template>
  <button
    :type="type ?? 'button'"
    class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
    :class="variantClass"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  type?: 'button' | 'submit'
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'bg-red-500 text-white shadow-red-200 hover:bg-red-600'
    case 'secondary':
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    default:
      return 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-500'
  }
})
</script>
