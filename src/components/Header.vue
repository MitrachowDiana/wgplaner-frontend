<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
          WG-Planer
        </h1>
        
        <nav class="flex items-center space-x-1">
          <router-link 
            v-for="link in links" 
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ 'active': route.path === link.path }"
          >
            <span class="icon">{{ link.icon }}</span>
            <span class="text">{{ link.text }}</span>
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
  @apply flex items-center px-4 py-2 rounded-xl text-gray-600
         hover:text-gray-900 hover:bg-gray-100/80
         transition-all duration-300;
}

.nav-link .icon {
  @apply mr-2;
}

.nav-link.active {
  @apply bg-primary-100/80 text-primary-600;
}

@media (max-width: 640px) {
  .nav-link .text {
    @apply hidden;
  }
  
  .nav-link .icon {
    @apply mr-0 text-lg;
  }
}
</style>