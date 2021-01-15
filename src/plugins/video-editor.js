import { Node } from 'tiptap'
import { nodeInputRule } from 'tiptap-commands'

const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export default class VideoEditor extends Node {
  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get name() {return 'video'}

  inputRules({ type }) {
    return [
      nodeInputRule(VIDEO_INPUT_REGEX, type, match => {
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
        width: {
          default: 320
        },
        height: {
          default: 120
        }
      },
      group: 'block',
      selectable: true,
      draggable: true,
      parseDOM: [{
        tag: 'iframe',
        getAttrs: dom => ({
          src: dom.src,
          width: dom.width,
          height: dom.height
        })
      }],
      toDOM: (node) => {
        return ['iframe', 
          {
            class: 'video yt', 
            frameborder: 0, 
            src: node.attrs.src,
            allowfullscreen: true
          }
        ]
      },
    }
  }

  get view() {
    // This is rendered as a Vue component and so it has
    // the same interface as a renderless component.
    return {
      // Give it a name to work with Vue dev tools
      name: 'VideoView',
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
              class: 'video',
              style: 'border: solid grey 1px; display: flex; align-items: center'
            },
            [
              // https://vuejs.org/v2/guide/render-function.html#Complete-Example
              createElement('iframe', {
                attrs: {src: this.src, width: '160px', height: '120px', style: "margin: 18px", allowfullscreen: true}
              }),
              createElement("div", [
                createElement('a', {attrs: {href: this.src.replace('embed/', 'watch?v='), target: "_blank"}}, [this.src.replace('embed/', 'watch?v=')])
              ])
          ])
      }
    }
  }
}