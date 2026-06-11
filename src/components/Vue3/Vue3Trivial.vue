<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import { composableExample, inputWrapperExample } from './Vue3Trivial.examples.js'
</script>

<template>
  <ArticleLayout
    title="VUE3琐碎知识🧀"
    description="记录 Vue 3 组件封装、渲染函数和日常开发中容易复用的实践点。"
  >
    <div data-custom="如何二次封装组件（终极版）">
      <h2 id="_如何二次封装组件（终极版）">如何二次封装组件（终极版）</h2>
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
    </div>
    <div data-custom="组合式函数封装">
      <h2 id="_组合式函数封装">组合式函数封装</h2>
      <span class="content">
        当一段逻辑同时包含响应式状态、生命周期、副作用清理时，适合抽成 composable。它和普通工具函数的区别是：composable 可以使用 Vue 的响应式 API，并负责在组件卸载时清理副作用。
      </span>
      <CodeBlock language="js" :code="composableExample" />
      <ul>
        <li>命名使用 useXxx，调用方一眼能看出这是组合式函数。</li>
        <li>返回 ref 或 computed，让使用方保留响应式能力。</li>
        <li>凡是注册事件、定时器、观察器，都要在 onUnmounted 中释放。</li>
      </ul>
    </div>
  </ArticleLayout>
</template>
