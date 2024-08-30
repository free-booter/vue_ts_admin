<template>
  <div :class="prefixCls">
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" @change="handleLinkTo">
      <a-tab-pane v-for="pane in tabsState" :key="pane.path" :closable="pane.meta && !pane.meta.affix">
        <template #tab>
          <div class="tab-content">
            <span>{{ pane.meta.title }}</span>
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { initAffixTabs } from './useTabs'
import { computed } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const { prefixCls } = useDesign('layout-tabs')

// 初始化固定tabs
const affixTextList = initAffixTabs();
console.log(affixTextList, 'affixTextList');
const activeKey = ref('1')

const tabStore = useMultipleTabStore()
const tabsState = computed(() => {
  return tabStore.tabList
});

const router = useRouter()
const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'remove') {
    tabStore.closeTabByKey(targetKey as string, router)
  }

};
// 点击跳转到对应页面
const handleLinkTo = (path: string) => {
  router.push(path)
}
// 监听路由的变化
watch(() => router.currentRoute.value.path, (val) => {
  activeKey.value = val
  console.log(val);
  // 将当前的路由添加到tabs中
  const currentRoute = router.currentRoute.value
  tabStore.addTab(currentRoute)
}, { immediate: true })
</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-layout-tabs';

.#{$prefix-cls} {
  padding: 5px 5px 0;
  border-top: 1px solid var(--border-color);
  box-sizing: border-box;
  background: var(--bg-side);

  ::v-deep(.ant-tabs-nav) {
    margin-bottom: 0;

    .ant-tabs-tab {
      margin-right: 5px;

      .tab-content {
        display: flex;
        align-items: center;
      }

      .anticon-close {
        display: none;
        font-size: 12px;
        margin-left: 10px;
        margin-right: 0;
      }

      &.ant-tabs-tab-active {
        background: var(--primary-color);

        .ant-tabs-tab-btn,
        .ant-tabs-tab-remove {
          color: #fff;
        }

        .anticon-close {
          display: block;
        }
      }

      &:hover {
        .anticon-close {
          display: block;
        }
      }
    }
  }
}
</style>