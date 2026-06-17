<template>
  <form class="space-y-3" @submit.prevent="handleSubmit">
    <StarRating v-model="rating" />
    <textarea v-model="comment" rows="2" placeholder="Comentario (opcional)" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
    <p v-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
    <AppButton type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Enviando...' : 'Enviar calificación' }}
    </AppButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  submit: [data: { rating: number, comment?: string }]
}>()

const rating = ref(5)
const comment = ref('')
const errorMessage = ref('')

function handleSubmit() {
  if (rating.value < 1) {
    errorMessage.value = 'Selecciona una calificación'
    return
  }
  errorMessage.value = ''
  emit('submit', { rating: rating.value, comment: comment.value || undefined })
}
</script>
