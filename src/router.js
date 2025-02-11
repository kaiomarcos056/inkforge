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

const routes = [
  { path: "/", name: "Home", component: Home },

  { path: "/homelivro", name: "HomeLivros", component: HomeLivros },

  { path: "/novaescolha", name: "NovaEscolha", component: NovaEscolha },

  { path: "/edicaolivro", name: "EdicaoLivro", component: EdicaoLivro },

  { path: "/new-book", name: "NovoLivro", component: NovoLivro },

  { path: "/biblioteca", name: "MinhaBiblioteca", component: MinhaBiblioteca },

  { path: "/historia/:id", name: "Historia", component: Historia },

  { path: "/historia/:id/capitulo", name: "Capitulo", component: Capitulo,
    props: (route) => ({
      id: route.params.id,
      capitulo: route.query.capitulo,
      page: route.query.page,
    }),
  },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;