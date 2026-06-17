<template>
  <div class="flex items-center gap-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="text-xl leading-none"
      :class="star <= modelValue ? 'text-amber-500' : 'text-slate-300'"
      :disabled="readonly"
      @click="handleClick(star)"
    >
      ★
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function handleClick(star: number) {
  if (props.readonly) return
  emit('update:modelValue', star)
}
</script>
