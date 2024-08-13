<template>
  <div :class="prefixCls">
    <a-tooltip placement="bottom">
      <template #title>
        <span>全屏</span>
      </template>
      <FullscreenOutlined />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { FullscreenOutlined } from '@ant-design/icons-vue';
const { prefixCls } = useDesign('header-fullscreen')
</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-header-fullscreen';

.#{$prefix-cls} {
  margin: 0 20px;
}

.anticon-fullscreen {
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background: var(--bg-side);
  }
}
</style>