<template>
  <div>
    <h2>Aufgabenliste</h2>
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        {{ task.description }} – erledigt: {{ task.done }}
      </li>
    </ul>
    <p v-else>Keine Aufgaben vorhanden</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    fetch('http://localhost:8080/todos')
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
  }
};
</script>

