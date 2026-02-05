<template>
  <div class="content-container">
    <h1 class="title">VUE3源码</h1>
    <div data-custom="思维导图">
      <h2 id="_思维导图">思维导图</h2>
      <img src="/images/vue3.png" alt="" style="width: 50vw;"><br>
      <span class="content">
        其中最关键的是reactivity、runtime-core、runtime-dom、shared
      </span>
    </div>
    <div data-custom="响应式原理">
      <h2 id="_响应式原理">响应式原理</h2>
      <div>
        <Summary />
      </div>
    </div>
  </div>
</template>

<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
  import Summary from '../../../public/summary.md'
  import 'github-markdown-css'
</script>

<style scoped lang="scss">

</style>
