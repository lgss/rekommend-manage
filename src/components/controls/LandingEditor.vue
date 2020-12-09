<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>  
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
                    <v-btn @click="saveLanding()" color="success">Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import HTMLEditor from './HTMLEditor'
/* eslint-disable */
export default {
    name: 'LandingEditor',
    created() {
        Promise.all([
            fetch(this.endpoint + "/theme")
                .then((x) => x.json())
                .then((x) => {
                    this.appTitle = x.title;
                    this.appPrimary = x.primary;
                    this.appSecondary = x.secondary;
                }),
            fetch(this.endpoint + '/content/landing')
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
        saveLanding() {
            fetch(this.endpoint + '/content/landing', {
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