import { ThemeEnum } from "@/enums/appEnum";
import { APP_THEME_MODE_KEY } from "@/enums/constantEnum";
import { themeModel } from "@/settings/designSetting";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
  state: () => ({
    themeModel: localCache.getCache(APP_THEME_MODE_KEY) || themeModel,
    isCollapse: false,
  }),
  actions: {
    // 更改主题
    setThemeModel(mode: ThemeEnum): void {
      this.themeModel = mode
      localCache.setCache(APP_THEME_MODE_KEY, mode)
    },
    // 折叠侧边栏
    setMenuSetting(isCollapse: boolean) {
      this.isCollapse = isCollapse
    }
  }
})