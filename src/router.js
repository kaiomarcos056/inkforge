import { createRouter, createWebHistory } from "vue-router";

// Defina os componentes das rotas
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;