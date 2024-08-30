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
import { useRoute, useRouter } from 'vue-router';
const appStore = useAppStore()

function getItem(
  label: VueElement | string,
  key: string,
  meta: {},
  path: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    meta,
    path,
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
    obj.meta = route.meta || {}

    if (route.children?.length) {
      obj.children = []
      for (let i = 0; i < route.children.length; i++) {
        let data = recursion(route.children[i], `${key}-${i}`)
        obj.children.push(data)
      }
    }
    return getItem(obj.label, key, obj.meta, obj.path, obj.icon ? () => h(obj.icon) : null, obj.children ? obj.children : null)
  }
  for (let i = 0; i < asyncRoutes.length; i++) {
    const menuItem = recursion(asyncRoutes[i], `${i}`)
    list.push(menuItem)
  }
  menuList.push(...list)
}
routeToMenu()

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['0']);

const router = useRouter()
const handleClick: MenuProps['onClick'] = e => {
  const { item } = e
  router.push(item.path as string)
};

const themeModel = computed(() => appStore.themeModel)

const route = useRoute()

/**
 * 在数组中找到某一个key
 * @param arr 数组
 * @param key 需要寻找的key
 * @param val key对应的值
 * @returns 找到的对象或undefined
 */
const recursionFindKey = (arr: any[], key: string, val: any): any => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return arr[i];  // 找到匹配的对象，立即返回
    } else if (arr[i].children && arr[i].children.length) {
      const found = recursionFindKey(arr[i].children, key, val);
      if (found) return found;  // 如果在递归中找到，返回结果
    }
  }
  return undefined;  // 如果没有找到，返回undefined
}

// 监听路由并找到对应的key
watch(() => route.path, val => {
  const current = recursionFindKey(menuList, 'path', val)
  selectedKeys.value = [current.key]
  if (current.key.includes('-')) {
    const openVal = recursionFindKey(menuList, 'key', current.key.split('-')[0]).key || '0'
    openKeys.value = [openVal]
  }
}, { immediate: true });
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