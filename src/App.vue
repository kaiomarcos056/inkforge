<template>

  <v-app>

    <AppBar v-if="$route.path !== '/' && $route.path !== '/novousuario' && $route.path !== '/novoperfil' && $route.path !== '/login'" />

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

import axios from "axios";

export default {
  components: {
    AppBar,
  },

};
</script>

<style scoped>
</style>