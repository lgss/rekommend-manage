<template>
    <v-form ref="form">
        <v-row>
            <v-col cols="6">
                <v-file-input
                    v-if="!val.src"
                    label="Image"
                    v-model="fileObj"
                    :rules="rules.file"
                />
                <v-text-field v-else v-model="val.name" label="File" readonly />
            </v-col>
            <v-col>
                <v-text-field
                    ref="altText"
                    label="Image description"
                    v-model="val.alt"
                    :rules="rules.altText"
                />
            </v-col>
            <v-col>
                <v-btn v-if="val.src" color="primary" depressed @click="remove"> Remove</v-btn>
            </v-col>
        </v-row>  
    </v-form>
</template>

<script>
export default {
    name: "file-upload",
    props: ["value"],
    data: () => ({
        val: {},
        removeObj: null,
        fileObj: null,
        endpoint: process.env.VUE_APP_API_ENDPOINT,
        rules: {
            altText: [(v) => !!v || "A description is required"],
            file: [],
        },
    }),
    created() {
        this.val = this.value || {};
    },
    watch: {
        value: function(val) {
            this.val = val || {};
        },
    },
    methods: {
        remove() {
            this.removeObj = this.val;
            this.val = {};
        },
        save() {
            if (this.removeObj && this.fileObj) {
                return this.delete()
                .then(()=> this.upload());
            }
            if (this.fileObj) {
                return this.upload();
            }
            if (this.removeObj) {
                return this.delete();
            }
        },
        upload() {
            // if (!this.$refs.form.validate()) {
            //     return Promise.reject("Attachment not present");
            // }
            // if (!this.fileObj) {
            //     return Promise.reject("No file detected");
            // }
            let mime = this.fileObj.type.split("/");
            if (mime.length < 2) {
                return Promise.reject("Unknown file type");
            }
            let type = mime[0];
            let subtype = mime[1];
            if (type !== "image") {
                return Promise.reject("Not an image");
            }
            this.val.name = this.fileObj.name;
            return fetch(this.endpoint + "/set-file-url/" + subtype)
                .then((x) => x.json())
                .then((doc) => {
                    fetch(doc.uploadURL, {
                        method: "PUT",
                        body: this.fileObj,
                    })
                    .then(()=>{
                        this.fileObj = null;
                    });
                    this.$set(this.val, "src", doc.filename);
                    this.$emit('input',this.val)
                    return this.val;
                });
        },
        delete() {
            return fetch(this.endpoint + "/delete-file/" + this.removeObj.src);
        },
    },
};
</script>
