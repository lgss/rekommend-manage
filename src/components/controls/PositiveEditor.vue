<template>
  <v-container>
    <v-row id="home-preview">
      <v-col>
        <v-row>
          <v-col>
            <h1 class="float-left">PREVIEW</h1><br/>
          </v-col>
        </v-row>

        <v-card>
          <v-row>
            <v-col>
              <v-app-bar :color="appColor">
                <v-toolbar-title class="white--text"><b>{{appTitle}}</b></v-toolbar-title>
              </v-app-bar>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h2>{{title}}</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-html="content"></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn name='btn-start-again'>START AGAIN</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col md="12">
        <v-text-field label="Title" v-model="title"/> 
      </v-col>
      <v-col md="12">
        <html-editor :label="'Content'" v-model="content"/>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <v-btn @click="savePositive()" color="success">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
/* eslint-disable */
export default {
  name: 'PositiveEditor',
  created() {
    fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev' + '/config/general')
      .then(x => x.json())
      .then(x => {
        this.appTitle = x.title
        this.appColor = x.primary
      })
    fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev' + '/config/positive-outcome')
      .then(x => x.json())
      .then(x => {
        this.title = x.title
        this.content = x.content
        this.loading = false
      })
  },
  components: {
    'html-editor': HTMLEditor
  },
  data() {
    return {
      title: "",
      content: "",
      appTitle: "",
      appColor: "#1F63A3",
      loading: true,
      emptyResults: ""
    }
  },
  methods: {
    savePositive() {
      fetch('https://ckn8fyxtc3.execute-api.eu-west-2.amazonaws.com/dev' + '/config/positive-outcome', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content
        })
      })
    }
  }
}
</script>
<style scoped>
  #home-preview .v-card:hover {
    opacity: 0.5;
  }
  #home-preview {
    transform: matrix(.75, 0, 0, .75, 0, 0);
    text-align: center;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>