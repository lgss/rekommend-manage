<template>
  <div>
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1" v-model="drawer">
      <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-left </v-icon>
      <v-list>
        <v-list-item-group v-if="parents.length" v-model="parentIndex" color="primary">
          <v-list-item v-for="(parent, i) in parents" :key="i">
            <v-list-item-content>
              <v-list-item-title v-if="parent.label" v-html="parent.label">Hello</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item color="primary" @click="newParent">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>New Category
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-icon large @click.stop="drawer = !drawer"> mdi-chevron-right </v-icon>
    <v-content>
      <v-container fluid class="fill-height" v-if="currentParent">
        <v-container>
          <v-btn-toggle>
            <v-btn @click="validate">Validate</v-btn>
            <v-btn v-if="currentParent.id" @click="updateParent" :loading="updateLoading">Update</v-btn>
            <v-btn v-else @click="createParent">Save</v-btn>
            <v-btn @click="deleteParent">Delete</v-btn>
          </v-btn-toggle>
        </v-container>
        <parent ref="parentComponent" v-model="currentParent"/>
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
  import ParentEditor from './components/controls/ParentEditor.vue'
  import {playerEndpoint, editorEndpoint} from '@/utils/endpoints.js'
  
  export default {
    components :{
      'parent': ParentEditor
    },
    data: () => ({
      parents: [],
      parentIndex: -1,
      drawer: true,
      updateLoading: false,
      showSnackbar: false,
      snackbarColour: null,
      snackbarText: "",
      snackbarTimout: 2000
    }),
    created() {
      fetch(playerEndpoint + '/journey-parents')
      .then(res => res.json())
      .then(res => { this.parents = res })
    },
    computed: {
      currentParent() {
        return this.parents.length && this.parentIndex > -1 ? this.parents[this.parentIndex] : null
      }
    },
    methods: {
      validate() {
        return this.$refs.parentComponent.validate()
      },
      updateParent() {
        if (!this.validate()) return;
        this.updateLoading = true;
        let putReq = {
          method: 'PUT',
          body:JSON.stringify({
            updates:[
              {
                paramName: "label", paramValue: this.currentParent.label
              },
              {
                paramName: "img", paramValue: this.currentParent.img
              },
              {
                paramName: "journeys", paramValue: this.currentParent.journeys
              },
            ]
          })
        }
        fetch(`${editorEndpoint}/journey-parent/${this.currentParent.id}`, putReq )
          .then((res) => {
            res.json();
            this.updateLoading = false;
            this.toast("✔️ Changes saved", "success")
          })
          .catch((err) => {
            console.error(err);
            this.updateLoading = false;
            this.toast("❌ Changes have not been saved", "error")
          })
      },
      createParent() {
        let req = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentParent)
        }
        fetch(`${playerEndpoint}/journey-parent`, req)
        .then((res)=> res.json())
        .then((res)=>{
          this.$set(this.parents, this.parentIndex, res)
        })
        .catch(console.log)
      },
      deleteParent() {
        let delReq = {
          method: "DELETE"
        }
        fetch(`${editorEndpoint}/journey-parent/${this.currentParent.id}`, delReq)
        .then(()=>{
          this.parents.splice(this.parentIndex,1);
          this.parentIndex = null;
        })
      },
      newParent() {
        let item = {
          label: "New parent",
          img: {},
          journeys:[],
          type: "parent"
        }
        this.parents.push(item);
        this.parentIndex = this.parents.length - 1
      },
      toast(message, colour) {
        this.showSnackbar = true;
        this.snackbarColour = colour;
        this.snackbarText = message;
      }
    }
  }
  
</script>