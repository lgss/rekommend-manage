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
    <tiptap-vuetify v-model="$attrs.value.content" :extensions="extensions" />
  </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
  data() { 
    return {
      extensions: [
        History,
        Link,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      errorMessages: ''
    }
  },
  components: {
    TiptapVuetify
  }
}
</script>