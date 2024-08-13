<template>
  <div :class="prefixCls">
    <a-popover title="通知" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-tooltip placement="bottom">
        <template #title>
          <span>通知</span>
        </template>
        <a-badge :count="99">
          <BellOutlined />
        </a-badge>
      </a-tooltip>
    </a-popover>

  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { BellOutlined } from '@ant-design/icons-vue';

const { prefixCls } = useDesign('header-notify')
</script>
<style scoped lang="scss">
.ant-badge {
  padding: 5px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: var(--bg-side);
  }
}
</style>