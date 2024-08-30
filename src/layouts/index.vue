<template>
  <a-layout class="layout-default">
    <Asider />
    <a-layout class="layout-content">
      <Header />
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Asider from './components/Asider/index.vue'
import Header from './components/Header/index.vue'
</script>
<style scoped lang="scss">
.layout-default {
  flex-direction: row;
  height: 100%;
  .layout-content {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    background: var(--bg-color-theme);
  }
}
</style>