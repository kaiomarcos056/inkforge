import { createApp } from "vue";
import App from "./App.vue";

// VUE ROUTER
import router from "./router";

// VUETIFY
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// PINIA
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

import SocialSharing from 'vue3-social-sharing';

const pinia = createPinia();
pinia.use(piniaPersist);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(SocialSharing)
  .mount('#app');
