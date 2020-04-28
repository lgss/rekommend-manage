<template>
    <div>
        <v-label :v-if="label">{{label}}</v-label>
        <v-input :rules="internalRules" :error-messages="errorMessages" :value="content">
            <v-container full-width>
                <tiptap-vuetify v-model="content" :extensions="extensions"/>
            </v-container>
        </v-input>
    </div>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    props: ['value','label', 'mandatory', 'rules'],
    data() { 
        return {
            content: this.value,
            intenralRules: this.rules,
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
    created() {
        this.internalRules = this.internalRules || [];
        if (this.mandatory) {
            this.internalRules.push((v) => (!!v && v !='<p></p>') || "This field is required")
        }
    },
    components: {
        TiptapVuetify
    },
    watch:{
        content: function(val) {
            this.$emit('input', val)
        }
    }
}
</script>