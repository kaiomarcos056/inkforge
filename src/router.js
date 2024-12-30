import { createRouter, createWebHistory } from "vue-router";

// Defina os componentes das rotas
import Home from "@/views/Home.vue";
import Historia from "@/views/Historia.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/historia", name: "Historia", component: Historia },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;