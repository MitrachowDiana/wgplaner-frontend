<template>
  <ul class="person-list">
    <li v-for="person in persons" :key="person.id" class="person-item">
      <span>{{ person.name }}</span>
      <div class="buttons">
        <button @click="$emit('edit', person)">✏️</button>
        <button @click="$emit('delete', person.id)">❌</button>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps(['persons'])
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.person-list {
  list-style: none;
  padding: 0;
}

.person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ffffff;
}

.buttons button {
  margin-left: 0.5rem;
}
</style>

