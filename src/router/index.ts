import { createRouter, createWebHashHistory } from "vue-router";
import { asyncRoutes } from "./routes";
import { PageEnum } from "@/enums/pageEnum";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: PageEnum.BASE_HOME,
      meta: {
        title: 'Root'
      }
    },
    ...asyncRoutes,
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    }
  ]
})
export default router