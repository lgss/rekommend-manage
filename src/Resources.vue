<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      
      <v-select :items="resourceSets" v-model="currentResourceSetId" item-text="label" item-value="id" label="Resource"  v-on:input="resourceSelector"></v-select>

      <v-divider></v-divider>

      <v-container v-if="currentResourceSetId !== ''">
        <v-list-group v-for="(resource, index) in currentResourceSet.doc" :key="index">
          <template v-slot:activator>
            <v-list-item-title @click="loadEditor(page, 'page')">{{resource.name}}</v-list-item-title>
          </template>
          <!-- <v-list-item @click="loadEditor(item)" link v-for="(item, itemIndex) in page.items" :key="itemIndex">
            <v-list-item-title>{{item.fieldType}}</v-list-item-title>
            <v-list-item-subtitle>{{item.label}}</v-list-item-subtitle>
          </v-list-item> -->
        </v-list-group>
        <!-- <v-list-item color="primary" @click="newPage" >
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
        </v-list-item> -->
        <v-divider></v-divider>
      </v-container>
      <!-- <v-list-item color="primary" @click="newJourney">
        <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        New journey
      </v-list-item> -->
    </v-navigation-drawer>
    <!-- <v-content>
      <v-container fluid class="fill-height" v-if="currentJourneyId !== ''">
        <v-btn @click="updateJourney">Update</v-btn>
        <component :is="interactionType" v-model="field"/>
      </v-container>
    </v-content> -->
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      resourceSets: [],
      currentResourceSetId: '',
      item: 1,
      field: {fieldType: "div"},
      interactionType: ''
    }
  },
  created() {
    fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/resources')
    .then(response => response.json())
    .then(rs => rs.map(r => {
        r.doc = JSON.parse(r.doc).resources;
        return r;
    }))
    .then(rs => {
      this.resourceSets = rs;
      if (this.resourceSets.length == 1) {
        this.currentResourceSetId = this.resourceSets.find(Boolean).id;
      }
    })
  },
  computed: {
    currentResourceSet() {
      return this.resourceSets.find(set => set.id == this.currentResourceSetId)
    }
  },
  methods: {
    //resourceSelector() {
      //console.log("resource selected");
      ////let arr = this.resourceSets.filter()
    //},
    // journeySelector() {
    //   let arr = this.journeys.filter((journey)=>{return journey.id == this.currentJourneyId})
    //   this.currentJourney = arr[0]
    //   this.loadEditor(this.currentJourney,'journey')
    // },
    // loadEditor(obj, fieldType) {
    //   this.field = obj
    //   this.interactionType = fieldType || obj.fieldType
    // },
    // copy() {
    //   // navigator.clipboard.writeText(JSON.stringify(this.pages, null, 2))
    // },
    // newPage() {
    //   this.currentJourney.doc.pages.push({title: "New page", items: []})
    // },
    // newJourney() {
    //   fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys', {
    //     method: 'POST',
    //     body:JSON.stringify({label:"new journey",doc:{"pages":[]}, type: "journey"})
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       data.doc = JSON.parse(data.doc)
    //       this.journeys.push(data)
    //     })
    //     .catch((err)=>console.error(err))
    // },
    // deleteJourney() {
    //   fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.currentJourneyId, {
    //     method: 'DELETE'
    //   })
    //     .then((res) => res.json())
    //     .then(() =>  {
    //       let arr = this.journeys.filter((journey)=>{return journey.id !== this.currentJourneyId})
    //       this.journeys = arr
    //       this.currentJourneyId = ''
    //       this.currentJourney = {}
    //       this.field = {fieldType: "div"}
    //     })
    //     .catch((err)=>console.error(err))
    // },
    // updateJourney() {
    //   fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.currentJourney.id, {
    //       method: 'PUT',
    //       body:JSON.stringify({
    //         updates:[
    //           {
    //             paramName: "label", paramValue: this.currentJourney.label
    //           },
    //           {
    //             paramName: "doc", paramValue: JSON.stringify(this.currentJourney.doc)
    //           }
    //         ]
    //       })
    //   })
    //       .then((res) => res.json())
    //       .catch((err)=>console.error(err))
    // }
  }
}
</script>