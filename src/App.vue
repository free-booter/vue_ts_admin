<template>
  <a-configProvider :theme="themeConfig">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </a-configProvider>
</template>

<script setup lang="ts">
import AppProvider from '@/components/Application/src/AppProvider.vue'
import { computed } from 'vue';
import { RouterView } from 'vue-router';
import { useDarkModeTheme } from '@/hooks/setting/useDarkModelTheme'

const { isDark, darkTheme } = useDarkModeTheme()
const themeConfig = computed(() => Object.assign(
  {
    token: {
      colorPrimary: '#0960bd',
      colorSuccess: '#55D187',
      colorWarning: '#EFBD47',
      colorError: '#ED6F6F',
      colorInfo: '#0960bd',
    },
  },
  isDark.value ? darkTheme : {},
))
</script>
<style scoped lang="scss"></style>