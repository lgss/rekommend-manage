<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Rekommend Management</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://lgss.github.io/techknow"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Items/>
    </v-content>
  </v-app>
</template>

<script>
import Items from './Items.vue';

export default {
  name: 'App',

  components: {
    Items,
  },

  data: () => ({
    //
  }),
};
</script>
