<template>
  <v-container >
    <h2>Terms Editor</h2>
    <v-container v-if="terms !== undefined"> terms</v-container >
    <v-container v-else> 
      <v-card-text class="text-center">
        <v-btn color="primary" @click="newTerms">New</v-btn>
      </v-card-text>
     </v-container >
    
  </v-container>
</template>

<script>

export default {
  name: 'TermsEditor',
  data() {
    return {
      terms: {}
    }
  },
  created() {
    fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/terms')
      .then(data => data.json())
      .then(results => {
        console.log(results)
        if (results !== []) {
          this.terms = results[0]
        }
      })
      .finally(() => {
        // something
      })
  },
  methods: {
    newTerms() {
      fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/terms', {
        method: 'POST',
        body:JSON.stringify({label:"terms",doc:{"pages":[]}, type: "terms"})
      })
        .then((res) => res.json())
        .then((data) => {
          data.doc = JSON.parse(data.doc)
          this.terms =data
        })
        .catch((err)=>console.error(err))
    }
  }
}
</script>