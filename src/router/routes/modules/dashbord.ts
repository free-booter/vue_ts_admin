import { LAYOUT } from "@/router/constants";
import type { RouteRecordRaw } from "vue-router";

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'AppstoreOutlined',
    title: 'Dashboard'
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      meta: {
        title: '分析页'
      },
      component: () => import('@/views/dashboard/analysis/index.vue')
    },
    {
      path: 'workbench',
      name: 'Workbench',
      meta: {
        title: '工作台'
      },
      component: () => import('@/views/dashboard/workbench/index.vue')
    }
  ]
}
export default dashboard