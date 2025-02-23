import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    usuario: {},
  }),
  actions: {
    setNome(nome) {
      this.usuario.nome = nome;
    },
    setEmail(email) {
      this.usuario.email = email;
    },
    setSenha(senha) {
      this.usuario.senha = senha;
    },
    limpaUsuario() {
      this.usuario = {};
    },
  },
});