<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  arrayToTreeExample,
  groupByExample,
  treeFindExample,
} from './dataStructure.examples.js'
</script>

<template>
  <ArticleLayout
    title="常用数据结构处理"
    description="整理前端业务中高频的数据结构转换、查找、分组和树形处理方法。"
  >
    <div data-custom="1、扁平数组转换为树结构">
      <h2 id="_1、扁平数组转换为树结构">1、扁平数组转换为树结构</h2>
      <span class="content">
        使用 Map 先缓存所有节点，再二次遍历挂到父节点下面，时间复杂度是 O(n)，适合菜单、部门、地区这类树形数据。
      </span>
      <CodeBlock :code="arrayToTreeExample" />
    </div>
    <div data-custom="2、树结构查找节点">
      <h2 id="_2、树结构查找节点">2、树结构查找节点</h2>
      <span class="content">
        树查找可以用递归，也可以用栈或队列。下面这种写法避免递归层级过深，适合在前端处理较大的菜单树。
      </span>
      <CodeBlock :code="treeFindExample" />
    </div>
    <div data-custom="3、数组分组">
      <h2 id="_3、数组分组">3、数组分组</h2>
      <span class="content">
        分组是列表聚合的基础操作，常用于按状态、类型、日期组织数据。封装时支持字段名和函数两种 key，可以覆盖更多业务场景。
      </span>
      <CodeBlock :code="groupByExample" />
    </div>
  </ArticleLayout>
</template>
