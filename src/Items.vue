<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      <v-select :items="journeys" v-model="journey" item-text="label" item-value="id" label="Journey"  v-on:input="journeySelector(`${journey.id}`)"></v-select>
      <v-divider></v-divider>

      <v-list-group v-for="(page, index) in pages.pages" :key="index">
        <template v-slot:activator>
          <v-list-item-title @click="loadEditor(page, 'page')">Page {{index + 1}} - {{page.title}}</v-list-item-title>
        </template>

        <v-list-item @click="loadEditor(item)" link v-for="(item, itemIndex) in page.items" :key="itemIndex">
          <v-list-item-title>{{item.fieldType}}</v-list-item-title>
          <v-list-item-subtitle>{{item.label}}</v-list-item-subtitle>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>
      </v-list-group>

      <v-list-item color="primary" @click="newPage">
        <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
        New page
      </v-list-item>

      <v-list-item color="primary" @click="newJourney">
        <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
        New journey
      </v-list-item>

      <v-list-item @click="copy">
        <v-list-item-title>Copy JSON</v-list-item-title>
      </v-list-item>

    </v-navigation-drawer>
    
    <v-content>
      <v-container fluid class="fill-height">
        <component :is="interactionType" v-model="field"/>
      </v-container>
    </v-content>

  </div>
</template>

<script>

import SingleChoiceEditor from './components/controls/SingleChoiceEditor.vue'
import TextBlockEditor from './components/controls/TextBlockEditor.vue'
import PageEditor from './components/controls/PageEditor.vue'

export default {
  components: {
    'single-choice-input': SingleChoiceEditor,
    'multiple-choice-input': SingleChoiceEditor,
    'page': PageEditor,
    'stimulus': TextBlockEditor
  },
  data() {
    return {
      pages: [],
      journeys: [],
      journey: {},
      item: 1,
      field: {fieldType: "div"},
      interactionType: ''
    }
  },
  created() {
    fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys')
      .then(y => y.json())
      .then(y => {
        this.journeys = y
        })
      .finally(() => {
        //console.log(this.journeys)
      })
  },
  methods: {
    journeySelector() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.journey)
        .then(x => x.json())
        .then(x => {this.pages = x})
        .finally(() => { 
          //this.loading = false
        })
    },
    loadEditor(obj, fieldType) {
      this.field = obj
      this.interactionType = fieldType || obj.fieldType
    },
    copy() {
      navigator.clipboard.writeText(JSON.stringify(this.pages, null, 2))
    },
    newPage() {
      this.pages.pages.push({title: "New page", items: []})
    },
    newJourney() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys', {
        method: 'POST',
        body:JSON.stringify({label:"new journey",doc:{"pages":[]}, type: "journey"})
      })
        .then((res) => res.json())
        .then((data) =>  this.journeys.push(data))
        .catch((err)=>console.error(err))
    }
  }
}
</script>