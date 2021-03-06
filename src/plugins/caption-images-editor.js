import { Node } from 'tiptap'
import { nodeInputRule } from 'tiptap-commands'

const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export default class CaptionImagesEditor extends Node {
  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get name() {return 'caption_image'}


  inputRules({ type }) {
    return [
      nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
        const [, alt, src, title] = match
        return {
          src,
          alt,
          title,
        }
      }),
    ]
  }

  get schema() {
    return {
      attrs: {
        src: {},
        alt: {
          default: ''
        },
        title: {
          default: ''
        },
        caption: {
          default: ''
        }
      },
      group: 'block',
      selectable: true,
      draggable: true,
      parseDOM: [{
        tag: 'div',
        getAttrs: dom => ({
          src: dom.querySelector('img').src,
          alt: dom.querySelector('img').alt,
          title: dom.querySelector('img').title,
          caption: dom.querySelector('span') ? dom.querySelector('span').textContent : '',
        })
      }],
      toDOM: (node) => {
        return ['div', 
          {class: 'caption-image'},
          ['img', {src: node.attrs.src, alt: node.attrs.alt, title: node.attrs.title, height: '100px'}],
          ['span', node.attrs.caption]
        ]
      },
    }
  }

  get view() {
    // This is rendered as a Vue component and so it has
    // the same interface as a renderless component.
    return {
      // Give it a name to work with Vue dev tools
      name: 'CaptionImageView',
      props: ['node'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          // Can't mutate src directly so tiptap
          // provides the updateAttrs function
          set(src) {
            this.updateAttrs({
              src,
            })
          },
        },
        alt: {
          get() {return this.node.attrs.alt},
          set(alt) {this.node.attrs.alt = alt}
        },
        title: {
          get() {return this.node.attrs.title},
          set(title) {this.node.attrs.title = title}
        },
        caption: {
          get() {return this.node.attrs.caption},
          set(caption) {this.node.attrs.caption = caption}
        }
      },
      // Render Function
      // Because the version of vue doesn't ship with
      // the template compiler
      render: function(createElement) {
          return createElement('div', {
              class: 'caption-image',
              style: 'border: solid grey 1px; display: flex; align-items: center'
            },
            [
            // https://vuejs.org/v2/guide/render-function.html#Complete-Example
            createElement('img', {
              attrs: {src: this.src, height: '100px', style: "margin: 18px"}
            }),
            createElement('div', [
              createElement(
                'input', 
                {
                  attrs: {type: "text", class:"alt", style: "width: 100%; border: solid 1px lightgrey; padding: 3px; margin-bottom: 5px;", placeholder: "alt", value: this.alt},
                  on: {
                    input: event => {
                      this.alt = event.target.value
                    },
                    paste: event => {
                      event.stopPropagation()
                      this.alt = event.target.value
                    }
                  }
                }),
              createElement(
                'input', 
                {
                  attrs: {type: "text", class:"tit", style: "width: 100%; border: solid 1px lightgrey; padding: 3px; margin-bottom: 5px;", placeholder: "title", value: this.title},
                  on: {
                    input: event => {
                      this.title = event.target.value
                    },
                    paste: event => {
                      event.stopPropagation()
                      this.title = event.target.value
                    }
                  }
                }),
              createElement(
                'input', 
                {
                  attrs: {type: "text", class:"cap", style: "width: 100%; border: solid 1px lightgrey; padding: 3px; ", placeholder: "caption", value: this.caption},
                  on: {
                    input: event => {
                      this.caption = event.target.value
                    },
                    paste: event => {
                      event.stopPropagation()
                      this.caption = event.target.value
                    }
                  }
                })
            ])
          ])
      }
    }
  }
}