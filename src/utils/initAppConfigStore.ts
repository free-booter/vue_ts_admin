import { useAppStore } from "@/store/modules/app";
import { updateTheme } from "./theme/updateTheme";

export function initAppConfigStore() {
  // 主题
  const appStore = useAppStore()
  updateTheme(appStore.themeModel)
}