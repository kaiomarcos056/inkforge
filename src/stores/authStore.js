import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userUuid: null, // Armazena o UUID do usuário
  }),
  actions: {
    setUserUuid(uuid) {
      this.userUuid = uuid; // Define o UUID do usuário
    },
    clearUser() {
      this.userUuid = null; // Limpa o UUID quando o usuário faz logout
    },
  },
});