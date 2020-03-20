<template>
  <v-container >
    <h2>{{value.fieldType}}</h2>
    <v-text-field label="Name" v-model="value.name" />
    <v-text-field label="Label" v-model="value.label" />
    <v-combobox
      v-model="value.includeTags"
      chips
      clearable
      label="Include tags"
      multiple
      solo/>
    <v-combobox
      v-model="value.excludeTags"
      chips
      clearable
      label="Exclude tags"
      multiple
      solo/>
    <v-subheader>Choices</v-subheader>
    <v-expansion-panels accordion>
      <draggable v-bind="dragOptions" @start="drag = true" @end="drag = false" v-model="value.choices" handle=".handle">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-expansion-panel v-for="(choice, index) in value.choices" :key="index" >
            <v-expansion-panel-header style="width: 100%">
              <template #default="{open}">
                <v-icon class="handle flex-grow-0" >mdi-drag</v-icon>
                <v-fade-transition leave-absolute >
                  <span v-if="!open">
                    {{choice.value}}
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
              <v-text-field label="Choice label" v-model="choice.value"/>
              <v-combobox
                v-model="choice.tags"
                chips
                clearable
                label="Tags"
                multiple
                solo/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </transition-group>
      </draggable>
    </v-expansion-panels>
    <v-btn color="primary" @click="append">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
 import draggable from 'vuedraggable'
 import typeName from '../../utils/types.js'

  export default {
    name: 'SingleChoiceEditor',
    components: {
      draggable
    },
    data() {
      return {
        drag: false
      }
    },
    props: ['value'],
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      interactionTypeName() {
        return typeName(this.value.fieldType)
      }
    },
    methods: {
      append() {
        this.value.choices.push({
          value: "New choice",
          choices: [],
          tags: []
        })
      },
      remove(index) {
        this.value.choices.splice(index, 1)
      }
    }
  }
</script>

<style>
.v-expansion-panels > div {
  width: 100%
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.handle {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>