import type { RouteRecordRaw } from "vue-router";

// 拿到modules中的所有文件
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach(key => {
  const mod = (modules as Record<string, any>)[key].default || {}
  routeModuleList.push(mod)
})

export const asyncRoutes = [...routeModuleList]
