import type { App } from "vue"

export function setupGlobDirectives(app: App) {
  // 移除节点显示滚动条，移除隐藏
  app.directive('change-scrollbar', {
    mounted(el) {
      const toggleScrollbar = () => {
        if (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) {
          el.classList.add('showSider');
        } else {
          el.classList.remove('showSider');
        }
      };

      const removeScrollbar = () => {
        el.classList.remove('showSider');
      };

      el.addEventListener('mouseenter', toggleScrollbar);
      el.addEventListener('mousemove', toggleScrollbar);
      el.addEventListener('mouseleave', removeScrollbar);

      // 初始检查
      toggleScrollbar();
    },
    updated(el) {
      // 组件更新时重新检查
      const toggleScrollbar = () => {
        if (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) {
          el.classList.add('showSider');
        } else {
          el.classList.remove('showSider');
        }
      };
      toggleScrollbar();
    }
  });
}