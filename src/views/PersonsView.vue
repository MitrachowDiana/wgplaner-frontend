<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
        Mitbewohner verwalten
      </h2>
    </div>

    <div v-if="!flatId" class="card bg-red-50 border-red-100">
      <p class="text-red-600 flex items-center">
        <span class="text-xl mr-2">⚠️</span>
        Bitte zuerst eine Wohnung unter "🏢 Wohnung" anlegen.
      </p>
    </div>

    <div v-else class="space-y-8">
      <div class="card">
        <PersonForm :modelValue="selectedPerson" @submit="handleSubmit" />
      </div>

      <div class="card">
        <PersonList
          :persons="persons"
          @edit="editPerson"
          @delete="deletePerson"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PersonForm from '../components/PersonForm.vue'
import PersonList from '../components/PersonList.vue'
import {
  getRoommates,
  addRoommate,
  updateRoommate,
  deleteRoommate
} from '../api/roommateApi.js'

const persons = ref([])
const selectedPerson = ref(null)
const flatId = ref(null)

const loadFlatId = () => {
  const storedId = localStorage.getItem('flatId')
  if (storedId) {
    flatId.value = parseInt(storedId)
  } else {
    console.warn('Keine Wohnung gefunden – bitte zuerst eine Wohnung erstellen.')
  }
}

const loadPersons = async () => {
  try {
    persons.value = await getRoommates()
  } catch (e) {
    console.error('Fehler beim Laden der Mitbewohner:', e)
  }
}

const handleSubmit = async (person) => {
  if (!flatId.value) {
    alert('Bitte zuerst eine Wohnung erstellen.')
    return
  }

  try {
    if (selectedPerson.value) {
      await updateRoommate(selectedPerson.value.id, person, flatId.value)
    } else {
      await addRoommate(person, flatId.value)
    }
    selectedPerson.value = null
    await loadPersons()
  } catch (e) {
    console.error('Fehler beim Speichern:', e)
    alert('Speichern fehlgeschlagen')
  }
}

const deletePerson = async (id) => {
  try {
    await deleteRoommate(id)
    await loadPersons()
  } catch (e) {
    console.error('Fehler beim Löschen:', e)
    alert('Löschen fehlgeschlagen')
  }
}

const editPerson = (person) => {
  selectedPerson.value = person
}

onMounted(async () => {
  loadFlatId()
  await loadPersons()
})
</script>