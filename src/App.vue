<template>
  <div class="app-container">
    <!-- Navigation -->
    <Header />

    <!-- Feste Aufgabenleiste (immer sichtbar) -->
    <section class="task-section">
      <TaskList />
    </section>

    <!-- Seiteninhalt (wechselt über Routing) -->
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'
</script>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* HEADER bleibt oben – gestylt in Header.vue */

.task-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #46aa69;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page-content {
  margin-top: 2rem;
}
</style>
