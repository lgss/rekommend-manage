<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>  
            <v-row id="preview">
            <v-col>
                <v-row>
                <v-col>
                    <h1 class="float-left">PREVIEW</h1><br/>
                </v-col>
                </v-row>
                <v-card>
                    <v-row class="mx-5"> 
                        <v-container>
                                <h1 id="title">{{ title }}</h1>
                        </v-container>
                        <v-divider />
                        <v-container
                            id="content"
                            v-html="content"
                        ></v-container>
                    </v-row>
                    <v-row class="mx-5">
                        <v-col>
                            <v-btn id="btn-view-resources">View resources</v-btn>
                            <v-btn id="btn-cancel">Cancel</v-btn>
                        </v-col>
                    </v-row>
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
                <v-btn @click="saveCompleted()" color="success">Save</v-btn>
            </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
/* eslint-disable */
export default {
    name: 'CompletedEditor',
    created() {
        Promise.all([
            fetch(this.endpoint + "/theme")
                .then((x) => x.json())
                .then((x) => {
                    this.appTitle = x.title;
                    this.appPrimary = x.primary;
                    this.appSecondary = x.secondary;
                }),
            fetch(this.endpoint + '/content/completed')
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
        'html-editor' : HTMLEditor
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
        }
    },
    methods: {
        saveCompleted() {
            fetch(this.endpoint + '/content/completed', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.title,
                    content: this.content
                })
            })
        }
    }
}
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