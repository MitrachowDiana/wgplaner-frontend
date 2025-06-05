<template>
  <div class="task-list">
    <h3>Aufgabenliste 📝</h3>

    <div v-if="tasks.length === 0">Keine Aufgaben vorhanden.</div>

    <div class="task" v-for="task in tasks" :key="task.id">
      <div class="description">
        ✅ {{ task.description }}
      </div>

      <div v-if="task.dueDate" class="due-date">
        📅 Fällig am: {{ formatDate(task.dueDate) }}
      </div>

      <div v-if="task.roommate">
        👤 Zuständig: {{ task.roommate.name }}
      </div>

      <div class="actions" v-if="!readonly">
        <button @click="$emit('edit', task)">✏️ Bearbeiten</button>
        <button @click="$emit('delete', task.id)">🗑️ Löschen</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE')
}
</script>

<style scoped>
.task-list {
  margin-top: 1rem;
}

.task {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.description {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.due-date {
  color: #c0392b;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}

.actions {
  margin-top: 0.5rem;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6b;
}
</style>
