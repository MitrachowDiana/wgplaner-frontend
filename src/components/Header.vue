<template>
  <h1>WG-Planer</h1>
  <nav class="nav-bar">
    <router-link to="/" exact-active-class="active">🏠 Start</router-link>
    <router-link to="/tasks" exact-active-class="active">✅ Aufgaben</router-link>
    <router-link to="/persons" exact-active-class="active">👥 Personen</router-link>
    <router-link to="/apartment" exact-active-class="active">🏢 Wohnung</router-link>
    <router-link to="/deadlines" exact-active-class="active">⏰ Fristen</router-link>
  </nav>
</template>

<style scoped>
.nav-bar {
  display: flex;
  gap: 1rem;
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ccc;
  justify-content: center;
}

.nav-bar a {
  text-decoration: none;
  font-weight: bold;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-bar a.active {
  background-color: #42b983;
  color: white;
}

h1{
  color: #43a047;
}
</style>
