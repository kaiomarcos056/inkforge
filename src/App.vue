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
import { useTokenStore } from '@/stores/tokenStore';

import axios from "axios";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      tokenStore: useTokenStore(),
      authStore: useAuthStore(), // Certifique-se de chamar a store aqui
    };
  },

  methods: {
    async generateNewToken() {
      try{
        
        const response = await axios.post("https://inkforge-be.onrender.com/auth/login", {
          email: "max@email.com",
          senha: "senha123",
        });

        const newToken = response.data.token;
        const expiresIn = response.data.expiresIn;

        this.tokenStore.setToken(newToken, expiresIn);
      }
      catch (error) {
        console.error("Erro ao gerar novo token:", error);
      }
    }
  },
  async mounted() {
    if (this.tokenStore.isTokenExpired()) {
      await this.generateNewToken();
      console.log('gerando token..')
    }
    else{
      console.log('token valido.')
    }
  },
  created() {
    this.authStore.setUserUuid('8a49ae9f-5189-4aa0-b285-aa983ec1ef96');
  }
};
</script>

<style scoped>
</style>