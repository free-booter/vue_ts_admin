<template>
  <a-layout-header :class="prefixCls">
    <section :class="`${prefixCls}-section`">
      <MenuFoldOutlined v-if="!isCollapse" class="icon-fold" @click="toggleMenuSetting" />
      <MenuUnfoldOutlined v-else class="icon-fold" @click="toggleMenuSetting" />
      <!-- 页面名字 -->
      <div class="page-title">首页</div>
      <!-- action -->
      <div :class="`${prefixCls}-action`">
        <AppSearch />
        <Notify />
        <FullScreen />
        <Setting />
        <AppDarkModeToggle />
        <UserDropDown />
      </div>
    </section>
    <Tab />
  </a-layout-header>
</template>

<script setup>
import { useDesign } from '@/hooks/web/useDesign';
import { useAppStore } from '@/store/modules/app';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import AppSearch from '@/components/Application/src/search/AppSearch.vue';
import Notify from './components/notify/index.vue'
import FullScreen from './components/fullScreen/index.vue'
import Setting from './components/setting/index.vue'
import UserDropDown from './components/userDropDown/index.vue'
import Tab from '../Tabs/index.vue'
import { computed } from 'vue';
import AppDarkModeToggle from '@/components/Application/src/AppDarkModeToggle.vue';
const AppStore = useAppStore()

const { prefixCls } = useDesign('layout-header')

const isCollapse = computed(() => AppStore.isCollapse)
const toggleMenuSetting = () => {
  AppStore.setMenuSetting(!isCollapse.value)
}

</script>
<style scoped lang='scss'>
$prefix-cls: '#{$namespace}-layout-header';

.#{$prefix-cls} {
  width: 100%;
  height: auto;
  padding: 0;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: var(--bg-side);

  &-section {
    width: 100%;
    display: flex;
    align-items: center;
    padding-inline: 20px;
  }

  &-action {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}

.icon-fold {
  height: fit-content;
  font-size: 20px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-side);
  }
}

.page-title {
  margin-left: 20px;
}
</style>