<template>
  <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" :theme="themeModel"
    :items="menuList" @click="handleClick"></a-menu>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h, computed } from 'vue';
import * as antIcons from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import { useAppStore } from '@/store/modules/app';
import { asyncRoutes } from '@/router/routes';
import { useRouter } from 'vue-router';
const appStore = useAppStore()

function getItem(
  label: VueElement | string,
  key: string,
  title: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    title,
    children,
    label,
    type,
  } as ItemType;
}

const menuList: ItemType[] = reactive([])
// 获取路由
const routeToMenu = () => {
  const list: ItemType[] = []
  const recursion = (route: any, key: string) => {
    let obj: any = {}
    if (route.meta) {
      obj.icon = antIcons[route.meta.icon as keyof typeof antIcons]
    } else {
      obj.icon = null
    }
    obj.label = route.meta?.title || route.name
    obj.path = route.path
    obj.name = route.name

    if (route.children?.length) {
      obj.children = []
      for (let i = 0; i < route.children.length; i++) {
        let data = recursion(route.children[i], `${key}-${i}`)
        obj.children.push(data)
      }
    }
    return getItem(obj.label, key, obj.name, obj.icon ? () => h(obj.icon) : null, obj.children ? obj.children : null)
  }
  for (let i = 0; i < asyncRoutes.length; i++) {
    const menuItem = recursion(asyncRoutes[i], `${i}`)
    list.push(menuItem)
  }
  menuList.push(...list)
}
routeToMenu()

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

const router = useRouter()
const handleClick: MenuProps['onClick'] = e => {
  const { item } = e
  router.push(item.title as string)
};

const themeModel = computed(() => appStore.themeModel)

watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>
<style lang="scss" scoped>
:where(.css-dev-only-do-not-override-if0ytz).ant-menu-light {
  background: var(--bg-side);
}

:where(.css-dev-only-do-not-override-if0ytz).ant-menu-light.ant-menu-root.ant-menu-inline,
:where(.css-dev-only-do-not-override-if0ytz).ant-menu-light.ant-menu-root.ant-menu-vertical {
  border: none;
}
</style>