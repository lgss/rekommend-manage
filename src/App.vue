<template>
  <v-app>
    <v-app-bar
      max-height="112px"
      color="primary"
      dark
    >
      <v-toolbar-title>{{ process.env.TITLE }} editor</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs grow v-model="tab">
          <v-tab key="general">General</v-tab>
          <v-tab key="parents">Journey Categories</v-tab>
          <v-tab key="journeys">Journeys</v-tab>
          <v-tab key="resources">Resources</v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
    <v-tabs-items v-model="tab" class="fill-height">
      <v-tab-item key="general">
        <General/>
      </v-tab-item>
      <v-tab-item key="parents">
          <parents/>
      </v-tab-item>
      <v-tab-item key="journeys">
          <Items/>
      </v-tab-item>
      <v-tab-item key="resources">
        <Resources/>
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import Parents from './Parents.vue';
import Items from './Items.vue';
import General from './General.vue';
import Resources from './Resources.vue';

export default {
  name: 'App',

  components: {
    General,
    Parents,
    Items,
    Resources
  },

  data: () => ({
    tab: 'journeys'
  })
};
</script>
