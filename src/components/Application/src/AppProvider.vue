<script lang="ts">
import { prefixCls } from '@/settings/designSetting';
import { defineComponent, ref, toRefs } from 'vue';
import { createAppProviderContext } from '../useAppContext';
const props = {
  prefixCls: {
    type: String,
    default: prefixCls
  }
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    // * 添加全局变量
    const { prefixCls } = toRefs(props)
    const isMobile = ref(false)
    createAppProviderContext({prefixCls,isMobile})

    return () => slots.default?.()
  }
})
</script>
<style scoped lang="scss"></style>