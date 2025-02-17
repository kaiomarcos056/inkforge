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

const routes = [
  { path: "/", name: "Home", component: Home },

  { path: "/homelivro/:id", name: "HomeLivros", component: HomeLivros },

  { path: "/novaescolha", name: "NovaEscolha", component: NovaEscolha },
  
  { path: "/novapagina", name: "NovaPagina", component: NovaPagina },

  { path: "/novocapitulo/:id", name: "NovoCapitulo", component: NovoCapitulo },

  { path: "/listaescolha/:id", name: "ListaEscolha", component: ListaEscolha },

  { path: "/edicaolivro", name: "EdicaoLivro", component: EdicaoLivro },

  { path: "/new-book", name: "NovoLivro", component: NovoLivro },

  { path: "/biblioteca", name: "MinhaBiblioteca", component: MinhaBiblioteca },

  { path: "/historia/:id", name: "Historia", component: Historia },

  { path: "/capitulo", name: "Capitulo", component: Capitulo },

  { path: "/dinamico", name: "TextoDinamico", component: TextoDinamico },

];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;