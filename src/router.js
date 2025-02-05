import { createRouter, createWebHistory } from "vue-router";

// Defina os componentes das rotas
import Home from "@/views/Home.vue";
import Historia from "@/views/Historia.vue";
import Capitulo from "@/views/Capitulo.vue";
import NovoLivro from "@/views/NovoLivro.vue";
import MinhaBiblioteca from "@/views/MinhaBiblioteca.vue";

const routes = [
  { path: "/", name: "Home", component: Home },

  { path: "/new-book", name: "NovoLivro", component: NovoLivro },
  { path: "/biblioteca", name: "NovoLivro", component: MinhaBiblioteca },

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