<template>
  <ArticleLayout
    title="VUE3源码"
    description="整理 Vue 3 源码结构、核心模块和响应式原理笔记。"
  >
    <div data-custom="思维导图">
      <h2 id="_思维导图">思维导图</h2>
      <img class="source-map" src="/images/vue3.png" alt="Vue 3 源码思维导图">
      <span class="content">
        其中最关键的是reactivity、runtime-core、runtime-dom、shared
      </span>
    </div>
    <div data-custom="响应式原理">
      <h2 id="_响应式原理">响应式原理</h2>
      <div class="markdown-body source-summary">
        <Summary />
      </div>
    </div>
  </ArticleLayout>
</template>

<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import Summary from '../../../public/summary.md'
import 'github-markdown-css'
</script>

<style scoped lang="scss">
.source-map {
  display: block;
  width: min(100%, 860px);
  margin: 8px 0 16px;
  border-radius: 8px;
}

.source-summary {
  margin-top: 12px;
}
</style>
