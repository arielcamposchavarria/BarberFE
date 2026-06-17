<template>
  <div v-if="barber" class="max-w-xl">
    <h1 class="mb-1 text-2xl font-semibold tracking-tight text-slate-900">
      Mi perfil
    </h1>
    <p class="mb-6 text-sm text-slate-500">
      {{ barbershopName }}
    </p>

    <form class="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50" @submit.prevent="handleSubmit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="displayName">Nombre</label>
        <input id="displayName" v-model="form.displayName" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="phone">Teléfono</label>
        <input id="phone" v-model="form.phone" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="bio">Biografía</label>
        <textarea id="bio" v-model="form.bio" rows="3" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="avatarUrl">URL de foto</label>
        <input id="avatarUrl" v-model="form.avatarUrl" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
      </div>

      <p v-if="successMessage" class="text-sm text-emerald-600">
        {{ successMessage }}
      </p>

      <AppButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Guardando...' : 'Guardar cambios' }}
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber', middleware: 'role', role: 'barber' })

const { user } = useAuth()
const barbersStore = useBarbersStore()
const barbershopsStore = useBarbershopsStore()

const isSubmitting = ref(false)
const successMessage = ref('')

const barber = computed(() => barbersStore.currentBarber)
const barbershopName = computed(() => barbershopsStore.items.find(shop => shop.id === barber.value?.barbershopId)?.name ?? '')

const form = reactive({ displayName: '', phone: '', bio: '', avatarUrl: '' })

watch(barber, (value) => {
  if (!value) return
  form.displayName = value.displayName
  form.phone = value.phone ?? ''
  form.bio = value.bio ?? ''
  form.avatarUrl = value.avatarUrl ?? ''
}, { immediate: true })

onMounted(async () => {
  if (!user.value) return
  await barbersStore.fetchCurrentByUserId(user.value.id)
  if (barbershopsStore.items.length === 0) {
    await barbershopsStore.fetchAll()
  }
})

async function handleSubmit() {
  if (!barber.value) return
  isSubmitting.value = true
  successMessage.value = ''
  try {
    await barbersStore.updateProfile(barber.value.id, {
      displayName: form.displayName,
      phone: form.phone || undefined,
      bio: form.bio || undefined,
      avatarUrl: form.avatarUrl || undefined
    })
    successMessage.value = 'Perfil actualizado'
  } finally {
    isSubmitting.value = false
  }
}
</script>
