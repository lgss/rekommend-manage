<template>
  <div>
    <v-navigation-drawer app absolute permanent fixed disable-resize-watcher :clipped="true" color="blue--lighten-1">
      <v-list>
        <v-list-item color="primary" @click="newJourney">
          <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          New journey
        </v-list-item>
        <v-divider/>
        <v-list-group v-for="(journey, index) in journeys" :key="'j' + index" prepend-icon="mdi-transit-connection-variant">
          <template v-slot:activator>
            <v-list-item-title @click="loadJourney(journey)">{{journey.label}}</v-list-item-title>
          </template>

          <v-list-group sub-group no-action v-for="(page, index) in journey.doc.pages" :key="index" append-icon="mdi-list-status">
            <template v-slot:activator>
              <v-list-item-title @click="loadEditor(page, 'page')">{{index + 1}}. {{page.title}}</v-list-item-title>
            </template>
            <v-list-item @click="loadEditor(item)" link v-for="(item, itemIndex) in page.items" :key="itemIndex">
              <v-list-item-title>{{itemType(item.fieldType)}}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-format-list-checks</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height">
          <div v-if="errorMessages.length > 0">
            <h2>There is a problem</h2>
            <ul>
              <li v-for="(error, index) in errorMessages" :key="index">
                {{error.message}}
              </li>
            </ul>
          </div>
        <component :is="interactionType" v-model="field"/>
      </v-container>
    </v-content>
  </div>
</template>

<script>

import PageEditor from './components/controls/PageEditor.vue'
import JourneyEditor from './components/JourneyEditor.vue'
import { itemTypeName, components as itemComponents } from './utils/itemTypes'

export default {
  components: {
    ...itemComponents,
    'page': PageEditor,
    'journey': JourneyEditor
  },
  data() {
    return {
      currentJourney: null,
      journeys: [],
      item: 1,
      field: {fieldType: "div"},
      interactionType: '',
      errorMessages: [],
      endpoint: process.env.VUE_APP_API_ENDPOINT
    }
  },
  created() {
    fetch(this.endpoint +'/journeys')
      .then(reply => reply.json())
      .then(data => {
        this.journeys = data
      })
  },
  methods: {
    itemType(typeName) {
      return itemTypeName(typeName)
    },
    journeySelector() {
      this.errorMessages = [] 
      //this.loadEditor(this.currentJourney,'journey')
    },

    loadJourney(journey) {
      this.loadEditor(journey, 'journey')
    },
    loadEditor(obj, fieldType) {
      this.field = obj
      this.interactionType = fieldType || obj.fieldType
    },
    newPage() {
      //this.currentJourney.doc.pages.push({title: "New page", items: []})
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
      //this.currentJourney = journey;
      this.journeySelector();
    },
    createJourney() {
      this.validateJourney()
      if(this.errorMessages.length) { return }
      fetch(this.endpoint+'/journeys', {
        method:"POST",
        headers: { "content-type":"application/json"},
        //body: JSON.stringify(this.currentJourney)
      })
      .then(res=>res.json())
      .then(j => {
        let index = this.journeys.indexOf(0) //this.currentJourney);
        this.$set(this.journeys,index,j)
        //this.currentJourney = this.journeys[index]
      })
    },
    deleteJourney(id) {
      if (id) {
        fetch(this.endpoint + '/journeys/' + id, {
          method: 'DELETE'
        })
        .then((res) => res.json())
        .then(() =>  {
          //this.journeys.splice(this.journeys.findIndex(j => j == this.currentJourney),1)
          //this.currentJourney = null
          this.journeySelector()
        })
        .catch((err)=>console.error(err))
      } else {
        this.journeys.splice(this.journeys.findIndex(j => j == this.currentJourney),1)
        //this.currentJourney = null;
        this.journeySelector()
      }    
    },
    updateJourney() {
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
        .then((res) => res.json())
        .catch((err)=>console.error(err))
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