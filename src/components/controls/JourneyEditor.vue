<template>
    <v-container>
        <v-spacer/>
        <h2>Journey</h2>
        <v-text-field label="Label" v-model="value.label"/>
        <v-subheader>Pages</v-subheader>
        <v-expansion-panels accordion>
            <draggable v-model="pageOrder" v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                    <v-expansion-panel v-for="(x, index) in value.doc.pages" :key="index" >
                        <v-expansion-panel-header style="width: 100%">
                        <template>
                            <v-icon class="handle flex-grow-0" >mdi-drag</v-icon>
                            <!-- <v-fade-transition leave-absolute > -->
                                {{x.title}}
                            <!-- </v-fade-transition> -->
                            <v-spacer/>
                        </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-btn @click="remove(x.title)">Remove</v-btn>
                        </v-expansion-panel-content>
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
            drag: false,
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
        },
        pageOrder: {
            get: function() {
				return this.value.doc.pages
			},
			set: function(value) {
                this.value.doc.pages = value
			},
        }
    },
  methods: {
    remove(title) {
        let filteredPages = this.value.doc.pages.filter((page)=>{return page.title !== title});
        this.value.doc.pages = filteredPages
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