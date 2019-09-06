<template>
  <div class="task" :class="{'completed': completed}">
    <button class="status-toggler" @click="toggleStatus" />
    <p class="task__name">
      {{ task.name }}
    </p>
    <p v-if="!completed" class="task__list">
      {{ 'For Review' === task.listname ? 'Sprint Backlog' : task.listname }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      completed: this.task.completed,
    };
  },
  methods: {
    toggleStatus() {
      const newCompletedStatus = !this.completed;

      this.completed = newCompletedStatus;

      if (newCompletedStatus) {
        this.completeTask(this.task);
      } else {
        this.uncompleteTask(this.task);
      }
    },

    ...mapActions(['completeTask', 'uncompleteTask']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

$toggler-size: 20px;

.task {
  margin-bottom: 1em;
  padding-left: #{$toggler-size * 2};
  position: relative;
}

.completed {
  opacity: .4;

  .task__name {
    text-decoration: line-through;
  }
}

.task__list {
  font-size: $fs--sm;
  font-weight: $fw--bold;
  margin-top: 0.25em;
}

.status-toggler {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: #{$toggler-size / -2};
  width: $toggler-size;
  height: $toggler-size;
  border: 2px solid #ccc;
  border-radius: 0;
  margin-right: 1em;
  cursor: pointer;

  .completed &:after {
    content: "\2713 ";
    position: absolute;
    left: 0;
    line-height: 1;
    top: 50%;
    margin-top: #{$toggler-size / -2};
    font-size: $toggler-size;
  }
}

</style>
