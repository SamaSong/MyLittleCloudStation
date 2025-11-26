<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <span class="title">JS琐碎知识🧀</span>
    <h1 id="_1、JS相关">1、JS相关</h1>
    <h1 id="_2、对象相关">2、对象相关</h1>
    <h1 id="_3、数组相关">3、数组相关</h1>
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
    <h1 id="_4、字符串相关">4、字符串相关</h1>
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
  </div>

</template>

<style scoped lang="scss">

</style>
