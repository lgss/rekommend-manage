<template>
  <v-container>
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
    }
  },
  components: {
    TiptapVuetify
  }
}
</script>