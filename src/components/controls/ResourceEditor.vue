<template>
<v-container>
    <v-form ref="form" model="valid">
        <v-text-field 
            label="Name" 
            v-model="value.name"
            :rules="rules.name"
        />
        <html-editor
            label="Content"
            v-model="value.content"
            :rules="rules.content"
        />
        <v-textarea 
            label="Content"
            v-model="value.content"
            :rules="rules.content"
        />
        <v-combobox
            label="Include tags"
            v-model="value.includeTags"
            :rules="rules.includeTags"
            chips
            clearable
            multiple
            solo
        />
        <v-combobox
            label="Exclude tags"
            v-model="value.excludeTags"
            :rules="rules.excludeTags"
            chips
            clearable
            multiple
            solo
        />
    </v-form>
</v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'

export default {
    name: 'ResourceEditor',
    data: () => ({
      valid: true,
      rules: {
          name : [
              v => !!v || 'Name is required',
              v => (v && v.length <= 200) || 'Name must be less than 200 characters',
              v => !(/^[ \t]+/.test(v)) || 'Name must not begin with an empty space'
          ],
          content: [
              v => (!!v || v=="<p></p>") || 'Content is required',
              v => !(/^[ \t]+/.test(v)) || 'Content must not begin with an empty space',
          ],
          includeTags:[
              v => (v && v.length) || 'At least one tag is required'
          ],
          excludeTags:[]
      }
    }),
    props: ['value'],
    methods: {
        validate() {
            return this.$refs.form.validate();
        }
    },
    components: {
        'html-editor': HTMLEditor
    }

}
</script>