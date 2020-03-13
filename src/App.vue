<template>
  <v-app>
    <v-app-bar
      max-height="112px"
      color="primary"
      dark
    >
      <template v-slot:extension>
        <v-tabs align-with-title v-model="tab">
          <v-tab key="general">General</v-tab>
          <v-tab key="journeys">Journeys</v-tab>
          <v-tab key="resources">Resources</v-tab>
        </v-tabs>
      </template>
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
    <v-tabs-items v-model="tab">
      <v-tab-item key="general">
        erg
      </v-tab-item>
      <v-tab-item key="journeys">
          <Items/>
      </v-tab-item>
      <v-tab-item key="resources">
      </v-tab-item>
    </v-tabs-items>
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
    tab: 'journeys'
  }),
};
</script>
