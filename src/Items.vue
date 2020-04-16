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
      <v-container fluid class="fill-height" v-if="currentJourneyId !== ''">
        <v-container fluid class="fill-width">
          <v-btn @click="updateJourney">Update</v-btn>
        </v-container>
        <v-container fluid class="fill-width">
          <h2 v-if="errorMessages.length > 0">There is a problem</h2>
          <v-list v-if="errorMessages.length > 0">
            <v-list-item v-for="(error, index) in errorMessages" :key="index">
              <v-list-item-title>{{error.message}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-container>
        <component :is="interactionType" v-model="field"/>
      </v-container>
    </v-content>
  </div>
</template>

<script>

import ChoiceEditor from './components/controls/ChoiceEditor.vue'
import TextBlockEditor from './components/controls/TextBlockEditor.vue'
import PageEditor from './components/controls/PageEditor.vue'
import JouryneyEditor from './components/controls/JourneyEditor.vue'

export default {
  components: {
    'single-choice-input': ChoiceEditor,
    'multiple-choice-input': ChoiceEditor,
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
      interactionType: '',
      errorMessages: []
    }
  },
  created() {
    fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev'+'/journeys')
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
      this.errorMessages = [] 
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
      fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev'+'/journeys', {
        method: 'POST',
        body:JSON.stringify({label:"new journey", parent:"", doc:{"pages":[]}, type: "journey"})
      })
        .then((res) => res.json())
        .then((data) => {
          data.doc = JSON.parse(data.doc)
          this.journeys.push(data)
        })
        .catch((err)=>console.error(err))
    },
    deleteJourney() {
      fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev'+'/journeys/'+this.currentJourneyId, {
        method: 'DELETE'
      })
        .then((res) => res.json())
        .then(() =>  {
          let arr = this.journeys.filter((journey)=>{return journey.id !== this.currentJourneyId})
          this.journeys = arr
          this.currentJourneyId = ''
          this.currentJourney = {}
          this.field = {fieldType: "div"}
        })
        .catch((err)=>console.error(err))
    },
    updateJourney() {
      this.validateJourney()
      if(this.errorMessages.length === 0) {
        fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev'+'/journeys/'+this.currentJourney.id, {
          method: 'PUT',
          body:JSON.stringify({
            updates:[
              {
                paramName: "label", paramValue: this.currentJourney.label
              },
              {
                paramName: "parent", paramValue: this.currentJourney.parent
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
    },
    validateJourney() { 
      this.errorMessages = []  
      // validate journey
      this.hasValue("journey id",this.currentJourney.id);
      this.hasValue("journey label",this.currentJourney.label);
      this.hasValue("journey parent",this.currentJourney.parent);
      // validate pages 
      this.hasMinimum("journey pages",this.currentJourney.doc.pages, 1); // check there are pages
      this.currentJourney.doc.pages.forEach(page => {
        this.hasValue("page title", page.title);
        this.hasMinimum(page.title + " items",page.items, 1);
        // validate items
        page.items.forEach(item => {
          this.hasValue("item field type",item.fieldType);
          this.hasValue("item name",item.name);
          this.hasValue("item label",item.label);
          if(item.fieldType !== 'stimulus') {
              // validate choices
              this.hasMinimum("item choices",item.choices, 2);
              item.choices.forEach(choice => {
                this.hasValue("choice value",choice.value);
                //this.hasMinimum(item.name + " choice tags",choice.tags, 1);
            })
          }
        })
      })
    },
    hasValue(key,value) {
      if(!value){this.errorMessages.push({key:key, message:key + " cannot be empty"})}
    },
    hasMinimum(key,value,minLength) {
      if(value.length < minLength) {this.errorMessages.push({key:key, message:key + " require at least " + minLength + " value(s)"})}
    }
  }
}
</script>