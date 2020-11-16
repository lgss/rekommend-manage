<template>
    <v-container>
        <v-spacer/>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    ref="Label"
                    prepend-icon="mdi-transit-connection-variant"
                    v-model="value.label"
                    :rules="[() => !!value.label || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Journey name"
                    placeholder="Enter journey name"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-btn block :loading="saving" @click="save">Save</v-btn>
            </v-col>
            <v-col cols="3" class="pl-2">
                <v-btn block>Delete Journey</v-btn>
            </v-col>
        </v-row>
        <file-upload v-model="value.img"/>
        <v-subheader>Pages</v-subheader>
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
        </v-btn>
    </v-container>
</template>


<script>
import draggable from 'vuedraggable'
import FileUpload from "./controls/FileUpload";
import PageEditor from '@/components/controls/PageEditor'

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
      PageEditor
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
        fetch(this.endpoint+'/journeys/'+this.value.id, {
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
            ]})
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