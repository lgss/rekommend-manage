<template>
  <v-container>
    <v-text-field
      ref="Name"
      v-model="$attrs.value.name"
      :rules="[() => !!$attrs.value.name || 'This field is required']"
      :error-messages="errorMessages"
      label="Name"
      placeholder="Enter a name"
      required
    ></v-text-field>
    <v-text-field
      ref="Label"
      v-model="$attrs.value.label"
      :rules="[() => !!$attrs.value.label || 'This field is required']"
      :error-messages="errorMessages"
      label="Label"
      placeholder="Enter a label"
      required
    ></v-text-field>
    <html-editor v-model="$attrs.value.content"/>
  </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
export default {
  data() { 
    return {
      errorMessages: ''
    }
  },
  components: {
    'html-editor' : HTMLEditor
  }
}
</script>