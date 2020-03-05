<template>
  <v-container >
    <v-text-field label="Name" v-model="$attrs.value.name" />
    <v-text-field label="Label" v-model="$attrs.value.label" />
    <v-combobox
      v-model="$attrs.value.includeTags"
      chips
      clearable
      label="Include tags"
      multiple
      solo/>
    <v-combobox
      v-model="$attrs.value.excludeTags"
      chips
      clearable
      label="Exclude tags"
      multiple
      solo/>
    <v-subheader>Choices</v-subheader>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(choice, index) in $attrs.value.choices" :key="index">
        <v-expansion-panel-header #default="{open}">
          <v-fade-transition leave-absolute>
            <span v-if="!open">
              {{choice.value}}
            </span>
          </v-fade-transition>
          <template actions="{}">
            <v-icon color="primary">$vuetify.icons.expand</v-icon>
            <v-btn icon @click="remove(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field label="Choice label" v-model="choice.value" append-icon="mdi-close" @click:append="remove(index)"/>
          <v-combobox
            v-model="choice.tags"
            chips
            clearable
            label="Tags"
            multiple
            solo/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn @click="append">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'SingleChoiceEditor',
    methods: {
      append() {
        this.$attrs.value.choices.push({
          value: "New choice",
          tags: []
        })
      },
      remove(index) {
        this.$attrs.value.choices.splice(index, 1)
      }
    }
  }
</script>