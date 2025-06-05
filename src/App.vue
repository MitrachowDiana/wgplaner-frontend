<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Navigation -->
    <Header />

    <!-- Seiteninhalt über Routing -->
    <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
