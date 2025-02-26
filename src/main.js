import { createApp } from "vue";
import App from "./App.vue";

import { createHead } from "@vueuse/head"; // Substituto do vue-meta

import router from "./router";

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

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

const head = createHead(); // Criando o head manager

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(head) // Usando o head manager no Vue 3
  .mount('#app');
