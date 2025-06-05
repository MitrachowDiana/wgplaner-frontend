<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="space-y-2">
      <label for="name" class="block text-sm font-medium text-gray-700">
        Name des Mitbewohners
      </label>
      <input 
        id="name"
        v-model="form.name" 
        placeholder="Name eingeben" 
        required
        class="input w-full"
      />
    </div>

    <button type="submit" class="btn w-full">
      {{ isEdit ? 'Ändern' : 'Hinzufügen' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['submit'])

const form = ref({ name: '' })
const isEdit = ref(false)

watch(() => props.modelValue, (val) => {
  if (val) {
    form.value = { ...val }
    isEdit.value = true
  } else {
    form.value = { name: '' }
    isEdit.value = false
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
  form.value = { name: '' }
  isEdit.value = false
}
</script>