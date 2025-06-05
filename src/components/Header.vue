<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <h1 class="text-2xl font-bold text-primary-600">WG-Planer</h1>
        
        <nav class="flex space-x-6">
          <router-link 
            v-for="link in links" 
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ 'active': route.path === link.path }"
          >
            {{ link.icon }} {{ link.text }}
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { path: '/', text: 'Start', icon: '🏠' },
  { path: '/tasks', text: 'Aufgaben', icon: '✅' },
  { path: '/persons', text: 'Personen', icon: '👥' },
  { path: '/apartment', text: 'Wohnung', icon: '🏢' },
  { path: '/deadlines', text: 'Fristen', icon: '⏰' }
]
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200;
  text-decoration: none;
}

.nav-link.active {
  @apply bg-primary-100 text-primary-600;
}
</style>