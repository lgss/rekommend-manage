<template>
    <v-container>
        <v-btn @click="update">Update</v-btn>
        <v-spacer/>
        <h2>Journey</h2>
        <v-text-field label="Label" v-model="value.label"/>
        <v-subheader>Pages</v-subheader>
        <v-expansion-panels accordion>
            <draggable v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                    
                    <v-expansion-panel v-for="(x, index) in JSON.parse(value.doc).pages" :key="index" >
                        <v-expansion-panel-header style="width: 100%">
                        <template #default="{open}">
                            <v-icon class="handle flex-grow-0" >mdi-drag</v-icon>
                            <v-fade-transition leave-absolute >
                            <span v-if="!open">
                                {{x.title}}
                            </span>
                            </v-fade-transition>
                            <v-spacer/>
                        </template>
                        </v-expansion-panel-header>
                    </v-expansion-panel>

                </transition-group>
            </draggable>
        </v-expansion-panels>
    </v-container>
</template>


<script>
import draggable from 'vuedraggable'

export default {
    name: 'JourneyEditor',
    data() {
        return {
            drag: false
        }
    },
    components: {
      draggable
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
        }
    },
  methods: {
    update() {
        fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.value.id, {
            method: 'PUT',
            body:JSON.stringify({paramName: "label", paramValue: this.value.label})
        })
            .then((res) => res.json())
            .catch((err)=>console.error(err))

        fetch('https://aqvneinxel.execute-api.eu-west-2.amazonaws.com/dev/journeys/'+this.value.id, {
            method: 'PUT',
            body:JSON.stringify({paramName: "doc", paramValue: this.value.doc})
        })
            .then((res) => res.json())
            .catch((err)=>console.error(err))
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