<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>
            <v-card id="terms-preview">
                <v-col>
                    <v-row>
                        <v-col>
                            <h1 class="float-left">PREVIEW</h1>
                            <br />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-app-bar :color="appColor">
                                <v-toolbar-title class="white--text"
                                    ><b>{{ appTitle }}</b></v-toolbar-title
                                >
                            </v-app-bar>
                        </v-col>
                    </v-row>
                    <v-container>
                        <v-card>
                            <div class="text-left">
                                <v-container>
                                    <h1 id="terms-title">{{ title }}</h1>
                                </v-container>
                                <v-divider />
                                <v-container
                                    id="terms-content"
                                    class="text-left"
                                    v-html="content"
                                >
                                </v-container>
                            </div>
                        </v-card>
                    </v-container>
                </v-col>
            </v-card>
            <v-divider /> <br>
            <v-card>
				<v-container>
                <v-row>
                    <v-col md="12">
                        <v-text-field label="Title" v-model="title" />
                    </v-col>
                    <v-col md="12">
                        <html-editor :label="'Content'" v-model="content" />
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col>
                        <v-btn @click="saveTerms" color="success">Save</v-btn>
                    </v-col>
                </v-row>
				</v-container>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
import HTMLEditor from "./HTMLEditor"; /* eslint-disable */
export default {
    name: "TermsEditor",
    created() {
        Promise.all([
            fetch(this.endpoint + "/config/general")
                .then((x) => x.json())
                .then((x) => {
                    this.appTitle = x.title;
                    this.appColor = x.primary;
                }),
            fetch(this.endpoint + "/config/disclaimer")
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
            title: null,
            content: null,
            appTitle: null,
            appColor: "#1F63A3",
            loading: true,
        };
    },
    methods: {
        saveTerms() {
            fetch(this.endpoint + "/config/disclaimer", {
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
    },
};
</script>
<style scoped>
#home-preview .v-card:hover {
    opacity: 0.5;
}
#home-preview {
    transform: matrix(0.75, 0, 0, 0.75, 0, 0);
    text-align: center;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
