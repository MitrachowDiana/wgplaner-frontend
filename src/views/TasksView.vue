<template>
  <div class="tasks-view">
    <h2>Aufgaben 📝</h2>

    <TaskForm :modelValue="selectedTask" @submit="handleSubmit" />

    <div v-if="tasks.length === 0">Keine Aufgaben vorhanden.</div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.description }}</strong>
        <span v-if="task.dueDate"> | 📅 Fällig: {{ formatDate(task.dueDate) }}</span>
        <span v-if="task.roommate"> | 👤 Zuständig: {{ task.roommate.name }}</span>
        <button @click="editTask(task)">✏️</button>
        <button @click="deleteTaskById(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from '../api/taskApi.js'

const tasks = ref([])
const selectedTask = ref(null)
const flatId = parseInt(localStorage.getItem('flatId')) || null

const loadTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error('Fehler beim Laden der Aufgaben:', error)
  }
}

const handleSubmit = async (taskData) => {
  try {
    if (!flatId) {
      alert('Bitte zuerst eine Wohnung erstellen.')
      return
    }

    const payload = {
      description: taskData.description,
      dueDate: taskData.dueDate,
      flat: { id: flatId },
      roommate: taskData.roommateId ? { id: taskData.roommateId } : null
    }

    if (selectedTask.value) {
      await updateTask(selectedTask.value.id, payload)
    } else {
      await addTask(payload, flatId)
    }

    selectedTask.value = null
    await loadTasks()
  } catch (error) {
    console.error('Fehler beim Speichern:', error)
    alert('Speichern fehlgeschlagen')
  }
}

const editTask = (task) => {
  selectedTask.value = task
}

const deleteTaskById = async (id) => {
  await deleteTask(id)
  await loadTasks()
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(loadTasks)
</script>

<style scoped>
.tasks-view {
  margin-top: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  background: #f4f4f4;
  border-radius: 6px;
}

button {
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6b;
}
</style>
