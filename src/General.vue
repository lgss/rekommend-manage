<template> 
  <div >
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      <v-list>
        <v-list-item color="primary" @click="changeView('theme')">Home</v-list-item>
        <v-list-item color="primary" @click="changeView('positive')">Positive outcome</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <component :is="interactionType"/>
    </v-content>
  </div>
</template>

<script>
import ThemeEditor from './components/controls/ThemeEditor.vue'
import PositiveEditor from './components/controls/PositiveEditor.vue'
/* eslint-disable */
export default {
  components: {
    'theme': ThemeEditor,
    'positive': PositiveEditor
  },
  data() {
    return {
      interactionType: ''
    }
  },
  methods: {
    changeView(view) {
      this.interactionType = view;
    }
  }
}
</script>