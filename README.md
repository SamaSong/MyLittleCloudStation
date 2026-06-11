# MyLittleCloudStation

我的前端云小站。项目用于沉淀 Vue、JavaScript、CSS、TypeScript、WebAPI、CesiumJS、算法等前端知识点，并提供统一的文章布局、侧边导航、搜索、代码高亮和示例代码展示能力。

## 技术栈

- Vue 3 + Vite
- Vue Router
- Pinia
- Element Plus
- SCSS
- Highlight.js
- CesiumJS
- JSX 支持
- Markdown 组件支持

## 环境要求

项目 `package.json` 指定 Node 版本：

```sh
node ^20.19.0 || >=22.12.0
```

## 常用命令

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

说明：

- `npm run dev`：启动本地开发服务，并自动打开浏览器。
- `npm run build`：生产构建。
- `npm run preview`：预览生产构建结果。
- `npm run lint`：执行 ESLint，并自动修复可修复问题。

## 项目结构

```txt
src
├── App.vue
├── main.js
├── router
│   └── index.js
├── stores
│   └── menuItemName.js
├── views
│   ├── index.vue
│   ├── aside.vue
│   ├── HomeView.vue
│   └── static.js
├── common
│   ├── components
│   │   ├── ArticleLayout.vue
│   │   ├── codeBlock.vue
│   │   ├── MyDictSelect.vue
│   │   ├── MyInput.vue
│   │   ├── MyInputX.jsx
│   │   ├── anchorComponents.jsx
│   │   └── customTable
│   │       └── index.vue
│   ├── config
│   │   ├── asideConfig.js
│   │   └── aside
│   └── tools
│       └── debounce.js
└── components
    ├── Vue3
    ├── jsBasic
    ├── cssBasic
    ├── TypeScriptSeries
    ├── webAPI
    ├── cesium
    └── agorithmBasic
```

目录约定：

- `src/views`：整体页面框架、首页、侧边栏、主布局。
- `src/components/<module>`：知识模块页面，例如 `Vue3`、`jsBasic`、`webAPI`。
- `src/common/components`：跨页面复用组件。
- `src/common/config/aside`：侧边栏模块配置，路由也基于这里自动生成。
- `*.examples.js`：页面中的长代码示例统一抽离到同目录示例文件，避免 Vue 文件过长。
- `public`：静态资源和 Markdown 资源，例如图片、`summary.md`。

## 路由与侧边栏

内容页路由不是手写在 `router/index.js` 里的，而是由 `src/common/config/asideConfig.js` 汇总各模块配置后自动生成。

配置入口：

```js
import vueConfig from './aside/vue.js'
import jsConfig from './aside/js.js'

export default [
  vueConfig,
  jsConfig,
]
```

单个模块配置示例：

```js
export default {
  name: 'WebAPI',
  children: [
    {
      name: '网络请求API',
      path: '/requestsApi',
      component: 'components/webAPI/requestsApi.vue',
      children: [
        { name: 'Fetch' },
        { name: 'FormData' },
      ],
    },
  ],
}
```

字段说明：

- `name`：侧边栏显示名称，也用于搜索匹配。
- `path`：路由路径。
- `component`：相对 `src` 的组件路径。路由通过 `import.meta.glob` 懒加载。
- `children`：文章内锚点列表。每一项的 `name` 必须和页面中的 `data-custom` 保持一致。

页面锚点要求：

```vue
<div data-custom="Fetch">
  <h2 id="_Fetch">Fetch</h2>
</div>
```

约定：

- `data-custom` 用于滚动时同步右侧/侧边当前知识点。
- `h2` 的 `id` 通常为 `_${children.name}`。
- 搜索命中具体知识点时，会跳转到 `#_${children.name}` 对应元素。

## 页面书写模式

知识文章页统一使用 `ArticleLayout`。

推荐结构：

```vue
<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import { demoExample } from './xxx.examples.js'
</script>

<template>
  <ArticleLayout
    title="页面标题"
    description="页面简介。"
  >
    <div data-custom="1、章节标题">
      <h2 id="_1、章节标题">1、章节标题</h2>
      <span class="content">
        正文内容。
      </span>
      <CodeBlock :code="demoExample" />
    </div>
  </ArticleLayout>
</template>
```

示例代码抽离模式：

```js
// xxx.examples.js
export const demoExample = `function demo() {
  return 'hello'
}`
```

页面书写建议：

