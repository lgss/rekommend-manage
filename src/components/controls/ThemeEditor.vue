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
                    <v-row>
                        <v-col v-html="content"></v-col>
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
                <v-text-field label="Application name" v-model="appTitle"/> 
            </v-col>
            </v-row>
            <v-row>
            <v-col md="2">
                <label>Primary colour</label>
                <v-color-picker mode="hexa" v-model="appPrimary"/>
            </v-col>
            <v-col md="2">
            <label>Secondary colour</label>
                <v-color-picker mode="hexa" v-model="appSecondary"/>
            </v-col>
            </v-row>
            <v-row>
            <v-col>
                <v-btn @click="saveTheme()" color="success">Save</v-btn>
            </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import {playerEndpoint, editorEndpoint} from '@/utils/endpoints.js'

export default {
    name: 'ThemeEditor',
    created() {
        fetch(playerEndpoint + '/theme')
        .then(x => x.json())
        .then(x => {
            this.appTitle = x.title;
            this.appPrimary = x.primary;
            this.appSecondary = x.secondary;
            this.loading = false
        })
    },
    data() {
        return {
            appTitle: null,
            appPrimary: "#1F63A3",
            appSecondary: "#1F63A3",
            content: "content will be placed here",
            loading: true,  
        }
    },
    methods: {
        saveTheme() {
            fetch(editorEndpoint + '/theme', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.appTitle,
                    primary: this.appPrimary,
                    secondary: this.appSecondary
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