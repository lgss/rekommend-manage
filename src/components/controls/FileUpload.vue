<template>
    <v-form ref="form">
        <v-row>
            <v-col md="auto">
                <v-card width="116" class="pa-2">
                    <v-progress-circular :indeterminate="true" v-if="loading" />
                    <label class="upl" v-else for="img-upload">
                        <input id="img-upload" title="upload a new image" v-show="false" 
                            @change="selectImage" accept="image/*" type="file"/>
                        <v-img max-height="100" max-width="100" :contain="true" :src="displayImage()"/>
                    </label>
                    <v-btn v-if="image.src" class="delete" top absolute small fab @click="remove">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card>
            </v-col>
            <v-col v-show="image.src">
                <v-text-field ref="altText" label="Image description (alt text)" v-model="image.alt" />
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
    computed: {
        image: {
            get: () => this.value || {},
            set: (newValue) => this.$emit('input', newValue)
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
            uploadImage(image.target.files[0])
                .then(async fn => {
                    // delete the prior image
                     if (this.image.src) 
                        await this.remove()

                    this.image.src = fn
                    this.loading = false
                    return fn
                })
        },
        remove() {
            return deleteFile(this.image.src)
                .then(() => {
                    // there's probably a better way of triggering the reactivity...
                    this.image = Object.assign({}, this.image, {src: null})
                })
        },
    },
};
</script>

<style scoped>
  .upl {
      cursor: pointer;
  }

  .delete {
      right: -20px
  }
</style>