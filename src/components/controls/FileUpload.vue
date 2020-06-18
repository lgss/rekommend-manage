<template>
    <div v-if="this.displayUploader">
        <v-file-input label="Resource Image" v-model="newFile"></v-file-input>
    </div>
    <div v-else>
        <v-text-field v-model="currentFile" label="Image" readonly></v-text-field>
        <v-btn color="primary" depressed  @click="remove">Remove</v-btn>
    </div>
</template>

<script>
    export default {
        name: 'FileUpload',
        props: ['value'],
        data: () => ({
            newFile:{},
            displayUploader: true,
            endpoint: process.env.VUE_APP_API_ENDPOINT
        }),
        computed:{
            currentFile() {
                return this.value
            }
        },
        watch:{
            currentFile: {
                deep: true,
                handler: function(newVal) {
                    if(newVal === undefined) {
                        this.displayUploader = true
                    } else {
                        this.displayUploader = false
                    }
                }
            },
            newFile: {
                deep: true,
                handler:function(newVal) {
                    if(newVal === undefined) {
                        this.newFile = {}
                    }
                }
            }
        },
        methods: {
            set() {
                this.displayUploader = false
            },
            remove(){
                this.displayUploader = true
            },
            save() {
                if(this.currentFile == undefined && this.newFile.name !== undefined){
                    console.log("new file")
                    return this.upload()
                        .then(x => {
                            return x;
                        });
                }
                if(this.currentFile !== undefined && this.newFile.name !== undefined) {
                    console.log("replace file")
                    this.delete();
                    return this.upload()
                        .then(x => {
                            return x;
                        });
                }
                if(this.currentFile !== undefined && this.displayUploader == true) {
                    console.log("delete file")
                    this.delete();
                    return Promise.resolve(undefined);
                }
                console.log("no change")
                return Promise.resolve(this.currentFile);
            },
            upload() {
                let meme = this.newFile.type.split('/')

                if (meme.length < 2) {
                    console.log("unable to determine file type and subtype")
                    return Promise.resolve(undefined)
                }
                let type = meme[0]
                let subtype = meme[1]

                if(type !== "image") {
                    console.log("Not an image")
                    return Promise.resolve(undefined)
                }

                return fetch(this.endpoint + "/set-file-url/" + subtype)
                .then(x => x.json())
                .then(doc => {
                    fetch(doc.uploadURL, {
                        method: "PUT",
                        body: this.newFile
                    })
                    return doc.filename
                })
            },
            delete() {
                return fetch(this.endpoint + "/delete-file/" + this.currentFile);
            }
        }
    }
</script>