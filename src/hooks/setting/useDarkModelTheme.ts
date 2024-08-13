import { computed } from 'vue';
import { theme } from 'ant-design-vue';
import { ThemeEnum } from '@/enums/appEnum';
import { useAppStore } from '@/store/modules/app';

export function useDarkModeTheme() {
  const appStore = useAppStore()
  const { darkAlgorithm } = theme;
  const isDark = computed(() => appStore.themeModel === ThemeEnum.DARK);
  const darkTheme = {
    algorithm: [darkAlgorithm],
  };

  return {
    isDark,
    darkTheme,
  };
}
