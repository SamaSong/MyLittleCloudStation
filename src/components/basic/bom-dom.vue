<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
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
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。
    </span>
    <CodeBlock>
      <pre>var age = 29;
        var sayAge = () => alert(this.age);
        alert(window.age); // 29
        sayAge(); // 29
        window.sayAge(); // 29</pre>
    </CodeBlock>
  </div>
</template>

<style scoped lang="scss">
  .bom-dom-container {
    max-width: 70%;
    display: flex;
    flex-direction: column;
  }
</style>
