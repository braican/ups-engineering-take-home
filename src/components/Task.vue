<template>
  <div class="task" :class="{'completed': task.completed}">
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
  methods: {
    toggleStatus() {
      console.log('test');

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
