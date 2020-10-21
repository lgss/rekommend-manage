<template>
    <div class="html-editor">
        <v-label :v-if="label">{{label}}</v-label>
        <v-input :rules="internalRules" :error-messages="errorMessages">
            <div class="editor">
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="menubar v-btn-toggle">
                        <v-btn @click="commands.undo">
                            <v-icon>mdi-undo</v-icon>
                        </v-btn>
                        <v-btn @click="commands.redo">
                            <v-icon>mdi-redo</v-icon>
                        </v-btn>

                        <v-btn :class="{'v-btn--active': isActive.bold()}" @click="commands.bold">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.italic()}" @click="commands.italic">
                            <v-icon>mdi-format-italic</v-icon>
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.underline()}" @click="commands.underline">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.paragraph()}" @click="commands.paragraph">
                            <v-icon>mdi-format-paragraph</v-icon>
                        </v-btn>
                        <v-btn @click="showImagePrompt(commands.caption_image)">
                            <v-icon>mdi-signature-image</v-icon>
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.heading({ level: 1})}" @click="commands.heading({ level: 1})">
                            H1
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.heading({ level: 2})}" @click="commands.heading({ level: 2})">
                            H2
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.heading({ level: 3})}" @click="commands.heading({ level: 3})">
                            H3
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.bullet_list()}" @click="commands.bullet_list">
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-btn>
                        <v-btn :class="{'v-btn--active': isActive.ordered_list()}" @click="commands.ordered_list">
                            <v-icon>mdi-format-list-numbered</v-icon>
                        </v-btn>
                    </div>
                </editor-menu-bar>
                <v-card>
                    <editor-content class="editor__content" :editor="editor"/>
                </v-card>
            </div>
        </v-input>
    </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Underline,
  History,
} from 'tiptap-extensions'
import CaptionImage from '@/plugins/caption-images-editor.js'

export default {
    props: ['label', 'mandatory', 'rules', 'value'],
    data() { 
        return {
            editor: new Editor({
                extensions: [
                new BulletList(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new ListItem(),
                new OrderedList(),
                new Link(),
                new Bold(),
                new Italic(),
                new Underline(),
                new History(),
                new CaptionImage()],
                onUpdate: ({getHTML}) => {
                    this.$emit('input', getHTML())
                },
                content: this.value
            }),
            intenralRules: this.rules,
            errorMessages: []
        }
    },
    created() {
        this.internalRules = this.internalRules || [];
        if (this.mandatory) {
            this.internalRules.push((v) => (!!v && v !='<p></p>') || "This field is required")
        }
    },
    components: {
         EditorContent, 
         EditorMenuBar 
    },
    methods: {
      showImagePrompt(command) {
        const src = prompt('Enter the url of your image here')
        if (src !== null) {
            command({ src })
        }
      },
    }
}
</script>

<style>
    .editor {
        width: 100%;
        height: 100%;
    }

    .ProseMirror {
        height: 100%;
        margin-top: 3px;
        padding: 10px;
    }

    .html-editor .v-messages {
        display: none;
    }

    .html-editor .v-input__slot {
        margin-bottom: 0;
    }
</style>