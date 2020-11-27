<template>
    <v-container>
        <v-form ref="form" model="valid">
            <v-row>
                <v-col>
                    Resource name or title
                    <div class="v-label theme--light">
                        🛈 Will help user identify the resource
                    </div>
                    <v-text-field
                        v-model="value.name"
                        :rules="rules.name"
                        :mandatory="true"
                    />
                </v-col>
                <v-col>
                    Resource category
                    <div class="v-label theme--light">
                        🛈 Will help user identify what situation the resource can help them in
                    </div>
                    <v-combobox
                        label=""
                        v-model="value.categories"
                        :rules="rules.categories"
                        chips
                        deletable-chips
                        clearable
                        multiple
                        hint="Group matching resources by category. Resources with multiple categories will appear in each group."
                    />
                </v-col>
            </v-row>
            
            Resource description
            <html-editor
                label="🛈 Brief description of what the resource does and what it should help the user with"
                v-model="value.content"
            />
            <v-row>
                <v-col>
                    Resource logo
                    <div class="v-label theme--light">
                        🛈 Will help user identify the resource
                    </div>
                    <file-upload 
                        label=""
                        ref="fileUpload" 
                        v-model="value.img"
                    />
                </v-col>
                <v-col>
                    Resource link
                    <div class="v-label theme--light">
                        🛈 Link is displayed as a button which when clicked will open a new tab
                    </div>
                    <v-text-field
                        v-model="value.moreInfoUrl"
                        :rules="rules.url"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Include tags
                </v-col>
                <v-col>
                    Exclude tags
                </v-col>
                </v-row>
            <v-row>
                <div class="v-label theme--light" style="padding-left:12px">
                    🛈 Tags are how we link an answer to a resource. Include tags when matched with tags in questions will make the resource appear. Exclude tags will do the opposite
                </div>
            </v-row>
            <v-row>
                <v-col>
                    
                    <v-combobox
                        label=""
                        v-model="value.includeTags"
                        :rules="rules.includeTags"
                        chips
                        clearable
                        multiple
                        solo
                        hint="Include the resource in results if any of these tags have been collected during the assessment."
                    />
                </v-col>
                <v-col>
                    <v-combobox
                        label=""
                        v-model="value.excludeTags"
                        :rules="rules.excludeTags"
                        chips
                        clearable
                        multiple
                        solo
                        hint="Exclude the resource from results if any of these tags have been collected during the assessment."
                    />
                </v-col>
            </v-row>
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
    watch: {
        value: function() {
            if (!this.value.img)
                this.value.img = {}
        }
    },
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
