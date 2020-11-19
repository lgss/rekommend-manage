<template>
  <v-container class="pa-0">
    <h2 v-if="!embedded">Page</h2>
    <label>Page title</label>
    <info>This will be displayed at the top of the page</info>
    <v-text-field outlined
      ref="Header"
      v-model="value.title"
      :error-messages="errorMessages"
      placeholder="Enter a header"
      required
    ></v-text-field>
    <label>Items (questions and stimulus content)</label>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, index) in value.items" :key="index" >
        <v-expansion-panel-header style="width: 100%">
          <template #default="{open}">
            <v-icon class="handle flex-grow-0" >mdi-drag</v-icon>
            <v-fade-transition leave >
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
          <component :is="item.fieldType" :value="item"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small color="primary">
          <v-icon>mdi-plus</v-icon>
          Add an item...
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(interactionType, index) in interactionTypes.interactionTypes"
          :key="index"
          @click="append(index)"
        >
          <v-list-item-title>{{ interactionType }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import {interactionTypes, components} from '@/utils/itemTypes';
import Info from '@/components/controls/Info'

export default {
  components: {
    Info,
    ...components
  },
  data() {
    return {
      interactionTypes,
      errorMessages: ''
    }
  },
  props: {'value': {}, 'embedded': Boolean},
  methods: {
    append(index) {
      this.value.items.push({fieldType: index})
    },
    remove(idx) {
      this.value.items.splice(idx, 1)
    }
  }
}
</script>