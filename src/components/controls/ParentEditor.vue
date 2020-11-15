<template>
    <v-container>
        <v-form ref="form" model="valid">
            <v-text-field
                label="label"
                v-model="value.label"
                :rules="rules.label"
                :mandatory="true"
            />
            <file-upload ref="fileUpload" v-model="value.img"/>

            <v-autocomplete
                v-model="value.journeys"
                :items="journeyLookup"
                filled
                chips
                label="Journeys"
                item-text="name"
                item-value="id"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>

        </v-form>
    </v-container>
</template>

<script>
import FileUpload from "./FileUpload";
import {playerEndpoint, editorEndpoint} from '@/utils/endpoints.js'

export default {
    name: "ParentEditor",
    data: () => ({
        valid: true,
        rules: {
            label : [
                v => (!!v && v != "New parent") || 'Name is required',
                v => (v && v.length <= 200) || 'Name must be less than 200 characters',
                v => !(/^[ \t]+/.test(v)) || 'Name must not begin with an empty space'
            ]
        },
        journeyLookup: []
    }),
    created() {
        fetch(playerEndpoint + "/journeys")
            .then((x) => x.json())
            .then((x) => {
                this.journeyLookup = x.map((j) => ({ id: j.id, name: j.label }));
            });
    },
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
        },
        remove (item) {
            const index = this.value.journeys.indexOf(item.id)
            if (index >= 0) this.value.journeys.splice(index, 1)
        },
    },
    components: {
        "file-upload": FileUpload
    },
}
</script>
