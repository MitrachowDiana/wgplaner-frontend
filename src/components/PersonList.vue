<template>
  <div class="space-y-4">
    <div v-if="persons.length === 0" class="text-center py-6">
      <p class="text-gray-500">Noch keine Mitbewohner vorhanden.</p>
    </div>

    <div v-else class="space-y-2">
      <div v-for="person in persons" 
           :key="person.id" 
           class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <span class="text-gray-900 font-medium">{{ person.name }}</span>
        <div class="flex space-x-2">
          <button @click="$emit('edit', person)" 
                  class="btn-secondary !py-2 !px-3">✏️</button>
          <button @click="$emit('delete', person.id)" 
                  class="btn-secondary !py-2 !px-3">❌</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['persons'])
defineEmits(['edit', 'delete'])
</script>