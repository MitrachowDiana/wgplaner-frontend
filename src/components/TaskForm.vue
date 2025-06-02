<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <div class="form-row">
      <label for="description">Aufgabe:</label>
      <input id="description" v-model="form.description" required />

      <label for="dueDate">Fällig am:</label>
      <input id="dueDate" type="date" v-model="form.dueDate" />

      <label for="roommate">Zuständig:</label>
      <select id="roommate" v-model="form.roommateId">
        <option :value="null">Niemand</option>
        <option v-for="person in roommates" :key="person.id" :value="person.id">
          {{ person.name }}
        </option>
      </select>

      <button type="submit">{{ isEditing ? 'Aktualisieren' : 'Erstellen' }}</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getRoommates } from '../api/roommateApi.js'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['submit'])

const form = ref({
  description: '',
  dueDate: '',
  roommateId: null
})

const roommates = ref([])
const isEditing = ref(false)

const loadRoommates = async () => {
  roommates.value = await getRoommates()
}

onMounted(loadRoommates)

watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        form.value = {
          description: value.description || '',
          dueDate: value.dueDate || '',
          roommateId: value.roommate?.id || null
        }
        isEditing.value = true
      } else {
        form.value = {
          description: '',
          dueDate: '',
          roommateId: null
        }
        isEditing.value = false
      }
    },
    { immediate: true }
)

const onSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<style scoped>
.task-form {
  margin-top: 1rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

label {
  font-weight: bold;
}

input,
select {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 160px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover {
  background-color: #369f6b;
}
</style>
