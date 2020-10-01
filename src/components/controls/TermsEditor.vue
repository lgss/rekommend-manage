<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>
            <v-row id="preview">
                <v-col>
                    <v-row>
                        <v-col>
                            <h1 class="float-left">PREVIEW</h1>
                        </v-col>
                    </v-row>
                    <v-card>
                        <v-row>
                            <v-col>
                                <v-app-bar :color="appPrimary" prominent>
                                    <v-container class="d-flex flex-column align-center">
                                        <a>
                                            <v-toolbar-title class="white--text">
                                                <div role="heading" aria-level="1" class="font-weight-black">{{ appTitle }}</div>
                                            </v-toolbar-title>
                                        </a>
                                        <v-container class="d-flex flex-column align-center">
                                            <h2 role="heading" aria-level="2" tabindex="0" class="white--text subheader">
                                                Subheader
                                            </h2>
                                        </v-container>
                                    </v-container>
                                </v-app-bar>
                            </v-col>
                        </v-row>
                        <v-row class="">
                            <v-container>
                                    <h1 id="title">{{ title }}</h1>
                            </v-container>
                            <v-divider />
                            <v-container
                                id="content"
                                class=""
                                v-html="content"
                            ></v-container>
                        </v-row>
                        <v-footer :color="appSecondary" class="justify-center">
                            <v-card flat tile :color="appSecondary">
                                <v-card-text>
                                    <a class="white--text">
                                        Terms and Conditions
                                    </a>
                                </v-card-text>
                            </v-card>
                        </v-footer>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6">
                    <v-text-field label="Title" v-model="title"/> 
                </v-col>
            </v-row>
            <v-row>
                <v-col md="12">
                    <html-editor label="Content" v-model="content"/>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col>
                    <v-btn @click="saveTerms" color="success">Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import HTMLEditor from "./HTMLEditor"; 
/* eslint-disable */
export default {
    name: "TermsEditor",
    created() {
        Promise.all([
            fetch(this.endpoint + "/theme")
                .then((x) => x.json())
                .then((x) => {
                    this.appTitle = x.title;
                    this.appPrimary = x.primary;
                    this.appSecondary = x.secondary;
                }),
            fetch(this.endpoint + "/content/disclaimer")
                .then((x) => (x.ok ? x.json() : Promise.reject(x)))
                .then((x) => {
                    this.title = x.title;
                    this.content = x.content;
                })
                .catch((err) => {
                    if (err.status === 404) {
                        this.method == "POST";
                        return;
                    }
                    console.log(err);
                }),
        ]).finally(() => {
            this.loading = false;
        });
    },
    components: {
        "html-editor": HTMLEditor,
    },
    data() {
        return {
            endpoint: process.env.VUE_APP_API_ENDPOINT,
            method: "PUT",
            appTitle: null,
            appPrimary: "#1F63A3",
            appSecondary: "#1F63A3",
            title: "",
            content: "",
            loading: true,
        };
    },
    methods: {
        saveTerms() {
            fetch(this.endpoint + "/content/disclaimer", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: this.title,
                    content: this.content,
                }),
            });
        },
    }
};
</script>
<style scoped>
    #preview .v-card:hover {
        opacity: 0.5;
    }
    #preview {
        transform: matrix(0.75, 0, 0, 0.75, 0, 0);
        margin-top: 0px;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>
