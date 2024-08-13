<template>
  <div class="layout-asider">
    <section class="system-logo">
      <img src="../../../assets/svg/logo.svg" alt="">
      <span v-if="!isCollapse">Vue Admin</span>
    </section>
    <a-layout-sider :width="230" hide-trigger :collapsed="isCollapse" collapsible v-change-scrollbar>
      <Menu />
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Menu from './Menu.vue'
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
</script>
<style scoped lang="scss">
.layout-asider {
  flex: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: var(--bg-side-text);
  box-sizing: border-box;
  border-right: 1px solid var(--border-color);
  background: var(--bg-side);

  .system-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    img {
      width: 40px;
      margin-right: 10px;
    }

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .ant-layout-sider {
    flex: 1 0 230px !important;
    overflow: hidden;
    background-color: transparent;
  }
  .showSider {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #CFD4DC;
      border-radius: 4px;
    }

    & {
      scrollbar-width: thin;
      scrollbar-color: #CFD4DC transparent;
    }
  }

  ::v-deep(.ant-layout-sider-trigger) {
    display: none !important;
  }
}
</style>