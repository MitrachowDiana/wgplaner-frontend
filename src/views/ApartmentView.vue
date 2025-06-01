<template>
  <div class="apartment-view">
    <h2>Wohnungsdetails 🏠</h2>

    <div v-if="loading">Lade Daten...</div>

    <div v-else>
      <label for="name">Wohnungsname:</label>
      <input id="name" v-model="name" placeholder="z. B. Bärlin" />
      <button @click="handleSave">
        {{ flat.value && flat.value.id ? 'Aktualisieren' : 'Wohnung erstellen' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFlats, createFlat, updateFlat } from '../api/flatApi'

const flat = ref(null)
const name = ref('')
const loading = ref(true)

const loadFlats = async () => {
  try {
    const data = await getFlats()
    if (data.length > 0) {
      flat.value = data[0]
      name.value = flat.value.name

      // ID im localStorage speichern
      localStorage.setItem('flatId', flat.value.id)
    } else {
      flat.value = null
      name.value = ''
    }
  } catch (err) {
    console.error('Fehler beim Laden der Wohnung:', err)
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  try {
    if (!name.value.trim()) {
      alert('Bitte einen Wohnungsnamen eingeben')
      return
    }

    let savedFlat
    if (flat.value && flat.value.id) {
      savedFlat = await updateFlat(flat.value.id, { ...flat.value, name: name.value })
    } else {
      savedFlat = await createFlat({ name: name.value })
    }

    flat.value = savedFlat
    name.value = savedFlat.name

    // ID im localStorage aktualisieren
    localStorage.setItem('flatId', savedFlat.id)

    alert('Wohnung gespeichert!')
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    alert('Speichern fehlgeschlagen')
  }
}

onMounted(loadFlats)
</script>

<style scoped>
.apartment-view {
  margin-top: 2rem;
  text-align: center;
  color: #1a1a1a;
}

label {
  font-weight: bold;
  margin-right: 0.5rem;
  color: #1a1a1a;
}

input {
  padding: 0.4rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.4rem 1rem;
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
