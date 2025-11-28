<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1 class="title">JS琐碎知识🧀</h1>
    <h2 id="_1、JS相关">1、JS相关</h2>
    <h3>展开运算符</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;JavaScript展开运算符（...）是ES6引入的语法特性，用于将可迭代对象（如数组、对象、Set、Map）的元素展开为独立项。
    </span>
    <h3>原始类型 VS 包装对象</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;原始类型:如 number 、 string 、 boolean ,在 JavaScript 中是简单数据 类型,它们在内存中占⽤空间少,处理速度快。 <br>
      &nbsp;	&nbsp;	&nbsp;	&nbsp;包装对象:如 Number 对象、 String 对象、 Boolean 对象,是复杂类型,在 内存中占⽤更多空间,在⽇常开发时很少由开发⼈员⾃⼰创建包装对象。<br>
      &nbsp;	&nbsp;	&nbsp;	&nbsp;⾃动装箱:JavaScript 在必要时会⾃动将原始类型包装成对象,以便调⽤⽅法或访问属性。<br>
    </span>
    <CodeBlock>
      <pre>// 原始类型字符串
        let str = 'hello';
        // 当访问str.length时,JavaScript引擎做了以下⼯作:
        // 1. ⾃动装箱:创建⼀个临时的String对象包装原始字符串
        let size = (function(){
          let tempStringObject = new String(str);
          // 2. 访问String对象的length属性
          let lengthValue = tempStringObject.length;
          // 3. 销毁临时对象,返回⻓度值
          // (JavaScript引擎⾃动处理对象销毁,开发者⽆感知)
          return lengthValue;
        })();

        console.log(size); // 输出: 5</pre>
    </CodeBlock>
    <h2 id="_2、对象相关">2、对象相关</h2>
    <h2 id="_3、数组相关">3、数组相关</h2>
    <h3>flatMap方法</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
    </span>
    <CodeBlock>
      <pre>var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
            // 返回新数组的元素
        }[, thisArg])</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;返回值一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
    </span>
    <span class="sub-important">&nbsp;	&nbsp;	&nbsp;	&nbsp;*通常用在扁平化数组中。flatMap会把函数返回的数组 “压平” 一层</span>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;Map 与 flatMap区别
    </span>
    <CodeBlock>
      <pre>var arr1 = [1, 2, 3, 4];

        arr1.map(x => [x * 2]);
        // [[2], [4], [6], [8]]

        arr1.flatMap(x => [x * 2]);
        // [2, 4, 6, 8]

        // 只会将 flatMap 中的函数返回的数组 “压平” 一层
        arr1.flatMap(x => [[x * 2]]);
        // [[2], [4], [6], [8]]
        </pre>
    </CodeBlock>
    <h3>Array.from()</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;<span class="bgc">Array.from()</span> 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
    </span>
    <CodeBlock><pre>
      Array.from(arrayLike[, mapFn[, thisArg]])
    </pre></CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;Array.from() 可以通过伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）或者 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
    </span>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。
    </span>
    <h3>fill()</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;<span class="bgc">fill()</span> 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
    </span>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;<span class="bgc">fill</span>方法接受三个参数 value, start 以及 end. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。
    </span>
    <h2 id="_4、字符串相关">4、字符串相关</h2>
    <h3>String.trim()</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;trim()方法返回一个两头都去掉空白的字符串，并不影响原字符串本身。应用场景为：搜索框中的字符串处理。
    </span>
    <CodeBlock>
      <pre>var orig = '   foo  ';
        console.log(orig.trim()); // 'foo'

        // 另一个.trim()例子，只从一边删除

        var orig = 'foo    ';
        console.log(orig.trim()); // 'foo'</pre>
    </CodeBlock>
    <h2 id="_5、路由相关">5、路由相关</h2>
    <h3>开发路由的思路</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;当我们在处理路由时，对于相同路径的组件加载，大可不必罗列路由配置。可以使用<span class="bgc">import.meta.glob</span>。例如：
    </span>
    <CodeBlock>
      <pre>import.meta.glob('../components/**/*.vue')
        // 会让 Vite 在构建阶段扫描 src/components/** 目录下的所有 .vue 文件，为每个文件生成一个按需导入的函数。返回结果是一个以文件相对路径为键、以懒加载函数为值的对象。
      </pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;如果有在不同目录下的懒加载路由。通过对象展开运算符把两个扫描结果合并成一个大对象。
    </span>
    <CodeBlock>
      <pre>const moduleMap = {
          ...import.meta.glob('../views/**/*.vue'),
          ...import.meta.glob('../components/**/*.vue'),
        }</pre>
    </CodeBlock>
  </div>

</template>

<style scoped lang="scss">

</style>
