<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <Header />

    <!-- TaskList nur auf der Startseite anzeigen -->
    <section v-if="route.path === '/' && tasks.length > 0" 
             class="max-w-6xl mx-auto px-4 mt-8 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <TaskList />
      </div>
    </section>

    <!-- Seiteninhalt über Routing -->
    <main class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'

const route = useRoute()
</script>

<style>
:root {
  --primary-color: #42b983;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-content {
  margin-top: 2rem;
}
</style>