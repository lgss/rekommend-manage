<template>
    <div>
        <h2>Notices</h2>
        <div v-for="notice in notices" :key="notice">
            <Notice :content="notice.content" @content="notice.content = $event">

            </Notice>
            {{notice.content}}
            <v-btn @click="deleteNotice(notice.id)">Delete</v-btn>
        </div>
        <v-btn @click="addNotice">Add</v-btn>
    </div>
</template>

<script>
import {v4 as uuid} from "uuid"
import Notice from '@/components/controls/Notice.vue'
export default {
    components: {
        Notice
    },
    data() {
        return {
            notices: []
        }
    },
    methods: {
        addNotice() {
            this.notices.push({
                id: uuid(),
                content: 'Hello world'
            })
        },
        deleteNotice(id) {
            const idx = this.notices.findIndex(x => x.id == id)
            this.notices.splice(idx, 1)
        }
    }
}
</script>