<template> 
  <div >
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1" v-model="drawer">
      <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-left </v-icon>
      <v-list>
        <v-list-item color="primary" @click="changeView('theme')">Home</v-list-item>
        <v-list-item color="primary" @click="changeView('positive')">Positive outcome</v-list-item>
        <v-list-item color="primary" @click="changeView('terms')">Terms and Conditions</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-right </v-icon>
    <v-content>
      <component :is="interactionType"/>
    </v-content>
  </div>
</template>

<script>
import ThemeEditor from './components/controls/ThemeEditor.vue'
import PositiveEditor from './components/controls/PositiveEditor.vue'
import TermsEditor from './components/controls/TermsEditor'
/* eslint-disable */
export default {
  components: {
    'terms': TermsEditor,
    'theme': ThemeEditor,
    'positive': PositiveEditor
  },
  data() {
    return {
      interactionType: '',
      drawer: true,
    }
  },
  methods: {
    changeView(view) {
      this.interactionType = view;
    }
  }
}
</script>