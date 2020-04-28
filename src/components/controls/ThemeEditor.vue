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
              <v-app-bar :color="color">
                <v-toolbar-title class="white--text"><b>{{title}}</b></v-toolbar-title>
              </v-app-bar>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-html="landing"></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn id="btn-home-start-assessment">Go to assessment</v-btn>
            </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col md="6">
        <v-text-field label="Title" v-model="title"/> 
      </v-col>
      <v-col>
        <label>Theme colour</label>
        <v-color-picker mode="hexa" v-model="color"/>
      </v-col>
      <v-col md="12">
        <html-editor :label="'Landing content'" v-model="landing"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn @click="saveGeneral()" color="success">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
/* eslint-disable */
export default {
  name: 'ThemeEditor',
  created() {
    fetch('https://nngfac1fjl.execute-api.eu-west-2.amazonaws.com/dev' + '/config/general')
      .then(x => x.json())
      .then(x => {
        this.title = x.title
        this.landing = x.landing
        this.color = x.primary
        this.loading = false
      })
  },
  components: {
    'html-editor' : HTMLEditor
  },
  data() {
    return {
      title: "",
      landing: "",
      color: "#1F63A3",
      loading: true,
      emptyResults: ""
    }
  },
  methods: {
    saveGeneral() {
      fetch('https://ckn8fyxtc3.execute-api.eu-west-2.amazonaws.com/dev' + '/config/general', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          primary: this.color,
          landing: this.landing,
          title: this.title 
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