<template>
  <div id="app">
    <header>
      <h1 class="headline">
        UpDos
      </h1>

      <p class="trello-link">
        <a href="https://trello.com/b/W7hrJAdI/ups-engineering-take-home-project" target="_blank">Go to Trello board →</a>
      </p>
    </header>

    <main class="app-main">
      <div v-if="loading">
        <p>Loading</p>
      </div>

      <div v-else>
        <div class="tasklist tasklist-todo">
          <TaskList headline="Todo" />
        </div>
        <div class="tasklist tasklist-completed">
          <TaskList headline="For Review" completed />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// Import the global css.
import '@/styles/globals.scss';
import { mapState, mapActions } from 'vuex';
import TaskList from '@/components/TaskList';

export default {
  name: 'App',
  components: {
    TaskList,
  },
  computed: {
    ...mapState(['loading']),
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    ...mapActions(['getTasks']),
  },
};
</script>

<style lang="scss" scoped>
#app {
  padding: 2vw;
}

.app-main {
  margin-top: 2rem;
}

.trello-link {
  margin-top: 0.5em;
}
</style>
