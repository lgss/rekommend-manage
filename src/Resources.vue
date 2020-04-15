<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      <v-list v-if="resources.length">
        <v-list-item-group v-model="resourceIndex" color="primary">
          <v-list-item v-for="(resource, i) in resources" :key="i">
            <v-list-item-content>
              <v-list-item-title v-if="resource.doc" v-html="resource.doc.name">Hello</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height" v-if="currentResource">
        <v-btn @click="updateResource">Update Resources</v-btn>
        <component :is="component" v-model="currentResource.doc"/>
      </v-container>
    </v-content>
  </div>
</template>


<script>
  import ResourceEditor from './components/controls/ResourceEditor'
  
  export default {
    components :{
      'resource-editor': ResourceEditor
    },
    data: () => ({
      resources: [],
      resourceIndex: -1,
      component: "resource-editor",
      endpoint: 'https://0ynfhl6ndh.execute-api.eu-west-2.amazonaws.com/dev'
    }),
    created() {
      fetch(this.endpoint+'/resources')
      .then(res => res.json())
      .then(res => { this.resources = res })
    },
    computed: {
      currentResource() {
        return this.resources.length && this.resourceIndex > -1 ? this.resources[this.resourceIndex] : null
      }
    },
    methods: {
      updateResource() {
        let putReq = {
          method: 'PUT',
          body:JSON.stringify({
            updates:[
              {
                paramName: "doc", paramValue: this.currentResource.doc
              }
            ]
          })
        }
        console.log(putReq)
        fetch(this.endpoint+'/resources/'+this.currentResource.id, putReq )
        .then((res) => res.json())
        .catch((err)=>console.error(err))
      }
    }
  }
  
</script>