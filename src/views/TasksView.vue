<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
        Aufgaben verwalten
      </h2>
    </div>

    <div class="card">
      <TaskForm :modelValue="selectedTask" @submit="handleSubmit" />
    </div>

    <div v-if="tasks.length === 0" class="text-center py-12 card">
      <p class="text-gray-500 text-lg">Keine Aufgaben vorhanden.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="task in tasks" :key="task.id" 
           class="card hover:shadow-lg transition-all duration-300">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
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
          <div class="flex space-x-2">
            <button @click="editTask(task)" 
                    class="btn-secondary !py-2 !px-3">✏️</button>
            <button @click="deleteTaskById(task.id)" 
                    class="btn-secondary !py-2 !px-3">🗑️</button>
          </div>
        </div>
      </div>
    </div>
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