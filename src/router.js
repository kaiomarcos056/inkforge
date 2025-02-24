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
  { path: "/ckeditor", name: "CkEditor", component: CkEditor },

  //{ path: "/votacao/:id", name: "Votacao", component: Votacao },
  { path: "/votacao", name: "Votacao", component: Votacao },

  { path: "/", name: "Inicio", component: Inicio },

  { path: "/home", name: "Home", component: Home },

  { path: "/login", name: "Login", component: Login },

  { path: "/novousuario", name: "NovoUsuario", component: NovoUsuario },

  { path: "/novoperfil", name: "NovoPerfil", component: NovoPerfil },

  { path: "/homelivro/:id", name: "HomeLivros", component: HomeLivros },

  { path: "/novaescolha", name: "NovaEscolha", component: NovaEscolha },
  
  { path: "/novapagina", name: "NovaPagina", component: NovaPagina },

  { path: "/novocapitulo/:id", name: "NovoCapitulo", component: NovoCapitulo },

  { path: "/listaescolha/:id", name: "ListaEscolha", component: ListaEscolha },

  { path: "/edicaolivro", name: "EdicaoLivro", component: EdicaoLivro },

  { path: "/novolivro", name: "NovoLivro", component: NovoLivro },

  { path: "/biblioteca", name: "MinhaBiblioteca", component: MinhaBiblioteca },

  { path: "/historia/:id", name: "Historia", component: Historia },

  { path: "/capitulo", name: "Capitulo", component: Capitulo },

  { path: "/dinamico", name: "TextoDinamico", component: TextoDinamico },

  { path: "/historico", name: "Historico", component: Historico },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;