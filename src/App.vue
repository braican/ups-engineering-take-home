<template>
  <div id="app">
    <header>
      <h1 class="headline">
        UpDos
      </h1>
    </header>
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
      info: null,
    };
  },
  async mounted() {
    const cards = await trello.getTasks();

    console.log(cards);

  },
};
</script>

<style>
#app {
  padding: 2vw;
}
</style>
