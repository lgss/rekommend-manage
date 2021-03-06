<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1" v-model="drawer">
      <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-left </v-icon>
      <v-text-field v-model="searchText" filled label="Search" clearable ></v-text-field>
      <v-list>
        <v-list-item-group v-if="resources.length" v-model="resourceIndex" color="primary">
          <v-list-item v-for="(resource, i) in filteredResourceList" :key="i">
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
            <v-btn v-if="currentResource.id" @click="updateResource" :loading="updateLoading">Update</v-btn>
            <v-btn v-else @click="createResource">Save</v-btn>
            <v-btn @click="confirmDelete">Delete</v-btn>
          </v-btn-toggle>
        </v-container>
        <component ref="resourceComponent" :is="component" v-model="currentResource.doc"/>
      </v-container>
    </v-content>
  </div>
</template>


<script>
  import ResourceEditor from './components/controls/ResourceEditor'
  import {playerEndpoint, editorEndpoint} from '@/utils/endpoints.js'
  
  export default {
    components :{
      'resource-editor': ResourceEditor
    },
    data: () => ({
      resources: [],
      resourceIndex: -1,
      component: "resource-editor",
      endpoint: process.env.VUE_APP_API_ENDPOINT,
      drawer: true,
      searchText: "",
      updateLoading: false
    }),
    created() {
      fetch(playerEndpoint + '/resources')
      .then(res => res.json())
      .then(res => { this.resources = res })
    },
    computed: {
      currentResource() {
        return this.resources.length && this.resourceIndex > -1 ? this.resources[this.resourceIndex] : null
      },
      filteredResourceList() {
        if (!this.searchText) return this.resources;
        else
          return this.resources.filter((r) =>
            r.doc.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
      }
    },
    methods: {
      validate() {
        return this.$refs.resourceComponent.validate()
      },
      updateResource() {
        if (!this.validate()) return;
        this.updateLoading = true;
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
        fetch(`${editorEndpoint}/resources/${this.currentResource.id}`, putReq )
          .then(() => {
            this.$store.dispatch('doSnackbar', {text: "Changes saved successfully", colour: "success", icon: 'mdi-check-circle'})
          })
          .catch((err) => {
            console.error(err)
            this.$store.dispatch('doSnackbar', {text: "Changes have not been saved", colour: "error", icon: 'mdi-alert-circle'})
          })
          .finally(() => {
            this.updateLoading = false;
          })
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
        fetch(`${editorEndpoint}/resources`, req)
        .then((res)=> res.json())
        .then((res)=>{
          this.$set(this.resources, this.resourceIndex, res)
        })
        .catch(console.log)
      },
      confirmDelete() {
            this.$dialog
                .display(
                    "Delete Resource",
                    "Are you sure you want to delete this resource? This action cannot be undone",
                    [{text:'Cancel', color:''}, {text:'Yes, Delete', color:''}]
                )
                .then((result) => {
                    if (result === 1) this.deleteResource();
                });
        },
      deleteResource() {
        let delReq = {
          method: "DELETE"
        }
        fetch(`${editorEndpoint}/resources/${this.currentResource.id}`, delReq)
        .then(()=>{
          this.resources.splice(this.resourceIndex,1);
          this.resourceIndex = null;
          this.deleteConfirmation = false
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