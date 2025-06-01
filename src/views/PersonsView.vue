<template>
  <div>
    <h2 class="heading">Mitbewohner verwalten</h2>
    <PersonForm :modelValue="selectedPerson" @submit="handleSubmit" />
    <PersonList
        :persons="persons"
        @edit="editPerson"
        @delete="deletePerson"
    />
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

// Lade Flat-ID aus localStorage
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

  if (selectedPerson.value) {
    await updateRoommate(selectedPerson.value.id, person, flatId.value)
  } else {
    await addRoommate(person, flatId.value)
  }

  selectedPerson.value = null
  await loadPersons()
}

const deletePerson = async (id) => {
  await deleteRoommate(id)
  await loadPersons()
}

const editPerson = (person) => {
  selectedPerson.value = person
}

onMounted(async () => {
  loadFlatId()
  await loadPersons()
})
</script>

<style scoped>
.heading {
  color: black;
  text-align: left;
  margin-bottom: 1rem;
}
</style>
