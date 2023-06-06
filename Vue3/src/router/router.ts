import BoardRegisterPage from "../views/board/BoardRegisterPage.vue";
import BoardGetPage from "../views/board/BoardGetPage.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "BoardRegisterPage",
    component: BoardRegisterPage,
  },
  {
    path: "/board",
    name: "BoardPage",
    component: BoardRegisterPage,
  },
  {
    path: "/board/list",
    name: "BoardGetPage",
    component: BoardGetPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
