<script setup>

</script>

<template>
  <div class="bom-dom-container">
    <span class="title">BOM、DOM</span>
    <span class="sub-title">DOM、BOM相关的一些概念以及属性</span>
    <h1 id="_1、window">1、window</h1>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是
      ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有
      对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法。
    </span>
  </div>
</template>

<style scoped lang="scss">
  .bom-dom-container {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 30px;
      font-weight: bold;
    }
    .sub-title {
      font-size: 14px;
      margin: 20px 0;
    }
    h1 {
      border-bottom: 1px solid #eee;
      width: 100%;
    }
    .content {
      padding: 20px 0;
      font-size: 16px;
      line-height: 30px;
    }
  }
</style>
