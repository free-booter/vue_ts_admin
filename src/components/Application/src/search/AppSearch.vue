<template>
  <div :class="prefixCls">
    <a-tooltip placement="bottom">
      <template #title>
        <span>搜索</span>
      </template>
      <SearchOutlined />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { SearchOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const { prefixCls } = useDesign('app-search')
const showModal = ref(false)
function changeModal(show: boolean) {
  showModal.value = show
}
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-app-search';

.#{$prefix-cls} {
  .anticon-search {
    padding: 5px;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 18px;

    &:hover {
      background-color: var(--bg-side);
    }
  }
}
</style>