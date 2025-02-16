<template>

  <v-app>

    <AppBar />

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import { useAuthStore } from '@/stores/authStore';

export default {
  components: {
    AppBar,
  },
  created() {
    const authStore = useAuthStore();
    authStore.setUserUuid('8a49ae9f-5189-4aa0-b285-aa983ec1ef96');
    console.log(authStore.userUuid)
  }
};
</script>

<style scoped>
</style>