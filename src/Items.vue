<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      
      <v-select :items="journeys" v-model="currentJourneyId" item-text="label" item-value="id" label="Journey"  v-on:input="journeySelector"></v-select>

      <v-divider></v-divider>

      <v-container v-if="currentJourneyId !== ''">
        <v-list-group v-for="(page, index) in currentJourney.doc.pages" :key="index">
          <template v-slot:activator>
            <v-list-item-title @click="loadEditor(page, 'page')">Page {{index + 1}} - {{page.title}}</v-list-item-title>
          </template>
          <v-list-item @click="loadEditor(item)" link v-for="(item, itemIndex) in page.items" :key="itemIndex">
            <v-list-item-title>{{item.fieldType}}</v-list-item-title>
            <v-list-item-subtitle>{{item.label}}</v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
        <v-list-item color="primary" @click="newPage" >
          <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
          New page
        </v-list-item>
        <v-list-item @click="copy">
          <v-list-item-icon>
              <v-icon>mdi-content-copy</v-icon>
          </v-list-item-icon>
          Copy JSON
        </v-list-item>
        <v-list-item color="primary" @click="deleteJourney">
          <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
          Delete journey
        </v-list-item>
        <v-divider></v-divider>
      </v-container>
      <v-list-item color="primary" @click="newJourney">
        <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        New journey
      </v-list-item>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height">
        <v-btn @click="updateJourney" v-if="currentJourneyId !== ''">Update</v-btn>
        <component :is="interactionType" v-model="field"/>
      </v-container>
    </v-content>
  </div>
</template>

<script>

import SingleChoiceEditor from './components/controls/SingleChoiceEditor.vue'
import TextBlockEditor from './components/controls/TextBlockEditor.vue'
import PageEditor from './components/controls/PageEditor.vue'
import JouryneyEditor from './components/controls/JourneyEditor.vue'

export default {
  components: {
    'single-choice-input': SingleChoiceEditor,
    'multiple-choice-input': SingleChoiceEditor,
    'page': PageEditor,
    'stimulus': TextBlockEditor,
    'journey': JouryneyEditor
  },
  data() {
    return {
      journeys: [],
      currentJourneyId: '',
      currentJourney: {},
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
        this.journeys.forEach(journey => {
          journey.doc = JSON.parse(journey.doc)
        })
      })
  },
  methods: {
    journeySelector() {
      let arr = this.journeys.filter((journey)=>{return journey.id == this.currentJourneyId})
      this.currentJourney = arr[0]
      this.loadEditor(this.currentJourney,'journey')
    },
    loadEditor(obj, fieldType) {
      this.field = obj
      this.interactionType = fieldType || obj.fieldType
    },
    copy() {
      // navigator.clipboard.writeText(JSON.stringify(this.pages, null, 2))
    },
    newPage() {
      this.currentJourney.doc.pages.push({title: "New page", items: []})
    },
    newJourney() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys', {
        method: 'POST',
        body:JSON.stringify({label:"new journey",doc:{"pages":[]}, type: "journey"})
      })
        .then((res) => res.json())
        .then((data) =>  this.journeys.push(data))
        .catch((err)=>console.error(err))
    },
    deleteJourney() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.currentJourneyId, {
        method: 'DELETE'
      })
        .then((res) => res.json())
        .then(() =>  {
          let arr = this.journeys.filter((journey)=>{return journey.id !== this.currentJourneyId})
          this.journeys = arr
          this.currentJourneyId = ''
        })
        .catch((err)=>console.error(err))
    },
    updateJourney() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.currentJourney.id, {
          method: 'PUT',
          body:JSON.stringify({
            updates:[
              {
                paramName: "label", paramValue: this.currentJourney.label
              },
              {
                paramName: "doc", paramValue: JSON.stringify(this.currentJourney.doc)
              }
            ]
          })
      })
          .then((res) => res.json())
          .catch((err)=>console.error(err))
    }
  }
}
</script>