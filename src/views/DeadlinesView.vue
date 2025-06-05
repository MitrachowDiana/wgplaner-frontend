<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
        Fristen & Erinnerungen
      </h2>
    </div>

    <div v-if="sortedTasks.length === 0" class="text-center py-12 card">
      <p class="text-gray-500 text-lg">Keine Aufgaben mit Fälligkeit vorhanden.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="task in sortedTasks" 
           :key="task.id" 
           class="card hover:shadow-lg transition-all duration-300">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900">{{ task.description }}</h3>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span v-if="task.dueDate" class="flex items-center">
              <span class="mr-1">📅</span>
              {{ formatDate(task.dueDate) }}
            </span>
            <span v-if="task.roommate" class="flex items-center">
              <span class="mr-1">👤</span>
              {{ task.roommate.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getTasks } from '../api/taskApi.js'

const tasks = ref([])

onMounted(async () => {
  try {
    const all = await getTasks()
    tasks.value = all.filter(task => task.dueDate)
  } catch (e) {
    console.error('Fehler beim Laden der Aufgaben:', e)
  }
})

const sortedTasks = computed(() =>
    tasks.value.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>