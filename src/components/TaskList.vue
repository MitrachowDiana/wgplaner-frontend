<template>
  <div class="task-list">
    <h2>Checklist</h2>

    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Neue Aufgabe..." />

      <select v-model="selectedRoommateId">
        <option disabled value="">Mitbewohner auswählen</option>
        <option v-for="person in roommates" :key="person.id" :value="person.id">
          {{ person.name }}
        </option>
      </select>


      <button type="submit">Hinzufügen</button>
    </form>

    <ul class="task-list-ul">
      <li v-for="task in tasks" :key="task.id" :class="{ done: task.done }">
        <template v-if="editTaskId === task.id">
          <input v-model="editText" @keyup.enter="saveTask(task.id)" />
          <button class="cancel" @click="cancelEdit">Abbrechen</button>
        </template>

        <template v-else>
          <span class="task-label">
            <input type="checkbox" :checked="task.done" @change="toggleDone(task)" />
            {{ task.description }}
            <div v-if="task.roommate" class="task-roommate">
  🧑             {{ task.roommate.name }}
            </div>
          </span>
          <div v-if="task.roommate" class="task-roommate">
            🧑 {{ task.roommate.name }}
          </div>
          <div class="task-buttons">
            <button class="edit" @click="startEdit(task)">✏️</button>
            <button class="delete" @click="deleteTask(task.id)">🗑️</button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import './TaskList.css'
import { getRoommates } from '../api/roommateApi' // ✅ korrekt importieren

export default {
  data() {
    return {
      tasks: [],
      roommates: [],
      newTask: '',
      selectedRoommateId: '',
      editTaskId: null,
      editText: ''
    };
  },
  mounted() {
    this.fetchTasks()
    this.loadRoommates()
  },
  methods: {
    async loadRoommates() {
      try {
        this.roommates = await getRoommates()
        console.log('Roommates geladen:', this.roommates)
      } catch (err) {
        console.error('Fehler beim Laden der Roommates:', err)
      }
    },
    fetchTasks() {
      fetch(`${import.meta.env.VITE_API_URL}/tasks`)
          .then(res => res.json())
          .then(data => {
            this.tasks = data
          })
    },
    addTask() {
      if (!this.newTask.trim() || !this.selectedRoommateId) return

      fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.newTask,
          done: false,
          roommate: { id: this.selectedRoommateId }
        })
      })
          .then(res => res.json())
          .then(() => {
            this.newTask = ''
            this.selectedRoommateId = ''
            this.fetchTasks()
          })
    },
    deleteTask(id) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      }).then(() => this.fetchTasks())
    },
    startEdit(task) {
      this.editTaskId = task.id
      this.editText = task.description
    },
    cancelEdit() {
      this.editTaskId = null
      this.editText = ''
    },
    saveTask(id) {
      const task = this.tasks.find(t => t.id === id)
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.editText,
          done: task.done,
          roommate: task.roommate
        })
      })
          .then(res => res.json())
          .then(() => {
            this.editTaskId = null
            this.editText = ''
            this.fetchTasks()
          })
    },
    toggleDone(task) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: task.description,
          done: !task.done,
          roommate: task.roommate
        })
      })
          .then(() => this.fetchTasks())
    }
  }
}
</script>





