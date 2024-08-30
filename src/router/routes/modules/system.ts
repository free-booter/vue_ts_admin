import { LAYOUT } from "@/router/constants";

const system = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    icon: 'SettingOutlined',
    title: '系统管理'
  },
  children: [
    {
      path: '/system/user',
      name: 'User',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/views/system/user/index.vue')
    },
    {
      path: '/system/role',
      name: 'Role',
      meta: {
        title: '角色管理'
      },
      component: () => import('@/views/system/role/index.vue')
    },
    {
      path: '/system/menu',
      name: 'Menu',
      meta: {
        title: '菜单管理'
      },
      component: () => import('@/views/system/menu/index.vue')
    },
    {
      path: '/system/dept',
      name: 'Dept',
      meta: {
        title: '部门管理'
      },
      component: () => import('@/views/system/dept/index.vue')
    }
  ]
}
export default system