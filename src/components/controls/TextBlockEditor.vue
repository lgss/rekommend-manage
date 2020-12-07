<template>
  <v-container>
    <b>{{typeName(value.fieldType)}}</b>
    <v-text-field
      ref="Name"
      v-model="value.name"
      :rules="[() => !!value.name || 'This field is required']"
      :error-messages="errorMessages"
      label="Name"
      placeholder="Enter a name"
      required
    ></v-text-field>
    <v-text-field
      ref="Label"
      v-model="value.label"
      :rules="[() => !!value.label || 'This field is required']"
      :error-messages="errorMessages"
      label="Label"
      placeholder="Enter a label"
      required
    ></v-text-field>
    <html-editor v-model="value.content"/>
  </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
import {itemTypeName} from '@/utils/itemTypes.js'

export default {
  data() { 
    return {
      errorMessages: ''
    }
  },
  components: {
    'html-editor' : HTMLEditor
  },
  methods: {
    typeName(typeId) {
      return itemTypeName(typeId)
    }
  },
  props: ['value']
}
</script>