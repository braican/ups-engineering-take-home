<template>
  <div>
    <p>{{ task.name }}</p>
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
};
</script>


