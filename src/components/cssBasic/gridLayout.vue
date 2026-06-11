<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  autoFitCardExample,
  gridContainerExample,
  minmaxOverflowExample,
} from './gridLayout.examples.js'
</script>

<template>
  <ArticleLayout
    title="网格布局"
    description="CSS Grid 适合处理二维布局，这里整理容器属性、响应式网格和常见溢出问题。"
  >
    <div data-custom="1、容器与区域">
      <h2 id="_1、容器与区域">1、容器与区域</h2>
      <span class="content">
        Grid 最适合描述页面骨架。通过 grid-template-areas 可以把布局区域语义化，后续调整行列尺寸时不需要改动 DOM 结构。
      </span>
      <CodeBlock language="css" :code="gridContainerExample" />
    </div>
    <div data-custom="2、自适应卡片网格">
      <h2 id="_2、自适应卡片网格">2、自适应卡片网格</h2>
      <span class="content">
        repeat + auto-fit + minmax 是卡片列表最常用的响应式组合。容器宽度足够时自动增加列数，不足时自动收缩为更少列。
      </span>
      <CodeBlock language="css" :code="autoFitCardExample" />
    </div>
    <div data-custom="3、minmax(0, 1fr)">
      <h2 id="_3、minmax(0, 1fr)">3、minmax(0, 1fr)</h2>
      <span class="content">
        Grid 或 Flex 布局里，内容区域如果使用 1fr，长文本、表格或代码块可能撑破容器。用 minmax(0, 1fr) 并配合 min-width: 0 可以让内容正确收缩和滚动。
      </span>
      <CodeBlock language="css" :code="minmaxOverflowExample" />
    </div>
  </ArticleLayout>
</template>
