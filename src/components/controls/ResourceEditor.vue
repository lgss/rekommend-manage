<template>
    <v-container>
        <v-form ref="form" model="valid">
            <v-text-field
                label="Name"
                v-model="value.name"
                :rules="rules.name"
                :mandatory="true"
            />
            <v-combobox
                label="Categories"
                v-model="value.categories"
                :rules="rules.categories"
                chips
                deletable-chips
                clearable
                multiple
                hint="Group matching resources by category. Resources with multiple categories will appear in each group."
            />
            <html-editor
                label="Content"
                v-model="value.content"
                :rules="rules.content"
                :mandatory="true"
            />
            <file-upload ref="fileUpload" v-model="value.img"/>
            <v-text-field
                label="Link to more info"
                v-model="value.moreInfoUrl"
                :rules="rules.url"
            />
            <v-combobox
                label="Include tags"
                v-model="value.includeTags"
                :rules="rules.includeTags"
                chips
                clearable
                multiple
                solo
                hint="Include the resource in results if any of these tags have been collected during the assessment."
            />
            <v-combobox
                label="Exclude tags"
                v-model="value.excludeTags"
                :rules="rules.excludeTags"
                chips
                clearable
                multiple
                solo
                hint="Exclude the resource from results if any of these tags have been collected during the assessment."
            />
        </v-form>
    </v-container>
</template>

<script>
import HTMLEditor from "./HTMLEditor";
import FileUpload from "./FileUpload";

export default {
    name: "ResourceEditor",
    data: () => ({
      valid: true,
      rules: {
          name : [
              v => (!!v && v != "New resource") || 'Name is required',
              v => (v && v.length <= 200) || 'Name must be less than 200 characters',
              v => !(/^[ \t]+/.test(v)) || 'Name must not begin with an empty space'
          ],
          content: [
            //   v => (!!v || v=="<p></p>") || 'Content is required',
              v => !(/^[ \t]+/.test(v)) || 'Content must not begin with an empty space',
          ],
          url: [],
          includeTags:[
              v => (!!v && v.length > 0) || 'At least one tag is required'
          ],
          excludeTags:[],
          categories: [
            (v) => (!!v && v.length > 0) || "At least one category is required"
          ],
        },
    }),
    props: ["value"],
    methods: {
        validate() {
            return this.$refs.form.validate();
        }
    },
    components: {
        "html-editor": HTMLEditor,
        "file-upload": FileUpload
    },
}
</script>
