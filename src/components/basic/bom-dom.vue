<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1 class="title">BOM、DOM</h1>
    <span class="sub-title">DOM、BOM相关的一些概念以及属性</span>
    <div data-custom="1、window">
      <h2 id="_1、window">1、window</h2>
      <span class="content">
        	BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是
        ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有
        对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法。
      </span>
      <span class="content">
        因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。
      </span>
      <CodeBlock>
        <pre>var age = 29;
          var sayAge = () => alert(this.age);
          alert(window.age); // 29
          sayAge(); // 29
          window.sayAge(); // 29</pre>
      </CodeBlock>
    </div>
    <div data-custom="2、定时器">
      <h2 id="_2、定时器">2、定时器</h2>
      <span class="content">
        setTimeout()用于指定在一定时间后执行某些代码，而 setInterval()用于指定每隔一段时间执行某些代码。
      </span>
    </div>
    <div data-custom="3、location 对象">
      <h2 id="_3、location 对象">3、location 对象</h2>
      <span class="content">
        location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。
        这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。也就是说，
        window.location 和 document.location 指向同一个对象。location 对象不仅保存着当前加载文
        档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。
      </span>
      <h3>查询字符串:</h3>
      <span class="content">
        location 的多数信息都可以通过上面的属性获取。但是 URL 中的查询字符串并不容易使用。虽然
        location.search 返回了从问号开始直到 URL 末尾的所有内容，但没有办法逐个访问每个查询参数。
        下面的函数解析了查询字符串，并返回一个以每个查询参数为属性的对象：
      </span>
      <CodeBlock>
        <pre>let getQueryStringArgs = function() {
             // 取得没有开头问号的查询字符串
             let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
             // 保存数据的对象
             args = {};
             // 把每个参数添加到 args 对象
             for (let item of qs.split("&").map(kv => kv.split("="))) {
               let name = decodeURIComponent(item[0]),
               value = decodeURIComponent(item[1]);
               if (name.length) {
                args[name] = value;
               }
              }
              return args;
            }</pre>
      </CodeBlock>
      <h3 style="font-weight: bold">URLSearchParams</h3>
      <span class="content">
        URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给
        URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、has()、set()和 delete()等方法。
      </span>
      <CodeBlock>
        <pre>let searchParams = new URLSearchParams(location.search);</pre>
      </CodeBlock>
    </div>
    <div data-custom="4、DOM节点操作方法">
      <h2 id="_4、DOM节点操作方法">4、DOM节点操作方法</h2>
      <span class="content">
        最常用的方法是
        appendChild()，用于在 childNodes 列表末尾添加节点。添加新节点会更新相关的关系指针，包括
        父节点和之前的最后一个子节点。
      </span>
      <span class="content">
        如果想把节点放到 childNodes 中的特定位置而不是末尾，则可以使用 insertBefore()方法。
        这个方法接收两个参数：要插入的节点和参照节点。调用这个方法后，要插入的节点会变成参照节点的
        前一个同胞节点，并被返回。如果参照节点是 null，则 insertBefore()与 appendChild()效果相同。
      </span>
      <span class="content">
        appendChild() 和 insertBefore() 在插入节点时不会删除任何已有节点。相对地，
        replaceChild()方法接收两个参数：要插入的节点和要替换的节点。要替换的节点会被返回并从文档
        树中完全移除，要插入的节点会取而代之。
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
