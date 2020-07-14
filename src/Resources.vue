<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1" v-model="drawer">
      <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-left </v-icon>
      <v-list>
        <v-list-item-group v-if="resources.length" v-model="resourceIndex" color="primary">
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
    <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-right </v-icon>
    <v-content>
      <v-container fluid class="fill-height" v-if="currentResource">
        <v-container>
          <v-btn-toggle>
            <v-btn @click="validate">Validate</v-btn>
            <v-btn v-if="currentResource.id" @click="updateResource">Update</v-btn>
            <v-btn v-else @click="createResource">Save</v-btn>
            <v-btn @click="deleteResource">Delete</v-btn>
          </v-btn-toggle>
        </v-container>
        <component ref="resourceComponent" :is="component" v-model="currentResource.doc"/>
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
      endpoint: process.env.VUE_APP_API_ENDPOINT,
      drawer: true
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
      validate() {
        return this.$refs.resourceComponent.validate()
      },
      updateResource() {
        if (!this.validate()) return;
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
        fetch(this.endpoint+'/resources/'+this.currentResource.id, putReq )
          .then((res) => res.json())
          .catch((err)=>console.error(err))
      },
      createResource() {
        if (!this.validate()) return;
        let req = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentResource.doc)
        }
        fetch(this.endpoint+'/resources', req)
        .then((res)=> res.json())
        .then((res)=>{
          this.$set(this.resources, this.resourceIndex, res)
        })
        .catch(console.log)
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
            excludeTags: [],
            img: {}
          }
        }
        this.resources.push(item);
        this.resourceIndex = this.resources.length - 1
      }
    }
  }
  
</script>