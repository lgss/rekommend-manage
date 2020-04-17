<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
        <v-list-item @click="loadEditor('theme')" link>
          <v-list-item-title>Theme</v-list-item-title>
        </v-list-item>
        <v-list-item @click="loadEditor('terms')" link>
          <v-list-item-title>Terms & Conditions</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height">
        <component :is="interactionType"/>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import ThemeEditor from './components/controls/ThemeEditor.vue'
import TermsEditor from './components/controls/TermsEditor.vue'

export default {
  components: {
    'theme': ThemeEditor,
    'terms': TermsEditor
  },
  data() {
    return {
      interactionType: ''
    }
  },
  methods: {
    loadEditor(fieldType) {
      this.interactionType = fieldType
    },
  }
  
}
</script>