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
        <v-list-item color="primary" @click="newResource">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>New Resource
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height" v-if="currentResource">
        <v-btn-toggle>
          <v-btn @click="saveResource">Save</v-btn>
          <v-btn @click="deleteResource">Delete</v-btn>
        </v-btn-toggle>
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
        console.log("updating resource")
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
      },
      createResource() {
        console.log("creating resource");
        let req = {
          method: "POST",
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentResource.doc)
        }
        console.log(req)
        fetch(this.endpoint+'/resources', req)
        .then((res)=> res.json())
        .then(console.log)
        .catch(console.log)
      },
      saveResource() {
        this.currentResource.id ? this.updateResource() : this.createResource(); 
      },
      deleteResource() {
        let delReq = {
          method: "DELETE"
        }
        fetch(this.endpoint + '/resources/' + this.currentResource.id, delReq)
        .then(()=>{
          this.resources.splice(this.resourceIndex,1);
          this.resourceIndex = null;
        })
      },
      newResource() {
        let item = {
          type: "resource",
          doc : {
            name: "New resource",
            content: "",
            includeTags: [],
            excludeTags: []
          }
        }
        this.resources.push(item);
        this.resourceIndex = this.resources.length - 1
      }
    }
  }
  
</script>