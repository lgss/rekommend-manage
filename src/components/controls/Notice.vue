<template>
    <div>
        <HTMLEditor :value="content" @input="$emit('content', $event)">

        </HTMLEditor>
    </div>
</template>

<script>
import HTMLEditor from  '@/components/controls/HTMLEditor.vue'
export default {
    components: {
        HTMLEditor
    },
    props: ['content']
}
</script>