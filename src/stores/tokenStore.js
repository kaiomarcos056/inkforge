import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: null,
    expiration: null,
  }),
  actions: {
    setToken(newToken, expiresIn) {
        this.token = newToken;
        this.expiration = new Date().getTime() + expiresIn
    },
    isTokenExpired() {
        return !this.expiration || new Date().getTime() > this.expiration;
    },
    clearToken() {
        this.token = null;
        this.expiration = null;
    },
  },
});