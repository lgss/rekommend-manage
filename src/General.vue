<template> 
  <div >
  <v-container id="home-preview">
    <v-row>
      <v-col>
        <h1 class="float-left">LANDING PAGE PREVIEW</h1><br/>
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
        <v-col v-html="landing">
          
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn id="btn-home-start-assessment">Go to assessment</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Title" v-model="title"/> 
      </v-col>
      <v-col :md="12">
        <label>Theme colour</label>
        <v-color-picker v-model="color"/>
      </v-col>
      <v-col>
        <label>Landing content</label>
        <tiptap-vuetify v-model="landing" :extensions="extensions"/></v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn color="success">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
  
</template>

<script>
import {TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History} from 'tiptap-vuetify'
/* eslint-disable */
export default {
  components: {
    TiptapVuetify, 
    Heading, 
    Bold, 
    Italic, 
    Strike, 
    Underline, 
    Paragraph, 
    BulletList, 
    OrderedList, 
    ListItem, 
    Link, 
    Blockquote, 
    HardBreak, 
    HorizontalRule, 
    History
  },
  data() {
    return {
      extensions: [
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }], 
        Bold, 
        Italic, 
        Strike, 
        Underline, 
        Paragraph, 
        BulletList, 
        OrderedList, 
        ListItem, 
        Link, 
        Blockquote, 
        HardBreak, 
        HorizontalRule, 
        History
      ],
      loading: true,
      title: "",
      color: "#1F63A3",
      landing: "",
      emptyResults: ""
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