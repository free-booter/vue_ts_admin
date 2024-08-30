import { defineStore } from "pinia";
import { toRaw } from "vue";
import type { RouteLocationNormalized, Router } from "vue-router";

export interface MultipleTabState {
  tabList: RouteLocationNormalized[];
}

export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    tabList: []
  }),
  actions: {
    addTab(route: RouteLocationNormalized) {
      // 判断是否已经存在
      let updateIndex = -1
      const tabHasExits = this.tabList.some((item, index) => {
        updateIndex = index
        return item.path === route.path
      })

      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        this.tabList.splice(updateIndex, 1, curTab)
        return
      }
      this.tabList.push(route)
    },
    closeTabByKey(key: string, router: Router) {
      // 判断是否存在tabList
      const index = this.tabList.findIndex(item => item.path === key)
      if(index !== -1) {
        // 判断是否关闭当前路由
        const { currentRoute, replace } = router;
        if(currentRoute.value.path === key) {
          const page = this.tabList[index - 1]
          this.tabList.splice(index, 1)
          replace(page)
        } else {
          this.tabList.splice(index, 1)
        }
      }
    }
  }
})