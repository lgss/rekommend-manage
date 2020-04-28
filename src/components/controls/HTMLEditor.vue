<template>
    <v-container>
        <v-label :v-if="label">{{label}}</v-label>
        <v-input :label="label" :rules="rules" :error-messages="errorMessages" :value="content">
            <v-container full-width>
                <tiptap-vuetify v-model="content" :extensions="extensions"/>
            </v-container>
        </v-input>
    </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    props: ['value','label'],
    data() { 
        return {
            content: this.value,
            rules: [v => false || "I AM A STRING:" +v],
            errorMessages: [],
            extensions: [
                History,
                Link,
                Underline,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [
                    Heading,
                    {
                        options: {
                            levels: [1, 2, 3]
                        }
                    }
                ],
                Bold,
                HorizontalRule,
                Paragraph,
                HardBreak
            ]
        }
    },
    components: {
        TiptapVuetify
    },
    watch:{
        content: function(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        addError() {
            this.errorMessages.push("hello")
        },
        validate() {
            console.log("validation of htmleditor")
        }
    }
}
</script>