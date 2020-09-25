<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>
            <v-row>
                <v-col>
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="(item, index) in page.items"
                            :key="index"
                        >
                            <v-expansion-panel-header style="width: 100%">
                                <template #default="{open}">
                                    <!--v-icon class="handle flex-grow-0" >mdi-drag</v-icon-->
                                    <v-fade-transition leave-absolute>
                                        <span v-if="!open">
                                            {{ item.fieldType }}
                                        </span>
                                    </v-fade-transition>
                                    <v-spacer />
                                </template>
                                <template #actions>
                                    <v-btn icon @click.stop="remove(index)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-icon color="primary"
                                        >$vuetify.icons.expand</v-icon
                                    >
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <component
                                    :is="item.fieldType"
                                    v-model="page.items[index]"
                                />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" fab small color="primary">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(interactionType,
                                index) in interactionTypes.interactionTypes"
                                :key="index"
                                @click="append(index)"
                            >
                                <v-list-item-title>{{
                                    interactionType
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn @click="save()" color="success">Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
//import PageEditor from './PageEditor'
import interactionTypes from "../../utils/types";
import ChoiceEditor from "./ChoiceEditor";
import TextBlockEditor from "./TextBlockEditor.vue";
/* eslint-disable */
export default {
    name: "TransitionEditor",
    created() {
        fetch(this.endpoint + "/content/transition")
            .then((x) => (x.status == 404 ? Promise.reject(404) : x.json()))
            .then((x) => {
                // do something with the thing
                x.content.items = x.content.items || []
                this.page = x.content;
                // this.page.items = this.page.items || [1,2,3,4,5]
            })
            .catch((err) => {
                if (err == 404) {
                    this.isNew = true;
                }
            })
            .finally(() => {
                this.loading = false;
            });
    },
    components: {
        stimulus: TextBlockEditor,
        "single-choice-input": ChoiceEditor,
        "multiple-choice-input": ChoiceEditor,
    },
    data() {
        return {
            interactionTypes,
            isNew: false,
            endpoint: process.env.VUE_APP_API_ENDPOINT,
            appTitle: null,
            appPrimary: "#1F63A3",
            appSecondary: "#1F63A3",
            content: "content will be placed here",
            loading: true,
            page: {
                items: [],
            },
        };
    },
    methods: {
        append(index) {
            this.$set(this.page.items, this.page.items.length, {fieldType:index})
            // this.page.items.push({ fieldType: index });
        },
        remove(idx) {
            this.page.items.splice(idx, 1);
        },
        save() {
            // let body = JSON.stringify(this.page)
            fetch(this.endpoint + "/content/transition", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: this.page}),
            });
        },
    },
};
</script>
<style scoped>
#preview .v-card:hover {
    opacity: 0.5;
}
#preview {
    transform: matrix(0.75, 0, 0, 0.75, 0, 0);
    text-align: center;
    margin-top: 0px;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
