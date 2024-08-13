<template>
  <div :class="prefixCls">
    <a-tooltip placement="bottom">
      <template #title>
        <span>设置</span>
      </template>
      <SettingOutlined />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { SettingOutlined } from '@ant-design/icons-vue';
const { prefixCls } = useDesign('header-setting')
</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-header-setting';

.anticon-setting {
  padding: 5px;
  margin-right: 15px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-side);
  }
}
</style>