# 代码问题与优化建议

## 需要尽快修复的问题
- **Pinia 中错误使用 `this`**（`src/stores/menuItemName.js:8-10`）：setup 写法的 store 没有 `this`，`setMenuRef` 执行时会抛出 “Cannot set properties of undefined”。结果是 `menuStore.menuRef` 一直为 `null`，`HomeView` 中所有 `menuStore.menuRef.open(...)` 调用都会继续报错，侧边栏也无法联动。应直接赋值 `menuRef.value = ref` 或改为 `menuRef.value = ref.value`.
- **侧边栏配置缺少路由**（`src/assets/asideConfig.js:79-86`）：算法模块的分组没有 `path`，`aside.vue:12-15` 仍会调用 `router.push(undefined)`，在 Vue Router 里会触发导航失败警告。要么补充有效路径，要么在触发跳转前做判空。
- **`HomeView` 过度依赖全局 DOM**（`src/views/HomeView.vue:22-67`）：watch 中同时读取 `router.currentRoute` 和 `location.pathname`，并通过 `setTimeout + document.getElementById(...).click()` 驱动菜单，既易错也破坏 SSR/单元测试环境。建议使用 `useRoute()`、`nextTick` 和组件内的 ref 来完成同样逻辑，并在 `menuStore.menuRef` 为 `null` 时给出保护。
- **示例代码渲染存在标签错误**（`src/components/basic/event.vue:121-127`）：`innerHTML` 拼接的字符串以 `<pre>` 结尾但没有闭合标签，浏览器会自动更正但会导致多余嵌套，还直接把字符串写进 DOM，存在 XSS 隐患。应改用 `<pre><code>` 模板 + `escapeHtml` 的返回值。

## 可优化的实现
- **高亮插件重复加载**（`src/main.js:11-33`）：同时 `app.use(VueHighlightJS)`、`app.use(hljsVuePlugin)`，又注册自定义 `v-highlight` 指令，功能重叠且增加包体。保留一种插件，再在 `codeBlock` 内触发 `highlightElement` 即可。
- **`codeBlock` 组件未利用 `language` 参数**（`src/common/components/codeBlock.vue:2-17`）：目前只显示一个 `<h6>` 标签，`<code>` 元素没有 `class="language-xxx"`，也没有把语言信息传给高亮库，导致无法按需着色。可将 `language` 拼成 `code` 标签的 class 或 data 属性。
- **`router/index.js` 中的布局未显式建层**（`src/router/index.js:2-35`）：虽然 `App.vue` 手动渲染 `HomeView`，但路由表未声明 layout，导致首屏 `/home` 只能渲染 `views/index.vue`（目前内容为占位的 “111”），且每个业务页面都绕不过该占位。可以把 `HomeView` 当作根路由组件并在其下配置子路由，顺便移除未使用的 `import HomeView`.
