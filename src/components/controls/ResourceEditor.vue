<template>
<v-container>
    <v-form ref="form" model="valid">
        <v-text-field 
            label="Name" 
            v-model="value.name"
            :rules="rules.name"
            :mandatory="true"
        />
        <html-editor
            label="Content"
            v-model="value.content"
            :rules="rules.content"
            :mandatory="true"
        />

        <div v-if="value.imgName">
            <v-text-field   v-model="value.imgName" label="Image" readonly></v-text-field>
            <v-btn color="primary" depressed  @click="removeImg"> Remove </v-btn>
        </div>
        <file-upload v-else ref="fileUpload"/>
        
        <v-text-field 
            label="Alternative image text" 
            v-model="value.imgAltText"
        />

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
import FileUpload from './FileUpload'

export default {
    name: 'ResourceEditor',
    data: () => ({
      valid: true,
      rules: {
          name : [
              v => (!!v & v != "New resource") || 'Name is required',
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
          excludeTags:[]
      }
    }),
    props: ['value'],
    methods: {
        validate() {
            return this.$refs.form.validate();
        },
        uploadImage() {
            return this.$refs.fileUpload.singleFileUpload()
                .then(x => {
                    if(x === null) {
                        return
                    } else {
                        return this.value.imgName = x
                    }
                })
        },
        removeImg() {
            //TODO: this also needs to remove the image from s3
            this.value.imgName = ""
        }
    },
    components: {
        'html-editor': HTMLEditor,
        'file-upload': FileUpload
    }

}
</script>