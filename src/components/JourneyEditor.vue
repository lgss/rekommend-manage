<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <label>Journey picture</label>
                <info>This will display next to the Name to help user identify what it means</info>
                <file-upload v-model="value.img"/>
            </v-col>
            <v-col cols="6">
                <label>Journey name</label>
                <info>The situation that this journey helps with e.g. 'My health'</info>
                <v-text-field outlined
                    ref="Label"
                    eprepend-icon="mdi-transit-connection-variant"
                    v-model="value.label"
                    :rules="[() => !!value.label || 'This field is required']"
                    :error-messages="errorMessages"
                    placeholder="Enter journey name"
                    required
                ></v-text-field>
                <v-btn class="my-2" :loading="saving" @click="save">Save</v-btn>
                <v-btn class="my-2 ml-4" >Delete Journey</v-btn>
            </v-col>
        </v-row>
        <h3>Pages</h3>
        <v-expansion-panels accordion>
            <draggable v-model="pageOrder" v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                    <v-expansion-panel v-for="(page, index) in value.doc.pages" :key="index" >
                        <v-expansion-panel-header style="width: 100%">
                        <template #default="{open}">
                            <v-icon class="handle flex-grow-0" >mdi-drag</v-icon>
                            <v-fade-transition leave>
                                <span v-if="!open">
                                  {{page.title}}
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
                            <!-- content -->
                            <page-editor embedded :value="page" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </transition-group>
            </draggable>
        </v-expansion-panels>
        <v-btn color="primary" @click="append">
            <v-icon>mdi-plus</v-icon>
            Add a question page
        </v-btn>
    </v-container>
</template>


<script>
import draggable from 'vuedraggable'
import FileUpload from "./controls/FileUpload";
import PageEditor from '@/components/controls/PageEditor'
import {editorEndpoint} from '@/utils/endpoints.js'
import Info from '@/components/controls/Info'

export default {
    name: 'JourneyEditor',
    data() {
        return {
            drag: false,
            errorMessages: '',
            saving: false
        }
    },
    components: {
      draggable,
      FileUpload,
      PageEditor,
      Info
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
        },
    },
  methods: {
    remove(index) {
        this.value.doc.pages.splice(index, 1)
    },
    append() {
        this.value.doc.pages.push({title: "New page", items: []})
    },
    save() {
        this.saving = true;
        fetch(`${editorEndpoint}/journeys/${this.value.id}`, {
            method: 'PUT',
            body:JSON.stringify({
                updates:[
                {
                    paramName: "label", paramValue: this.value.label
                },
                {
                    paramName: "doc", paramValue: (this.value.doc)
                },
                {
                    paramName: "img", paramValue: (this.value.img)
                }
                ]}
            )
        })
        .then(() => {}) // TODO: replace with vuetify alert
        .finally(() => this.saving = false)
        .catch((err)=> {
            console.error(err);
            alert("There was a problem saving the journey") //TODO: replace with vuetify alert
        })
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