<template>
  <div class="flex relative" :class="getClass" @click="toggleModel">
    <div :class="`${prefixCls}__inner absolute`"></div>
    <SvgIcon name="sun" />
    <SvgIcon name="moon" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/Icon/src/SvgIcon.vue'
import { ThemeEnum } from '@/enums/appEnum';
import { useDesign } from '@/hooks/web/useDesign';
import { useAppStore } from '@/store/modules/app';
import { updateTheme } from '@/utils/theme/updateTheme';
import { computed, unref } from 'vue';
const appStore = useAppStore()

const { prefixCls } = useDesign('dark-switch')
const isDark = computed(() => appStore.themeModel === ThemeEnum.DARK);
const getClass = computed(() => [
  prefixCls,
  {
    [`${prefixCls}--dark`]: unref(isDark),
  },
]);

const toggleModel = (e: MouseEvent) => {
  handleThemeAnimation(e)
}
// 实现切换主题颜色动画效果
const handleThemeAnimation = (e: MouseEvent) => {
  if (!document.startViewTransition) {
    const model = appStore.themeModel === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
    appStore.setThemeModel(model)
    updateTheme(model)
    return
  }
  // 获取到 transition API 实例
  const transition = document.startViewTransition(() => {
    const model = appStore.themeModel === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
    appStore.setThemeModel(model)
    updateTheme(model)

  })
  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
    const { clientX, clientY } = e

    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`
    ]
    const isDark = document.documentElement.classList.contains('dark')
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 500,
        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })
}


</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-dark-switch';

.#{$prefix-cls} {
  margin-left: auto;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  height: 26px;
  padding: 0 6px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: var(--switch-color-bg);
  cursor: pointer;

  &__inner {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #f2f2f2;
    transition: transform 0.5s, background-color 0.5s;
    z-index: 1;
    will-change: transform;
  }

  &--dark {
    .#{$prefix-cls}__inner {
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>