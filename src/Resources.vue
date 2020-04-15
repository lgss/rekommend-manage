<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      <v-list v-if="resources.length">
        <!-- <v-select solo :items="resourceSets" v-model="currentResourceSetId" item-text="label" item-value="id" label="Resource"></v-select> -->
        <v-list-item-group v-model="resourceIndex" color="primary"> -->
          <v-list-item
            v-for="(resource, i) in resources" :key="i">
            <v-list-item-content>
              <v-list-item-title>Hello</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height" v-if="currentResource">
        <v-btn @click="updateResources">Update Resources</v-btn>
        <!-- <component :is="component" v-model="currentResource"/> -->
      </v-container>
    </v-content>
  </div>
</template>


<script>
  // import ResourceEditor from './components/controls/ResourceEditor'
  
  export default {
    components :{
      // 'resource-editor': ResourceEditor
    },
    data: () => ({
      resources: [],
      resourceIndex: 0,
      component: "resource-editor",
      endpoint: ''
    }),
    created() {
      fetch('https://0ynfhl6ndh.execute-api.eu-west-2.amazonaws.com/dev/resources')
      .then(res => res.json())
      .then(res => { this.resources = res })
    },
    computed: {
      currentResource() {
        return this.currentResourceSet && this.currentResourceSet.doc ? this.currentResourceSet.doc[this.resourceIndex] : null
      }
    },
    methods: {
      updateResources() {
        console.log("Update")
      }
    }
  }
</script>