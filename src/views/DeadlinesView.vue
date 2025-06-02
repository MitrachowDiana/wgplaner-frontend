<template>
  <div class="fristen-view">
    <h2>Fristen & Erinnerungen ⏰</h2>
    <div v-if="sortedTasks.length === 0">
      Keine Aufgaben mit Fälligkeit vorhanden.
    </div>
    <ul>
      <li v-for="task in sortedTasks" :key="task.id">
        <strong>{{ task.description }}</strong>
        <span v-if="task.dueDate"> | 📅 {{ formatDate(task.dueDate) }}</span>
        <span v-if="task.roommate"> | 👤 {{ task.roommate.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getTasks } from '../api/taskApi.js'

const tasks = ref([])

onMounted(async () => {
  try {
    const all = await getTasks()
    // Nur Aufgaben mit Frist
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

<style scoped>
.fristen-view {
  margin-top: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.6rem;
  margin-bottom: 0.4rem;
  background: #f8f8f8;
  border-left: 4px solid #42b983;
  border-radius: 4px;
}
</style>
