import { authStore } from '@/stores/authStore';

import { createRouter, createWebHistory } from "vue-router";

// Defina os componentes das rotas
import Home from "@/views/Home.vue";
import Historia from "@/views/Historia.vue";
import Capitulo from "@/views/Capitulo.vue";
import NovoLivro from "@/views/NovoLivro.vue";
import MinhaBiblioteca from "@/views/MinhaBiblioteca.vue";
import EdicaoLivro from "@/views/EdicaoLivro.vue";
import NovaEscolha from "@/views/NovaEscolha.vue";
import HomeLivros from "@/views/HomeLivros.vue";
import NovoCapitulo from "@/views/NovoCapitulo.vue";
import NovaPagina from "@/views/NovaPagina.vue";
import ListaEscolha from "@/views/ListaEscolha.vue";
import TextoDinamico from "@/views/TextoDinamico.vue";
import Inicio from "@/views/Inicio.vue";
import NovoUsuario from "@/views/NovoUsuario.vue";
import NovoPerfil from "@/views/NovoPerfil.vue";
import Login from "@/views/Login.vue";
import Historico from "@/views/Historico.vue";
import CkEditor from "@/views/CkEditor.vue";
import Votacao from "@/views/Votacao.vue";

const routes = [
  { path: "/ckeditor", name: "CkEditor", component: CkEditor, meta: { requiresAuth: true } },

  { path: "/votacao", name: "Votacao", component: Votacao, meta: { requiresAuth: true } },

  { path: "/", name: "Inicio", component: Inicio, meta: { requiresAuth: false } },

  { path: "/home", name: "Home", component: Home, meta: { requiresAuth: true } },

  { path: "/login", name: "Login", component: Login, meta: { requiresAuth: false } },

  { path: "/novousuario", name: "NovoUsuario", component: NovoUsuario, meta: { requiresAuth: false } },

  { path: "/novoperfil", name: "NovoPerfil", component: NovoPerfil, meta: { requiresAuth: false } },

  { path: "/homelivro/:id", name: "HomeLivros", component: HomeLivros, meta: { requiresAuth: true } },

  { path: "/novaescolha", name: "NovaEscolha", component: NovaEscolha, meta: { requiresAuth: true } },
  
  { path: "/novapagina", name: "NovaPagina", component: NovaPagina, meta: { requiresAuth: true } },

  { path: "/novocapitulo/:id", name: "NovoCapitulo", component: NovoCapitulo, meta: { requiresAuth: true } },

  { path: "/listaescolha/:id", name: "ListaEscolha", component: ListaEscolha, meta: { requiresAuth: true } },

  { path: "/edicaolivro", name: "EdicaoLivro", component: EdicaoLivro, meta: { requiresAuth: true } },

  { path: "/novolivro", name: "NovoLivro", component: NovoLivro, meta: { requiresAuth: true } },

  { path: "/biblioteca", name: "MinhaBiblioteca", component: MinhaBiblioteca, meta: { requiresAuth: true } },

  { path: "/historia/:id", name: "Historia", component: Historia, meta: { requiresAuth: true } },

  { path: "/capitulo", name: "Capitulo", component: Capitulo, meta: { requiresAuth: true } },

  { path: "/dinamico", name: "TextoDinamico", component: TextoDinamico, meta: { requiresAuth: true } },

  { path: "/historico", name: "Historico", component: Historico, meta: { requiresAuth: true } },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const exp = authStore().usuario.exp || 0;
  const unix = Math.floor(Date.now() / 1000);

  if (to.meta.requiresAuth && unix > exp) {
    next('/');
  } 
  else {
    next();
  }
});

export default router;