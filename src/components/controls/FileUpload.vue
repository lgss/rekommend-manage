<template>
    <v-file-input multiple label="Resource Image" v-model="file"></v-file-input>
</template>

<script>
    export default {
        name: 'FileUpload',
        props: ['label', 'mandatory', 'rules'],
        data: () => ({
            file:[],
            endpoint: process.env.VUE_APP_API_ENDPOINT
        }),
        methods: {
            singleFileUpload() {
                if (this.file.length === 0) {
                    console.log("no files to be uploaded")
                    return Promise.resolve(null)
                }
                else if (this.file[0].type.split('/').length < 2) {
                    console.log("unable to determine file type and subtype")
                    return Promise.resolve(null)
                }
                else {
                    let type = this.file[0].type.split('/')[0]
                    let subtype = this.file[0].type.split('/')[1]
                    if(type !== "image") {
                        console.log("Not an image")
                        return Promise.resolve(null)
                    }
                    return fetch(this.endpoint + "/set-file-url/" + subtype)
                    .then(x => x.json())
                    .then(doc => {
                        fetch(doc.uploadURL, {
                            method: "PUT",
                            body: this.file[0]
                        })
                        return doc.filename
                    })
                }
            }
        }
    }
</script>