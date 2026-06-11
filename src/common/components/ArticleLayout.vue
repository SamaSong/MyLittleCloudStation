<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <article class="article-layout content-container">
    <header class="article-header">
      <h1 class="title">{{ title }}</h1>
      <p v-if="description" class="sub-title">{{ description }}</p>
      <slot name="header"></slot>
    </header>

    <main class="article-body">
      <slot></slot>
    </main>
  </article>
</template>

<style scoped lang="scss">
.article-layout {
  gap: 8px;
}

.article-header {
  margin-bottom: 8px;
}

.article-body {
  width: 100%;
}

:deep(ul),
:deep(ol) {
  margin: 8px 0 16px;
  padding-left: 28px;
  line-height: 30px;
  font-size: 16px;
}

:deep(li + li) {
  margin-top: 4px;
}

:deep(blockquote) {
  margin: 12px 0;
  padding: 10px 14px;
  border-left: 4px solid #3eaf7c;
  background: #f5f7fa;
  color: #606266;
}
</style>
