<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Navigation -->
    <Header />

    <!-- TaskList nur auf der Startseite anzeigen -->
    <section v-if="route.path === '/' && tasks.length > 0"
             class="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
      <div class="card space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900">Aktuelle Aufgaben</h2>
        <TaskList />
      </div>
    </section>

    <!-- Seiteninhalt über Routing -->
    <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'
import { getTasks } from './api/taskApi'

const route = useRoute()
const tasks = ref([])

onMounted(async () => {
  tasks.value = await getTasks()
})
</script>