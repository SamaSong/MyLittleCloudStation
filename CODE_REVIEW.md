# 代码审阅

- **滚动事件监听未解绑（`src/views/HomeView.vue:184-207`）**  
  组件在挂载时用 `debounce(handleScroll, 300)` 注册了滚动监听，但卸载时却调用原始的 `handleScroll` 去移除。由于没保存同一个防抖函数引用，每次进入页面都会新增监听器，导致内存泄漏并重复执行。应把防抖之后的函数放到常量/`ref` 中，既用于 `addEventListener` 也用于 `removeEventListener`。

- **固定坐标判断可视元素（`src/views/HomeView.vue:176-182`）**  
  `handleScroll` 假定“当前可视标题”永远位于 `document.elementFromPoint(840, 300)`，在小屏幕或缩放后的窗口里这个坐标可能不在内容区，结果 aside 激活态不会更新。建议改用每个标题的 `getBoundingClientRect` 或引入 `IntersectionObserver`，并把根节点限定为 `.page-main`，从而适配不同视口。

- **依赖 `location.pathname` 推导页脚（`src/views/HomeView.vue:29-38`）**  
  虽然 `watch` 已能拿到最新路由，但实现里仍读取 `location.pathname` 并对整个配置执行 `map → filter → [0]`。这在应用部署到子路径时会失效，也让单测更难写。可以改成 `watch(route, (to) => { ... })`，使用 `find`/`findIndex` 并依赖 `to.path`，这样 SSR 和单元测试都能工作。

- **依赖 DOM 点击驱动菜单（`src/views/HomeView.vue:44-55`, `src/views/HomeView.vue:141-149`, `src/views/HomeView.vue:190-199`）**  
  脚部导航和搜索跳转都通过 `document.getElementById(...).click()` 和 `setTimeout` 触发 Element Plus 菜单，这在节点缺失（如包含 `/` 的 id）时会静默失败，也绕过了 Vue 的响应式。可在 Pinia 中存储当前展开的 section/group，通过 `<el-menu>` 的 `default-active`、`openeds` 或 `@select` 控制菜单状态，避免直接操作 DOM。

- **搜索结果截断子项匹配（`src/views/HomeView.vue:92-110`）**  
  `filteredSearchItems` 只要匹配到分组就立刻返回，导致子节点即便模糊命中了也永远不会显示，用户无法直达具体锚点。可考虑返回组合列表（如 `return [...matchedGroups, ...matchedChildren]`）或做排序，让子项在分组结果后继续展示。

- **语法高亮集成重复（`src/main.js:11-33`）**  
  同时引入了 `vue-highlightjs`、`@highlightjs/vue-plugin` 以及自定义 `v-highlight` 指令，会把 highlight.js 打包多份并增加 CSS 体积。建议保留其中一种实现即可：要么继续用轻量指令，要么完全交给 `hljsVuePlugin`，其余插件及样式可以移除。

- **生产环境日志（`src/App.vue:5-11`）**  
  `console.log('欢迎来到我的前端云小站')` 在所有环境都会输出，应删除或用 `if (import.meta.env.DEV)` 包裹，避免生产控制台出现调试信息。

- **子菜单点击混淆展开与跳转（`src/components/aside.vue:37-64`）**  
  每个 `el-sub-menu` 都绑定了 `@click`，展开分组时便会立刻导航，且当路由在外部变动时 `activeName` 不会自动更新。可以利用菜单的 `@select` 事件，或直接把路由跳转交给 `router-link`/`el-menu-item`，同时保留 Element Plus 自带的展开/折叠逻辑。

