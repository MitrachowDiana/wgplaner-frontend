<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFlats, createFlat, updateFlat } from '../api/flatApi'


interface Flat {
  id?: number
  name: string
}

const flat = ref<Flat | null>(null)
const name = ref('')
const loading = ref(true)

const loadFlats = async () => {
  try {
    const data = await getFlats()
    if (data.length > 0) {
      flat.value = data[0]
      name.value = flat.value.name
    } else {
      flat.value = null
      name.value = ''
    }
  } catch (err) {
    console.error('Fehler beim Laden:', err)
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

    if (flat.value && flat.value.id) {
      await updateFlat(flat.value.id, { ...flat.value, name: name.value })
    } else {
      await createFlat({ name: name.value })
    }

    await loadFlats() // 🔁 Neu laden, um Anzeige zu aktualisieren
    alert('Wohnung gespeichert!')
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    alert('Speichern fehlgeschlagen')
  }
}

onMounted(loadFlats)
</script>

<template>
  <div class="apartment-view">
    <h2>Wohnungsdetails 🏠</h2>

    <div v-if="loading">Lade Daten...</div>

    <div v-else>
      <label for="name">Wohnungsname:</label>
      <input id="name" v-model="name" placeholder="z. B. Bärlin" />
      <button @click="handleSave">
        {{ flat ? 'Aktualisieren' : 'Wohnung erstellen' }}
      </button>
    </div>
  </div>
</template>

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

p {
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

Zusätzlich müssen wir die API-Datei erstellen:
