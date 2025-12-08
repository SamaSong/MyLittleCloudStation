<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
  import AnchorComponents from "@/components/anchorComponents.jsx";
  import { JS_ANCHOR_POINT, OBJ_ANCHOR_POINT, ARR_ANCHOR_POINT, STRING_ANCHOR_POINT, ROUTE__ANCHOR_POINT } from './static.js'
</script>

<template>
  <div class="content-container">
    <h1 class="title">JS琐碎知识🧀</h1>
    <div data-custom="1、JS相关">
      <h2 id="_1、JS相关">1、JS相关</h2>
      <AnchorComponents :data="JS_ANCHOR_POINT"/>
      <h3 id="js_1">展开运算符</h3>
      <span class="content">
        JavaScript展开运算符（...）是ES6引入的语法特性，用于将可迭代对象（如数组、对象、Set、Map）的元素展开为独立项。
      </span>
      <h3 id="js_2">原始类型 VS 包装对象</h3>
      <span class="content">
        原始类型:如 number 、 string 、 boolean ,在 JavaScript 中是简单数据 类型,它们在内存中占⽤空间少,处理速度快。 <br>
        包装对象:如 Number 对象、 String 对象、 Boolean 对象,是复杂类型,在 内存中占⽤更多空间,在⽇常开发时很少由开发⼈员⾃⼰创建包装对象。<br>
        ⾃动装箱:JavaScript 在必要时会⾃动将原始类型包装成对象,以便调⽤⽅法或访问属性。<br>
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
      <h3 id="js_3">关于window.addEventListener</h3>
      <CodeBlock>
        <pre>// 基本语法
        window.addEventListener('事件类型', 回调函数, [使用捕获]);
        </pre>
      </CodeBlock>
      <span class="content">常见事件类型：</span>
      <ul>
        <li><span class="bgc">load</span> - 页面完全加载</li>
        <li><span class="bgc">DOMContentLoaded</span> - DOM加载完成（比load早）</li>
        <li><span class="bgc">resize</span> - 窗口大小改变</li>
        <li><span class="bgc">scroll - 页面滚动</span>x - 页面滚动</li>
        <li><span class="bgc">click</span> - 点击</li>
        <li><span class="bgc">keydown/keyup</span> - 键盘按键</li>
      </ul>
      <span class="content">第三个参数（可选）：</span>
      <ul>
        <li><span class="bgc">false</span>（默认）：冒泡阶段处理</li>
        <li><span class="bgc">true</span>：捕获阶段处理</li>
        <li>或一个对象：<span class="bgc">{ capture: true, once: true, passive: true }</span></li>
      </ul>
    </div>
    <div data-custom="2、对象相关">
      <h2 id="_2、对象相关">2、对象相关</h2>
      <AnchorComponents :data="OBJ_ANCHOR_POINT"/>
      <h3 id="obj_1">不常用但好用的方法</h3>
      <span class="content">1、Object.fromEntries()</span><br>
      <ul><li>将键值对列表（如数组）转换为对象。</li></ul>
      <CodeBlock>
        <pre>const entries = [['a', 1], ['b', 2]];
          const obj = Object.fromEntries(entries); // { a: 1, b: 2 }</pre>
      </CodeBlock>
      <span class="content">2、Object.entries()</span>
      <ul><li>返回给定对象自身可枚举属性的键值对数组。</li></ul>
      <CodeBlock>
        <pre>const obj = { a: 1, b: 2 };
        Object.entries(obj); // [['a', 1], ['b', 2]]</pre>
      </CodeBlock>
      <span class="content">3、Object.hasOwn()</span>
      <ul><li>判断对象自身是否有指定的属性（不继承）。</li></ul>
      <CodeBlock>
        <pre>const obj = { a: 1 };
        Object.hasOwn(obj, 'a'); // true
        Object.hasOwn(obj, 'toString'); // false</pre>
      </CodeBlock>
    </div>
    <div data-custom="3、数组相关">
      <h2 id="_3、数组相关">3、数组相关</h2>
      <AnchorComponents :data="ARR_ANCHOR_POINT" />
      <h3 id="arr_1">flatMap方法</h3>
      <span class="content">
        flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
      </span>
      <CodeBlock>
        <pre>var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
              // 返回新数组的元素
          }[, thisArg])</pre>
      </CodeBlock>
      <span class="content">
        返回值一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
      </span>
      <span class="sub-important">*通常用在扁平化数组中。flatMap会把函数返回的数组 “压平” 一层</span>
      <span class="content">
        Map 与 flatMap区别
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
      <h3 id="arr_2">Array.from()</h3>
      <span class="content">
        <span class="bgc">Array.from()</span> 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
      </span>
      <CodeBlock><pre>
        Array.from(arrayLike[, mapFn[, thisArg]])
      </pre>
      </CodeBlock>
      <span class="content">
        Array.from() 可以通过伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）或者 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
      </span>
      <span class="content">
        Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。
      </span>
      <h3 id="arr_3">fill()</h3>
      <span class="content">
        <span class="bgc">fill()</span> 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
      </span>
      <span class="content">
        <span class="bgc">fill</span>方法接受三个参数 value, start 以及 end. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。
      </span>
    </div>
    <div data-custom="4、字符串相关">
      <h2 id="_4、字符串相关">4、字符串相关</h2>
      <AnchorComponents :data="STRING_ANCHOR_POINT" />
      <h3 id="str_1">String.trim()</h3>
      <span class="content">
        trim()方法返回一个两头都去掉空白的字符串，并不影响原字符串本身。应用场景为：搜索框中的字符串处理。
      </span>
      <CodeBlock>
        <pre>var orig = '   foo  ';
          console.log(orig.trim()); // 'foo'

          // 另一个.trim()例子，只从一边删除

          var orig = 'foo    ';
          console.log(orig.trim()); // 'foo'</pre>
      </CodeBlock>
    </div>
    <div data-custom="5、路由相关">
      <h2 id="_5、路由相关">5、路由相关</h2>
      <AnchorComponents :data="ROUTE__ANCHOR_POINT" />
      <h3 id="route_1">开发路由的思路</h3>
      <span class="content">
        当我们在处理路由时，对于相同路径的组件加载，大可不必罗列路由配置。可以使用<span class="bgc">import.meta.glob</span>。例如：
      </span>
      <CodeBlock>
        <pre>import.meta.glob('../components/**/*.vue')
          // 会让 Vite 在构建阶段扫描 src/components/** 目录下的所有 .vue 文件，为每个文件生成一个按需导入的函数。返回结果是一个以文件相对路径为键、以懒加载函数为值的对象。
        </pre>
      </CodeBlock>
      <span class="content">
        如果有在不同目录下的懒加载路由。通过对象展开运算符把两个扫描结果合并成一个大对象。
      </span>
      <CodeBlock>
        <pre>const moduleMap = {
            ...import.meta.glob('../views/**/*.vue'),
            ...import.meta.glob('../components/**/*.vue'),
          }</pre>
      </CodeBlock>
      <h3 id="route_2">如何优雅的获取路由参数</h3>
      <span class="content">URLSearchParams API（现代浏览器）</span>
      <CodeBlock>
        <pre>// 获取当前URL参数
        const urlParams = new URLSearchParams(window.location.search);

        // 获取单个参数
        const id = urlParams.get('id');           // ?id=123 → "123"
        const name = urlParams.get('name');       // ?name=John → "John"
        const nonExistent = urlParams.get('key'); // 不存在返回 null

        // 检查参数是否存在
        const hasToken = urlParams.has('token');  // 返回 true/false

        // 遍历所有参数
        for (const [key, value] of urlParams.entries()) {
          console.log(`${key}: ${value}`);
        }

        // 转换为对象
        const params = Object.fromEntries(urlParams.entries());</pre>
      </CodeBlock>
    </div>
  </div>
</template>

<style scoped lang="scss">
  ul li {
    line-height: 2.5em;
  }
</style>