- 页面只负责结构和说明，长代码放到 `*.examples.js`。
- 一个页面可以包含多个 `data-custom` 章节。
- 新增章节后同步更新对应 `src/common/config/aside/*.js`。
- 普通正文使用 `.content`。
- 重点词可使用 `.bgc`、`.sub-important`、`.b`、`.blue` 等全局样式。
- 不建议在模板中写大段内联 `style`，优先写 class。

## 自定义组件

### ArticleLayout

文件：`src/common/components/ArticleLayout.vue`

用于统一知识文章页的标题、描述、正文容器和列表样式。

Props：

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `String` | 是 | - | 页面主标题 |
| `description` | `String` | 否 | `''` | 页面简介 |

Slots：

- 默认插槽：文章主体。
- `header`：标题区额外内容。

使用：

```vue
<ArticleLayout
  title="TypeScript-高级类型"
  description="整理泛型、type、interface 等内容。"
>
  <div data-custom="泛型">
    <h2 id="_泛型">泛型</h2>
    <span class="content">正文内容。</span>
  </div>
</ArticleLayout>
```

### CodeBlock

文件：`src/common/components/codeBlock.vue`

用于展示代码，支持 Highlight.js 高亮和复制按钮。

Props：

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `code` | `String` | `''` | 代码内容，推荐使用 |
| `language` | `String` | `'js'` | 代码块头部显示语言 |
| `copyable` | `Boolean` | `true` | 是否显示复制按钮 |

推荐使用：

```vue
<CodeBlock language="ts" :code="typeExample" />
```

兼容旧插槽写法：

```vue
<CodeBlock>
  const msg = 'hello'
</CodeBlock>
```

项目内推荐统一使用 `:code`，方便把示例抽离到 `*.examples.js`。

### MyDictSelect

文件：`src/common/components/MyDictSelect.vue`

基于 Element Plus `ElSelect` 的字典下拉组件。它会透传 `$attrs` 给 `ElSelect`，支持远程加载字典、自动标准化选项、转发默认插槽，并向外暴露 `reload` 和 `getOptions`。

Props：

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `dictCode` | `String | Number` | `''` | 字典编码，传给 `fetchDict` |
| `dictOptions` | `Array` | `[]` | 本地选项 |
| `fetchDict` | `Function` | `null` | 异步获取选项的方法 |
| `autoLoad` | `Boolean` | `true` | 是否挂载后自动加载 |
| `labelKey` | `String` | `'label'` | 选项显示字段 |
| `valueKey` | `String` | `'value'` | 选项值字段 |
| `disabledKey` | `String` | `'disabled'` | 禁用字段 |

Events：

- `loaded(options)`：加载成功。
- `error(error)`：加载失败。
- `update:dictOptions(options)`：异步加载后同步标准化选项。

Expose：

- `reload()`：重新加载字典。
- `getOptions()`：获取当前标准化选项。
- Element Plus `ElSelect` 暴露的方法也会被转发。

基础用法：

```vue
<script setup>
import { ref } from 'vue'
import MyDictSelect from '@/common/components/MyDictSelect.vue'

const status = ref('')
const options = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' },
]
</script>

<template>
  <MyDictSelect
    v-model="status"
    :dict-options="options"
    clearable
    placeholder="请选择状态"
  />
</template>
```

异步加载：

```vue
<script setup>
import { ref } from 'vue'
import MyDictSelect from '@/common/components/MyDictSelect.vue'

const selectRef = ref(null)
const status = ref('')

const fetchDict = async (dictCode) => {
  const response = await fetch(`/api/dicts/${dictCode}`)
  return response.json()
}
</script>

<template>
  <MyDictSelect
    ref="selectRef"
    v-model="status"
    dict-code="user_status"
    :fetch-dict="fetchDict"
    filterable
  />
</template>
```

自定义选项插槽：

```vue
<MyDictSelect v-model="value" :dict-options="options">
  <template #default="{ options }">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="`${item.label} - ${item.value}`"
      :value="item.value"
    />
  </template>
</MyDictSelect>
```

### CustomTable

文件：`src/common/components/customTable/index.vue`

基于 Element Plus `ElTable` 的轻量封装。

特性：

- 透传 `$attrs` 给 `el-table`。
- 透传所有插槽。
- 通过 `defineExpose` 转发 `el-table` 实例方法。

使用：

```vue
<script setup>
import { ref } from 'vue'
import CustomTable from '@/common/components/customTable/index.vue'

const tableRef = ref(null)
const tableData = [
  { name: '张三', age: 18 },
]
</script>

<template>
  <CustomTable
    ref="tableRef"
    :data="tableData"
    border
  >
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </CustomTable>
</template>
```

