import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'


let vuetify = new Vuetify({
    theme: {
        base: colors.cyan.base
    }
});

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: 'mdi'
  })

Vue.use(Vuetify);

export default vuetify
