<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import ArticleSection from '@/common/components/ArticleSection.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  composableExample,
  inputWrapperExample,
  teleportModalExample,
  teleportDisabledExample,
  teleportDeferExample,
} from './Vue3Trivial.examples.js'
</script>

<template>
  <ArticleLayout
    title="VUE3琐碎知识🧀"
    description="记录 Vue 3 组件封装、渲染函数、Teleport 和日常开发中容易复用的实践点。"
  >
    <ArticleSection title="如何二次封装组件（终极版）">
      <span class="content">
        当我们需要二次封装vue组件时，关键点在于原生组件的“属性”、“事件”、“插槽”、“方法”的暴露。（如果使用的是vsCode，还可以有类型的暴露）。
      </span>
      <span class="content">下面我们以ElInput为例：</span>
      <CodeBlock language="vue" :code="inputWrapperExample" />
      <span class="sub-important">我们选择使用自定义组件component，并用h函数来渲染的方式，这样使得我们在暴露插槽和方法的时候更加简便！</span><br>
      <span class="content">下面我们分布讲解：</span>
      <h3>h函数</h3>
      <span class="content">在 Vue 3 中，h 函数是一个用于创建虚拟节点（vnode）的实用工具。它是 Vue 的虚拟 DOM 系统的核心部分。</span>
      <ul>
        h函数接受三个参数：
        <li>第一个参数可以是一个字符串（用于原生元素）或一个 Vue 组件。</li>
        <li>第二个参数是一个对象，表示要传递给元素或组件的属性（props）、属性（attributes）和事件（events）等。</li>
        <li>第三个参数是子节点，可以是一个字符串（文本节点）、一个虚拟节点数组，或者一个混合了字符串和虚拟节点的数组。</li>
      </ul>
      <span class="content">可以利用第二个参数和第三个参数来暴露属性和方法。</span>
      <h3>暴露方法</h3>
      <span class="content">当这个组件挂载的时候会去调用changeRef方法，这个方法会返回一个exposed的对象，这个对象里就是这个组件暴露的方法。</span>
      <span class="content">然后我们通过getCurrentInstance()获取当前组件实例，并把当前组件实例的exposed替换为exposed</span>
    </ArticleSection>
    <ArticleSection title="组合式函数封装">
      <span class="content">
        当一段逻辑同时包含响应式状态、生命周期、副作用清理时，适合抽成 composable。它和普通工具函数的区别是：composable 可以使用 Vue 的响应式 API，并负责在组件卸载时清理副作用。
      </span>
      <CodeBlock language="js" :code="composableExample" />
      <ul>
        <li>命名使用 useXxx，调用方一眼能看出这是组合式函数。</li>
        <li>返回 ref 或 computed，让使用方保留响应式能力。</li>
        <li>凡是注册事件、定时器、观察器，都要在 onUnmounted 中释放。</li>
      </ul>
    </ArticleSection>
    <ArticleSection title="Teleport">
      <span class="content">
        Teleport 是 Vue 3 的内置组件，可以把组件内的一部分模板渲染到指定的 DOM 位置，常用于弹窗、全屏遮罩和通知。在模板中直接使用即可，无需导入。
      </span>
      <h3>为什么需要 Teleport</h3>
      <span class="content">
        弹窗嵌套在页面深处时，可能受到祖先元素的 transform、层叠上下文或 overflow 裁剪影响。将弹窗传送到 body 下，可以脱离这些容器的限制，同时继续在原组件中管理开关状态。
      </span>
      <h3>基本用法</h3>
      <CodeBlock language="vue" :code="teleportModalExample" />
      <h3>常用属性</h3>
      <ul>
        <li><code>to</code>：必填，指定传送目标，支持 CSS 选择器（如 body、#modals）或 DOM 元素对象。</li>
        <li><code>disabled</code>：为 true 时，内容在原位置渲染；为 false 时，内容传送到目标位置。可以动态切换。</li>
        <li><code>defer</code>：Vue 3.5+ 支持，将目标解析推迟到本次挂载或更新周期的其他内容渲染完成后。</li>
      </ul>
      <h3>按需禁用传送</h3>
      <span class="content">
        例如桌面端将内容作为浮层展示，移动端则保留在原位置。下面的 isMobile 是由调用方维护的响应式布尔值：
      </span>
      <CodeBlock language="vue" :code="teleportDisabledExample" />
      <span class="content">disabled 只控制渲染位置，不控制显示和隐藏；显示状态仍需通过内容元素上的 v-if 或 v-show 管理。</span>
      <h3>延迟解析目标（Vue 3.5+）</h3>
      <span class="content">如果目标容器由 Vue 渲染，并且出现在 Teleport 后面，可以使用 defer：</span>
      <CodeBlock language="vue" :code="teleportDeferExample" />
      <span class="sub-important">
        defer 要求目标在同一次挂载或更新周期内出现，并不会一直等待目标。如果目标要在异步请求完成后或一秒后才出现，仍会报错。
      </span>
      <h3>注意事项</h3>
      <ul>
        <li>默认情况下，Teleport 挂载时目标必须已存在。使用 body，或在应用入口 HTML 中预先声明目标容器，通常最简单。</li>
        <li>Teleport 只改变实际 DOM 位置，组件的逻辑父子关系不变，props、组件事件和 provide / inject 仍正常工作。</li>
        <li>多个 Teleport 可以共享同一个目标，内容按挂载顺序追加，后挂载的内容不会覆盖之前的内容。</li>
        <li>scoped 样式仍可匹配被传送的元素，但依赖原祖先的 CSS 选择器、继承样式和 CSS 变量需要按新的 DOM 位置检查。</li>
        <li>可以在 Teleport 内搭配 Transition，为弹窗内容添加进入和离开动画。</li>
      </ul>
      <span class="content">
        参考：<a href="https://cn.vuejs.org/guide/built-ins/teleport.html" target="_blank" rel="noopener noreferrer">Vue 官方文档：Teleport</a>。
      </span>
    </ArticleSection>
  </ArticleLayout>
</template>
