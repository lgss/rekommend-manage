<template>
    <v-form ref="form">
        <v-row>
            <v-col>
                <v-card width="116" class="pa-2">
                    <v-img max-height="100" max-width="100" :contain="true" :src="displayImage()"/>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-file-input :show-size="true" :loading="loading" accept="image/*" label="Choose an image" @change="selectImage"/>
            </v-col>
            <v-col>
                <v-text-field
                    ref="altText"
                    label="Image description (alt text)"
                    v-model="value.alt"
                />
            </v-col>
            <v-col>
                <v-btn v-if="value" color="primary" depressed @click="remove"> Remove</v-btn>
            </v-col>
        </v-row>  
    </v-form>
</template>

<script>
// TODO: right now, this could leave dangling images in S3 in a variety of ways
// So, how to fix it? I'm inclined to think that marking the files as temporary 
// with a prefix, so that it has a TTL and then changing it to a permanent file
import {uploadImage, deleteFile} from '@/utils/file.js'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export default {
    name: "file-upload",
    props: ["value"],
    data() {
        return {
            loading: false
        }
    },
    methods: {
        displayImage() {
            if (this.value && this.value.src)
                return endpoint + '/image/' + this.value.src
            
            return "/img/image-placeholder.png"
        },
        selectImage(image) {
            this.loading = true
            uploadImage(image)
                .then(async fn => {
                    // delete the prior image
                     if (this.value.src) 
                        await this.remove()

                    this.value.src = fn
                    this.loading = false
                    return fn
                })
        },
        remove() {
            return deleteFile(this.value.src)
                .then(() => {
                    this.value.src = null
                })
        },
    },
};
</script>
