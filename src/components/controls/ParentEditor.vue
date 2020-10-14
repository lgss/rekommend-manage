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
        journeyLookup: [
            { name: 'Journey One', id: '52c3fe65-3b38-440c-959d-66bd10d4b900'},
            { name: 'Journey Two', id: '22a5773f-9d31-4c98-8390-e43fcabe6997'},
            { name: 'Journey Three', id: '84f7361e-49de-4c6a-abbb-f76cb31f2fe1'}
        ]
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
