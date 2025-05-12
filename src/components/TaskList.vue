<template>
  <div class="task-list">
    <h2>Checklist</h2>

    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Neue Aufgabe..." />
      <button type="submit">Hinzufügen</button>
    </form>

    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id" :class="{ done: task.done }">
        <template v-if="editTaskId === task.id">
          <input v-model="editText" @keyup.enter="saveTask(task.id)" />
          <button class="cancel" @click="cancelEdit">Abbrechen</button>
        </template>
        <template v-else>
          <div class="task-content">
            <input type="checkbox" :checked="task.done" @change="toggleDone(task)" />
            <span>{{ task.description }}</span>
          </div>
          <div class="task-buttons">
            <button class="edit" @click="startEdit(task)">✏️</button>
            <button class="delete" @click="deleteTask(task.id)">🗑️</button>
          </div>
        </template>
      </li>
    </ul>
    <p v-else>Keine Aufgaben vorhanden</p>
  </div>
</template>

<script>
import './TaskList.css';

export default {
  data() {
    return {
      tasks: [],
      newTask: '',
      editTaskId: null,
      editText: ''
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      fetch(`${import.meta.env.VITE_API_URL}/tasks`)
          .then(res => res.json())
          .then(data => {
            this.tasks = data;
          });
    },
    addTask() {
      if (!this.newTask.trim()) return;

      fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.newTask,
          done: false
        })
      })
          .then(res => res.json())
          .then(() => {
            this.newTask = '';
            this.fetchTasks();
          });
    },
    deleteTask(id) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      }).then(() => this.fetchTasks());
    },
    startEdit(task) {
      this.editTaskId = task.id;
      this.editText = task.description;
    },
    cancelEdit() {
      this.editTaskId = null;
      this.editText = '';
    },
    saveTask(id) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.editText,
          done: false
        })
      })
          .then(res => res.json())
          .then(() => {
            this.editTaskId = null;
            this.editText = '';
            this.fetchTasks();
          });
    },
    toggleDone(task) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: task.description,
          done: !task.done
        })
      })
          .then(() => this.fetchTasks());
    }
  }
};
</script>


