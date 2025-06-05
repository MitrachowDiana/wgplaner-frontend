<template>
  <div class="space-y-24">
    <!-- Hero Section -->
    <section class="text-center space-y-8 py-16">
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold">
        <span class="bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
          WG-Planer
        </span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        Organisiere dein WG-Leben elegant und effizient.
      </p>
    </section>

    <!-- Features Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">✅</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Aufgaben</h3>
        <p class="text-gray-600 mt-2">Verwalte Aufgaben und Verantwortlichkeiten mühelos.</p>
      </div>

      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">👥</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Mitbewohner</h3>
        <p class="text-gray-600 mt-2">Behalte den Überblick über alle WG-Mitglieder.</p>
      </div>

      <div class="card group">
        <div class="icon-wrapper group-hover:scale-110">⏰</div>
        <h3 class="text-xl font-semibold text-gray-900 mt-6">Fristen</h3>
        <p class="text-gray-600 mt-2">Verpasse keine wichtigen Termine mehr.</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16">
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Einfach</div>
            <p class="mt-2 text-gray-600">Intuitive Bedienung</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Effizient</div>
            <p class="mt-2 text-gray-600">Schnelle Organisation</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">Modern</div>
            <p class="mt-2 text-gray-600">Zeitgemäßes Design</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon-wrapper {
  @apply text-4xl flex items-center justify-center w-16 h-16 
         rounded-2xl bg-primary-100 text-primary-600 mx-auto
         transition-all duration-300;
}

.card {
  @apply p-8 text-center;
}
</style>