<template>
  <div class="w-full max-w-sm rounded-3xl bg-white p-9 shadow-xl shadow-slate-900/5">
    <div class="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-base font-bold text-white">
      B
    </div>
    <h1 class="text-xl font-semibold text-slate-900">
      BarberFE
    </h1>
    <p class="mb-6 text-sm text-slate-500">
      Inicia sesión para continuar
    </p>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="username">Usuario</label>
        <input id="username" v-model="username" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button type="submit" class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-500 disabled:opacity-50" :disabled="isSubmitting">
        {{ isSubmitting ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>

    <p class="mt-6 text-xs text-slate-400">
      Demo: admin/admin123 · carlos.ramirez/barber123 · maria.jimenez/client123
    </p>
    <p class="mt-4 text-center text-sm text-slate-500">
      ¿Eres nuevo? <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Crea una cuenta</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login, role } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

function destinationForRole() {
  if (role.value === 'admin') return '/admin/barbershops'
  if (role.value === 'barber') return '/barber/profile'
  return '/client/barbershops'
}

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await login(username.value.trim(), password.value)
    await router.push(destinationForRole())
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No se pudo iniciar sesión'
  } finally {
    isSubmitting.value = false
  }
}
</script>
