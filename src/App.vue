<template>
  <div id="app">
    <header>
      <h1 class="headline">
        UpDos
      </h1>
    </header>

    <section>
      <h3>Todo</h3>
      <ul v-if="tasks">
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// Import the global css.
import '@/styles/globals.scss';

import trello from '@/services/Trello';

export default {
  name: 'App',
  data() {
    return {
      tasks: null,
    };
  },
  async mounted() {
    const tasks = await trello.getClientTasks();

    this.tasks = tasks;
  },
};
</script>

<style>
#app {
  padding: 2vw;
}
</style>
