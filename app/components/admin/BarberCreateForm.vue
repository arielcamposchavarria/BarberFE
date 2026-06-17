<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="displayName">Nombre completo</label>
      <input id="displayName" v-model="form.displayName" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="username">Usuario</label>
      <input id="username" v-model="form.username" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="password">Contraseña</label>
      <input id="password" v-model="form.password" type="password" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="phone">Teléfono</label>
      <input id="phone" v-model="form.phone" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="bio">Biografía</label>
      <textarea id="bio" v-model="form.bio" rows="2" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
    </div>

    <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <div class="flex justify-end gap-2">
      <AppButton variant="secondary" @click="emit('cancel')">
        Cancelar
      </AppButton>
      <AppButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creando...' : 'Crear barbero' }}
      </AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [data: { displayName: string, username: string, password: string, phone?: string, bio?: string }]
  cancel: []
}>()

const form = reactive({ displayName: '', username: '', password: '', phone: '', bio: '' })

function handleSubmit() {
  emit('submit', {
    displayName: form.displayName,
    username: form.username,
    password: form.password,
    phone: form.phone || undefined,
    bio: form.bio || undefined
  })
}
</script>
