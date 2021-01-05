<template>
    <v-container>
        <v-container v-if="loading"> </v-container>
        <v-container v-else>
            <v-row>
                <v-col md="6">
                    <v-text-field label="System name" v-model="appTitle"/> 
                </v-col>
            </v-row>
            <v-row>
                <v-col md="3">
                    <label>Header colour</label>
                    <v-color-picker mode="hexa" v-model="appPrimary"/>
                </v-col>
                <v-col md="3">
                <label>Footer colour</label>
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