<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="description">Aufgabe:</label>
      <input id="description" v-model="form.description" required />
    </div>

    <div>
      <label for="dueDate">Fällig am:</label>
      <input id="dueDate" type="date" v-model="form.dueDate" />
    </div>

    <div>
      <label for="roommate">Zuständig:</label>
      <select id="roommate" v-model="form.roommateId">
        <option :value="null">Niemand</option>
        <option v-for="person in roommates" :key="person.id" :value="person.id">
          {{ person.name }}
        </option>
      </select>
    </div>

    <button type="submit">{{ isEditing ? 'Aktualisieren' : 'Erstellen' }}</button>
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
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

input,
select {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6b;
}
</style>
