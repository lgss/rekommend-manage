<template>
  <v-container >
    <h2>Page</h2>
    <v-text-field label="Header" v-model="value.title"/>
    <v-subheader>Items</v-subheader>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, index) in value.items" :key="index" >
        <v-expansion-panel-header style="width: 100%">
          <template #default="{open}">
            <!--v-icon class="handle flex-grow-0" >mdi-drag</v-icon-->
            <v-fade-transition leave-absolute >
              <span v-if="!open">
                {{item.label}}
              </span>
            </v-fade-transition>
            <v-spacer/>
          </template>
          <template #actions>
            <v-btn icon @click.stop="remove(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-icon color="primary">$vuetify.icons.expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!--component :is="item.fieldType" v-model="item"/-->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(interationType, index) in interactionTypes"
          :key="index"
          @click="append(index)"
        >
          <v-list-item-title>{{ interationType }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      interactionTypes: {
        'single-choice-input': "Single choice input",
        'multiple-choice-input': "Multiple choice input",
        'stimulus': 'Stimulus'
      }
    }
  },
  props: ['value'],
  methods: {
    append(interactionType) {
      this.value.items.push({fieldType: interactionType})
    },
    remove(idx) {
      this.value.items.splice(idx, 1)
    }
  }
}
</script>