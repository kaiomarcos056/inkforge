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
  .use(createPinia())
  .mount('#app');
