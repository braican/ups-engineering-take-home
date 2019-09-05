<template>
  <section>
    <h3 class="list-header">
      {{ headline }}
    </h3>
    <ul v-if="tasks">
      <li v-for="task in tasks" :key="task.id">
        <Task :task="task" />
      </li>
    </ul>
  </section>
</template>

<script>
import Task from '@/components/Task';

export default {
  name: 'TaskList',
  components: {
    Task,
  },
  props: {
    headline: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tasks() {
      return this.completed ? this.$store.getters.completedTasks : this.$store.getters.incompleteTasks;
    },
  },
};
</script>