### MyInput

文件：`src/common/components/MyInput.vue`

基于 `ElInput` 的渲染函数封装示例。组件会透传 `$attrs`、`$slots`，并把内部 `ElInput` 的 exposed 实例转发给父组件。

使用：

```vue
<script setup>
import { ref } from 'vue'
import MyInput from '@/common/components/MyInput.vue'

const inputRef = ref(null)
const value = ref('')

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <MyInput ref="inputRef" v-model="value" clearable />
  <el-button @click="focusInput">聚焦</el-button>
</template>
```

### MyInputX

文件：`src/common/components/MyInputX.jsx`

JSX 版本的 `ElInput` 二次封装示例。适合演示 JSX 中如何透传 attrs、slots，并转发内部组件实例。

使用：

```vue
<script setup>
import { ref } from 'vue'
import MyInputX from '@/common/components/MyInputX.jsx'

const value = ref('')
</script>

<template>
  <MyInputX v-model="value" clearable>
    <template #append>.com</template>
  </MyInputX>
</template>
```

注意：当前组件内部还包含一个示例用的 footer 区域和红色 div，更偏学习示例，不建议直接作为正式业务输入框使用。

### AnchorComponents

文件：`src/common/components/anchorComponents.jsx`

简单锚点列表组件。传入二维数组，点击后根据第一项作为元素 id 滚动到目标位置。

Props：

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `data` | `Array` | 是 | 形如 `[['targetId', '显示文本']]` |

使用：

```vue
<script setup>
import AnchorComponents from '@/common/components/anchorComponents.jsx'

const anchors = [
  ['js_1', '展开运算符'],
  ['js_2', '原始类型 VS 包装对象'],
]
</script>

<template>
  <AnchorComponents :data="anchors" />

  <h3 id="js_1">展开运算符</h3>
  <h3 id="js_2">原始类型 VS 包装对象</h3>
</template>
```

## 新增知识页面流程

1. 在对应模块目录新建页面，例如：

```txt
src/components/webAPI/cacheApi.vue
src/components/webAPI/cacheApi.examples.js
```

2. 页面使用 `ArticleLayout`：

```vue
<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import { cacheExample } from './cacheApi.examples.js'
</script>

<template>
  <ArticleLayout title="缓存 API" description="整理浏览器缓存相关 API。">
    <div data-custom="Cache Storage">
      <h2 id="_Cache Storage">Cache Storage</h2>
      <span class="content">正文。</span>
      <CodeBlock :code="cacheExample" />
    </div>
  </ArticleLayout>
</template>
```

3. 在对应侧边栏配置中注册：

```js
{
  name: '缓存 API',
  path: '/cacheApi',
  component: 'components/webAPI/cacheApi.vue',
  children: [
    { name: 'Cache Storage' },
  ],
}
```

4. 执行校验：

```sh
npm run lint
npm run build
```

## 内容编写规范

- Vue SFC 使用 `<script setup>`。
- import 顺序建议：`vue`、第三方库、`@/...`、相对路径。
- 示例代码优先放到 `*.examples.js`。
- `CodeBlock` 优先使用 `:code`，不要在模板中堆大段代码。
- 每个侧边栏 `children.name` 必须对应页面里的 `data-custom`。
- 标题 id 使用 `_${children.name}`，便于搜索和锚点跳转。
- 页面正文尽量按“概念说明 + 使用场景 + 代码示例 + 注意点”组织。
- 不要随意改动 `public` 中资源路径，页面里可以直接用 `/images/xxx.png`。

## Cesium 说明

Cesium 页面依赖 `VITE_APP_CESIUM_TOKEN`：

```env
VITE_APP_CESIUM_TOKEN=your_token
```

如果没有配置 token，Cesium Ion 相关地形、建筑或在线资源可能无法加载。

## 构建说明

Vite 构建配置中已做手动分包：

- `vendor-cesium`
- `vendor-element`
- `vendor-vue`
- `vendor-utils`

生产构建开启：

- `terser` 压缩
- `drop_console`
- `drop_debugger`
- sourcemap 关闭

## 维护检查清单

新增或修改内容后，至少检查：

- 页面能正常进入。
- 侧边栏能展开当前模块。
- 搜索能命中新页面或新知识点。
- 点击侧边栏知识点能滚动到正确位置。
- 代码块高亮、复制正常。
- `npm run lint` 通过。
- `npm run build` 通过。
