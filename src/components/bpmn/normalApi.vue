<template>
  <ArticleLayout
    title="Bpmn-JS常用Api"
    description="记录 Bpmn-JS日常开发中容易复用的实践点。"
  >
    <ArticleSection title="操作BPMN 元素 CSS 类名">
      <CodeBlock language="js" :code="addClassExample" />
    </ArticleSection>
  </ArticleLayout>
</template>

<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import ArticleSection from '@/common/components/ArticleSection.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import { addClassExample } from './normalApi.examples.js'
</script>

<style scoped lang="scss">
.bpmn-page {

}
</style>
