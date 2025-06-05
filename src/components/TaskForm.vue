<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="space-y-2">
        <label for="description" class="block text-sm font-medium text-gray-700">
          Aufgabe
        </label>
        <input 
          id="description" 
          v-model="form.description" 
          required
          class="input w-full"
          placeholder="Aufgabe beschreiben"
        />
      </div>

      <div class="space-y-2">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">
          Fällig am
        </label>
        <input 
          id="dueDate" 
          type="date" 
          v-model="form.dueDate"
          class="input w-full"
        />
      </div>

      <div class="space-y-2">
        <label for="roommate" class="block text-sm font-medium text-gray-700">
          Zuständig
        </label>
        <select 
          id="roommate" 
          v-model="form.roommateId"
          class="input w-full"
        >
          <option :value="null">Niemand</option>
          <option 
            v-for="person in roommates" 
            :key="person.id" 
            :value="person.id"
          >
            {{ person.name }}
          </option>
        </select>
      </div>
    </div>

    <button type="submit" class="btn w-full">
      {{ isEditing ? 'Aktualisieren' : 'Erstellen' }}
    </button>
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