<template>
  <form @submit.prevent="handleSubmit" class="person-form">
    <input v-model="form.name" placeholder="Name" required />
    <button type="submit">{{ isEdit ? 'Ändern' : 'Hinzufügen' }}</button>
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

