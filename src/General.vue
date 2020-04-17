<template> 
  <v-container>
    <v-row>
      <v-col>
        <v-app-bar :color="color">
          <v-toolbar-title class="white--text"><b>{{title}}</b></v-toolbar-title>
        </v-app-bar>
        <v-content v-html="landing" />
        <v-btn id="btn-home-start-assessment" >Go to assessment</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-subheader>Colour</v-subheader>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Title" v-model="title"/> 
      </v-col>
      <v-col>
        <v-color-picker v-model="color"/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

export default {
  data() {
    return {
      title: "techKNOW",
      color: "#1F63A3",
      landing: "",
      emptyResults: ""
    }
  }
}
</script>