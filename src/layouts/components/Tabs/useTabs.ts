import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { ref } from "vue";
import { useRouter, type RouteLocationNormalized } from "vue-router";

// 初始化固定的tabs
export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([]);
  const tabStore = useMultipleTabStore()
  const router = useRouter()

  /**
   * 过滤出所有fixed的路由
   * @param routes 
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]): RouteLocationNormalized[] {
    return routes && routes.filter(route => route.meta && route.meta.affix)
  }

  function addAffixTabs(): void {
    const affixTabs = filterAffixTabs(router.getRoutes() as unknown as RouteLocationNormalized[])
    affixList.value = affixTabs
    for (const tab of affixTabs) {
      tabStore.addTab({
        meta: tab.meta,
        name: tab.name,
        path: tab.path
      } as unknown as RouteLocationNormalized)
    }
  }

  addAffixTabs()
  return affixList.value.map(item => item.meta?.title as string)
}