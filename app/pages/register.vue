<template>
  <div class="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
    <div class="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-base font-bold text-white">
      B
    </div>
    <h1 class="text-xl font-semibold text-slate-900">
      Crear cuenta
    </h1>
    <p class="mb-6 text-sm text-slate-500">
      Regístrate como cliente para reservar citas
    </p>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="name">Nombre completo</label>
        <input id="name" v-model="form.name" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
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

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button type="submit" class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-500 disabled:opacity-50" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creando cuenta...' : 'Crear cuenta' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-500">
      ¿Ya tienes cuenta? <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', public: true })

const clientsStore = useClientsStore()
const { login } = useAuth()
const router = useRouter()

const form = reactive({ name: '', username: '', password: '', phone: '' })
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await clientsStore.register({
      name: form.name,
      username: form.username.trim(),
      password: form.password,
      phone: form.phone || undefined
    })
    await login(form.username.trim(), form.password)
    await router.push('/client/barbershops')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No se pudo crear la cuenta'
  } finally {
    isSubmitting.value = false
  }
}
</script>
