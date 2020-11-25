<template>
  <div>
    <v-navigation-drawer app absolute permanent fixed disable-resize-watcher :clipped="true" color="blue--lighten-1">
      <v-select :items="journeys" v-model="currentJourney" item-text="label" return-object label="Journey"  v-on:input="journeySelector"></v-select>
      <v-divider></v-divider>
      <v-container v-if="currentJourney">
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
      <v-container fluid class="fill-height" v-if="currentJourney">
        <v-container>
          <v-btn-toggle>
            <v-btn v-if="currentJourney.id" @click="updateJourney" :loading="updateLoading">Update</v-btn>
            <v-btn v-else @click="createJourney">Save</v-btn>
          </v-btn-toggle>
        </v-container>
        <v-container>
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
    <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimout"
      :color="snackbarColour"
    > {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>

import ChoiceEditor from './components/controls/ChoiceEditor.vue'
import TextBlockEditor from './components/controls/TextBlockEditor.vue'
import PageEditor from './components/controls/PageEditor.vue'
import JourneyEditor from './components/controls/JourneyEditor.vue'

export default {
  components: {
    'single-choice-input': ChoiceEditor,
    'multiple-choice-input': ChoiceEditor,
    'page': PageEditor,
    'stimulus': TextBlockEditor,
    'journey': JourneyEditor
  },
  data() {
    return {
      journeys: [],
      currentJourney: null,
      item: 1,
      field: {fieldType: "div"},
      interactionType: '',
      errorMessages: [],
      endpoint: process.env.VUE_APP_API_ENDPOINT,
      updateLoading: false,
      showSnackbar: false,
      snackbarColour: null,
      snackbarText: "",
      snackbarTimout: 2000
    }
  },
  created() {
    fetch(this.endpoint +'/journeys')
      .then(reply => reply.json())
      .then(data => {
        this.journeys = data.map(journey => {
          if (!journey.img) 
              journey.img = {}; 
          for (const page of journey.doc.pages) 
              for (let item of page.items)
                  if (!item.img)
                    item.img = {}       
          return journey})
      })
  },
  methods: {
    journeySelector() {
      this.errorMessages = [] 
      //let arr = this.journeys.filter((journey)=>{return journey.id == this.currentJourneyId})
      //this.currentJourney = arr[0]
      this.loadEditor(this.currentJourney,'journey')
    },
    loadEditor(obj, fieldType) {
      this.field = obj
      this.interactionType = fieldType || obj.fieldType
    },
    newPage() {
      this.currentJourney.doc.pages.push({title: "New page", items: []})
    },
    newJourney() {
      let journey = {
        label: "New Journey",
        img: {},
        doc: {
          pages: []
        }
      }
      this.journeys.push(journey)
      this.currentJourney = journey;
      this.journeySelector();
    },
    createJourney() {
      this.validateJourney()
      if(this.errorMessages.length) { return }
      fetch(this.endpoint+'/journeys', {
        method:"POST",
        headers: { "content-type":"application/json"},
        body: JSON.stringify(this.currentJourney)
      })
      .then(res=>res.json())
      .then(j => {
        let index = this.journeys.indexOf(this.currentJourney);
        this.$set(this.journeys,index,j)
        this.currentJourney = this.journeys[index]
      })
    },
    deleteJourney() {
      if (this.currentJourney.id) {
        fetch(this.endpoint+'/journeys/'+this.currentJourney.id, {
          method: 'DELETE'
        })
        .then((res) => res.json())
        .then(() =>  {
          this.journeys.splice(this.journeys.findIndex(j => j == this.currentJourney),1)
          this.currentJourney = null
          this.journeySelector()
        })
        .catch((err)=>console.error(err))
      } else {
        this.journeys.splice(this.journeys.findIndex(j => j == this.currentJourney),1)
        this.currentJourney = null;
        this.journeySelector()
      }    
    },
    updateJourney() {
      this.updateLoading = true;
      this.validateJourney()
      if(this.errorMessages.length === 0) {
        fetch(this.endpoint+'/journeys/'+this.currentJourney.id, {
          method: 'PUT',
          body:JSON.stringify({
            updates:[
              {
                paramName: "label", paramValue: this.currentJourney.label
              },
              {
                paramName: "doc", paramValue: (this.currentJourney.doc)
              },
              {
                paramName: "img", paramValue: (this.currentJourney.img)
              }
            ]
          })
        })
        .then((res) => {
          res.json();
          this.updateLoading = false;
          this.toast("✔️ Changes saved", "success")
        })
        .catch((err)=> {
          console.error(err);
          this.updateLoading = false;
          this.toast("❌ Changes have not been saved", "error")
        })
      }
    },
    validateJourney() { 
      this.errorMessages = []  
      // validate journey
      //this.hasValue("journey id",this.currentJourney.id);
      this.hasValue("journey label",this.currentJourney.label);
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
    },
    toast(message, colour) {
      this.showSnackbar = true;
      this.snackbarColour = colour;
      this.snackbarText = message;
    }
  }
}
</script>

<!-- this is a bit of hack but it fixes an issue where if you resize the viewport to a 
 width of less 1264px, it'll hide content behind the navigation drawer. I think it'<style scoped>
 a bug in Vuetify... -->
<style scoped>
  main {
    padding-left: 256px !important;
  }
</style>