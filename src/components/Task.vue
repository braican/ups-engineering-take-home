<template>
  <div class="task" :class="{'completed': completed}">
    <button class="status-toggler" @click="toggleStatus" />
    <span>{{ task.name }}</span>
  </div>
</template>

<script>
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
      console.log(newCompletedStatus);


    },
  },
};
</script>

<style lang="scss" scoped>
$toggler-size: 20px;

.task {
  margin-bottom: .5em;
}

.completed {
  text-decoration: line-through;
  opacity: .4;
}

.status-toggler {
  position: relative;
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
