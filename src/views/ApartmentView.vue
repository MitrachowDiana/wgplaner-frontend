<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
        Wohnungsdetails
      </h2>
    </div>

    <div v-if="loading" class="text-center py-12 card">
      <p class="text-gray-500 text-lg">Lade Daten...</p>
    </div>

    <div v-else class="card space-y-6">
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>

      <div class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Wohnungsname
          </label>
          <input 
            id="name" 
            v-model="name" 
            placeholder="z. B. Bärlin"
            class="input w-full"
          />
        </div>

        <button 
          @click="handleSave" 
          :disabled="saving"
          class="btn w-full"
        >
          {{ flat && flat.id ? 'Aktualisieren' : 'Wohnung erstellen' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFlats, createFlat, updateFlat } from '../api/flatApi'

const flat = ref(null)
const name = ref('')
const loading = ref(true)
const saving = ref(false)
const errorMessage = ref(null)

const loadFlats = async () => {
  try {
    const data = await getFlats()
    if (data.length > 0) {
      flat.value = data[0]
      name.value = flat.value.name
      localStorage.setItem('flatId', flat.value.id)
    } else {
      flat.value = null
      name.value = ''
    }
  } catch (err) {
    console.error('Fehler beim Laden der Wohnung:', err)
    errorMessage.value = 'Wohnung konnte nicht geladen werden.'
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  if (!name.value.trim()) {
    alert('Bitte einen Wohnungsnamen eingeben.')
    return
  }

  saving.value = true
  errorMessage.value = null

  try {
    let savedFlat
    if (flat.value && flat.value.id) {
      savedFlat = await updateFlat(flat.value.id, { ...flat.value, name: name.value })
    } else {
      savedFlat = await createFlat({ name: name.value })
    }

    flat.value = savedFlat
    name.value = savedFlat.name
    localStorage.setItem('flatId', savedFlat.id)

    alert('Wohnung gespeichert!')
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    errorMessage.value = 'Speichern fehlgeschlagen. Bitte versuche es erneut.'
  } finally {
    saving.value = false
  }
}

onMounted(loadFlats)
</script>