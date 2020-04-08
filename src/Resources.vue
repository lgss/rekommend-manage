<template>
  <v-row align="center">
    <v-navigation-drawer app absolute :clipped="true" color="blue--lighten-1">
      <v-list>
        <v-select solo :items="resourceSets" v-model="currentResourceSetId" item-text="label" item-value="id" label="Resource"></v-select>
        <v-list-item-group v-if="currentResourceSetId" v-model="resourceIndex" color="primary">
          <v-list-item
            v-for="(resource, i) in currentResourceSet.doc" :key="i">
            <v-list-item-content>
              <v-list-item-title v-html="resource.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      resourceSets: [],
      resourceIndex: 0,
      currentResourceSetId: null
    }),
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
      },
      currentResource() {
        return this.currentResourceSet.doc ? this.currentResourceSet.doc[this.resourceIndex] : null
      }
    }
  }
</script>