<template>
  <div class="app-container">
    <!-- Navigation -->
    <Header />

    <!-- TaskList nur auf der Startseite ("/") anzeigen -->
    <section class="task-section" v-if="$route.path === '/'">
      <TaskList />
    </section>

    <!-- Seiteninhalt (per Routing) -->
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'

const $route = useRoute()
</script>
