import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

let vuetify = new Vuetify({
    theme: {
        base: colors.cyan.base
    }
});


export default vuetify