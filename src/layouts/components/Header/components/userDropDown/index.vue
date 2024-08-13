<template>
  <div :class="prefixCls">
    <a-dropdown placement="bottom" arrow @openChange="handleOpenChange">
      <div :class="`${prefixCls}-trigger`">
        <a-avatar :size="30">USER</a-avatar>
        <span style="margin: 0 10px;">管理员</span>
        <DownOutlined :class="{'trigger--down': isDown}" />
      </div>
      <template #overlay>
        <a-menu >
          <a-menu-item key="1">
            <UserOutlined style="margin-right: 5px;" />
            <span>个人资料</span>
          </a-menu-item>
          <a-menu-item key="2">
            <PoweroffOutlined style="margin-right: 5px;" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>

</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { DownOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const { prefixCls } = useDesign('user-dropdown')
const isDown = ref<boolean>(false)
const handleOpenChange = (flag: boolean) => {
  isDown.value = flag
}
</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-user-dropdown';

.#{$prefix-cls} {
  cursor: pointer;
  &-trigger {
    display: flex;
    align-items: center;
    line-height: 1px;
  }
  .anticon-down {
    transition: .5s all;
  }
  .trigger--down {
    transform: rotate(180deg);
  }
}
</style>