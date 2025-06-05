<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center space-y-8">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
          WG-Planer
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Organisiere dein WG-Leben elegant und effizient.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div class="feature-card">
          <div class="icon-wrapper">✅</div>
          <h3 class="text-xl font-semibold text-gray-900 mt-4">Aufgaben</h3>
          <p class="text-gray-600 mt-2">Verwalte Aufgaben und Verantwortlichkeiten mühelos.</p>
        </div>

        <div class="feature-card">
          <div class="icon-wrapper">👥</div>
          <h3 class="text-xl font-semibold text-gray-900 mt-4">Mitbewohner</h3>
          <p class="text-gray-600 mt-2">Behalte den Überblick über alle WG-Mitglieder.</p>
        </div>

        <div class="feature-card">
          <div class="icon-wrapper">⏰</div>
          <h3 class="text-xl font-semibold text-gray-900 mt-4">Fristen</h3>
          <p class="text-gray-600 mt-2">Verpasse keine wichtigen Termine mehr.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  @apply p-6 rounded-2xl bg-white shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl;
  backdrop-filter: blur(20px);
}

.icon-wrapper {
  @apply text-4xl flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mx-auto;
}
</style>