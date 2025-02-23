// import { defineStore } from 'pinia';

// export const authStore = defineStore('auth', {
//   state: () => ({
//     usuario: {},
//   }),
//   actions: {
//     setUsuario(usuario) {
//       this.usuario = usuario;
//     },
//     limparUsuario() {
//       this.usuario = {};
//     },
//   },
// });
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || {},
  }),
  actions: {
    setUsuario(usuario) {
      this.usuario = usuario;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    },
    limparUsuario() {
      this.usuario = {};
      localStorage.removeItem('usuario');
    },
  },
});