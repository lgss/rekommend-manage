<template>
    <v-form ref="form">
        <v-file-input
            v-if="!val.src"
            label="Resource Image"
            v-model="fileObj"
            :rules="rules.file"
            required
        />
        <v-text-field v-else v-model="val.name" label="File" readonly />
        <!-- <v-text-field v-model="val.src" label="source" readonly /> -->
        <v-text-field
            ref="altText"
            label="Description"
            v-model="val.alt"
            :rules="rules.altText"
            required
        />
        <v-btn v-if="val.src" color="primary" depressed @click="remove"
            >Remove</v-btn
        >
        <!-- <v-btn @click="save">Save</v-btn> -->
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
            if (this.removeObj) {
                return this.delete()
                .then(()=> this.upload());
            }
            return this.upload();
        },
        upload() {
            if (!this.$refs.form.validate()) {
                return Promise.reject("Attachment not present");
            }
            if (!this.fileObj) {
                return Promise.reject("No file detected");
            }
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
