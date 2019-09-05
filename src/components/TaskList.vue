<template>
  <section>
    <h3 class="list-header">
      Todo
    </h3>
    <ul v-if="tasks">
      <li v-for="task in tasks" :key="task.id">
        <Task :task="task" />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Task from '@/components/Task';

export default {
  name: 'TaskList',
  components: {
    Task,
  },
  computed: {
    ...mapState(['tasks']),
  },
};
</script>
