<template>
  <div class="space-y-24">
    <!-- Aufgaben-Kachel oben -->
    <section class="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 class="text-2xl font-semibold mb-4">Aktuelle Aufgaben</h2>
      <h3 class="text-xl font-medium mb-4">Aufgabenliste 📝</h3>

      <!-- Loading State -->
      <div v-if="loading" class="text-gray-500 text-center py-4">
        Lade Aufgaben...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-600 text-center py-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="tasks.length === 0" class="text-gray-500 text-center py-4">
        Keine Aufgaben vorhanden.
      </div>

      <!-- Tasks List -->
      <ul v-else class="space-y-3">
        <li v-for="task in tasks" :key="task.id" class="border-b pb-3 last:border-b-0">
          <div class="flex flex-col space-y-1">
            <div class="flex items-start">
              <span class="text-green-500 mr-2 mt-0.5">✅</span>
              <strong class="text-gray-900 flex-1">{{ task.description }}</strong>
            </div>

            <div class="ml-6 space-y-1">
              <div v-if="task.dueDate" class="text-sm text-gray-600 flex items-center">
                <span class="mr-1">📅</span>
                Fällig am: {{ formatDate(task.dueDate) }}
              </div>

              <div v-if="task.roommate" class="text-sm text-gray-600 flex items-center">
                <span class="mr-1">👤</span>
                Zuständig: {{ task.roommate.name }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- Hero Section -->
    <section class="text-center space-y-8 py-16">
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold">
        <span class="bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
          WG-Planer
        </span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        Organisiere dein WG-Leben elegant und effizient.
      </p>
    </section>

    <!-- Features Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">✅</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Aufgaben</h3>
        <p class="text-gray-600 mt-2">Verwalte Aufgaben und Verantwortlichkeiten mühelos.</p>
      </div>

      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">👥</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Mitbewohner</h3>
        <p class="text-gray-600 mt-2">Behalte den Überblick über alle WG-Mitglieder.</p>
      </div>

      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">⏰</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Fristen</h3>
        <p class="text-gray-600 mt-2">Verpasse keine wichtigen Termine mehr.</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16">
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Einfach</div>
            <p class="mt-2 text-gray-600">Intuitive Bedienung</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Effizient</div>
            <p class="mt-2 text-gray-600">Schnelle Organisation</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Modern</div>
            <p class="mt-2 text-gray-600">Zeitgemäßes Design</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTasks } from '../api/taskApi.js'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const loadTasks = async () => {
  try {
    loading.value = true
    error.value = null

    const result = await getTasks()
    tasks.value = result

    console.log('Aufgaben geladen:', result) // Debug-Log
  } catch (err) {
    console.error('Fehler beim Laden der Aufgaben:', err)
    error.value = 'Aufgaben konnten nicht geladen werden.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (err) {
    console.error('Fehler beim Formatieren des Datums:', err)
    return dateStr
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.icon-wrapper {
  @apply text-4xl flex items-center justify-center w-16 h-16
  rounded-2xl bg-primary-100 text-primary-600 mx-auto
  transition-all duration-300;
}

.card {
  @apply p-8 text-center;
}
</style>

