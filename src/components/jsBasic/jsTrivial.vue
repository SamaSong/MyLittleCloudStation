<script setup>
  import ArticleLayout from '@/common/components/ArticleLayout.vue'
  import CodeBlock from "@/common/components/codeBlock.vue";
  import AnchorComponents from "@/common/components/anchorComponents.jsx";
  import { JS_ANCHOR_POINT, OBJ_ANCHOR_POINT, ARR_ANCHOR_POINT, STRING_ANCHOR_POINT, ROUTE__ANCHOR_POINT, OTHERS_ANCHOR_POINT } from './static.js'
  import {
    primitiveWrapperExample,
    addEventListenerExample,
    arrayDestructuringExample,
    regexpExecLoopExample,
    matchAllExample,
    objectFromEntriesExample,
    objectEntriesExample,
    objectHasOwnExample,
    flatMapSyntaxExample,
    flatMapCompareExample,
    arrayFromSyntaxExample,
    trimExample,
    importMetaGlobExample,
    lazyLoadRouteExample,
    urlSearchParamsExample,
    requestWhiteListExample,
    regexpReplaceExample,
    tabMessageReceiverExample,
    tabMessageSenderExample,
  } from './jsTrivial.examples.js'
</script>

<template>
  <ArticleLayout
    title="JS琐碎知识🧀"
    description="记录 JavaScript、对象、数组、字符串、路由和其他开发中的零散知识点。"
  >
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
      <CodeBlock :code="primitiveWrapperExample" />
      <h3 id="js_3">关于window.addEventListener</h3>
      <CodeBlock :code="addEventListenerExample" />
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
      <h3 id="js_4">数组的解构赋值</h3>
      <span class="content">
        善用数组的结构赋值，比如在Object.keys、Object.values后，当确定数组的元素数时
      </span>
      <CodeBlock :code="arrayDestructuringExample" />
      <h3 id="js_5">while循环配合RegExp.exec()实现多次循环</h3>
      <span class="content">RegExp.exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。</span>
      <span class="content">RegExp.exec()在全局模式（g标志） 或粘性模式（y标志）下，每次调用都会更新正则表达式的lastIndex属性，从而能够遍历字符串中的所有匹配项。</span>
      <CodeBlock :code="regexpExecLoopExample" />
      <h4 style="font-weight: 600;">与String.matchAll()的对比</h4>
      <span class="content">ES2020引入了String.matchAll()，它返回一个迭代器，可以更安全地遍历所有匹配：</span>
      <CodeBlock :code="matchAllExample" />
    </div>
    <div data-custom="2、对象相关">
      <h2 id="_2、对象相关">2、对象相关</h2>
      <AnchorComponents :data="OBJ_ANCHOR_POINT"/>
      <h3 id="obj_1">不常用但好用的方法</h3>
      <span class="content">1、Object.fromEntries()</span><br>
      <ul><li>将键值对列表（如数组）转换为对象。</li></ul>
      <CodeBlock :code="objectFromEntriesExample" />
      <span class="content">2、Object.entries()</span>
      <ul><li>返回给定对象自身可枚举属性的键值对数组。</li></ul>
      <CodeBlock :code="objectEntriesExample" />
      <span class="content">3、Object.hasOwn()</span>
      <ul><li>判断对象自身是否有指定的属性（不继承）。</li></ul>
      <CodeBlock :code="objectHasOwnExample" />
    </div>
    <div data-custom="3、数组相关">
      <h2 id="_3、数组相关">3、数组相关</h2>
      <AnchorComponents :data="ARR_ANCHOR_POINT" />
      <h3 id="arr_1">flatMap方法</h3>
      <span class="content">
        flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
      </span>
      <CodeBlock :code="flatMapSyntaxExample" />
      <span class="content">
        返回值一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
      </span>
      <span class="sub-important">*通常用在扁平化数组中。flatMap会把函数返回的数组 “压平” 一层</span>
      <span class="content">
        Map 与 flatMap区别
      </span>
      <CodeBlock :code="flatMapCompareExample" />
      <h3 id="arr_2">Array.from()</h3>
      <span class="content">
        <span class="bgc">Array.from()</span> 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
      </span>
      <CodeBlock :code="arrayFromSyntaxExample" />
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
      <CodeBlock :code="trimExample" />
    </div>
    <div data-custom="5、路由相关">
      <h2 id="_5、路由相关">5、路由相关</h2>
      <AnchorComponents :data="ROUTE__ANCHOR_POINT" />
      <h3 id="route_1">开发路由的思路</h3>
      <span class="content">
        当我们在处理路由时，对于相同路径的组件加载，大可不必罗列路由配置。可以使用<span class="bgc">import.meta.glob</span>。例如：
      </span>
      <CodeBlock :code="importMetaGlobExample" />
      <span class="content">
        如果有在不同目录下的懒加载路由。通过对象展开运算符把两个扫描结果合并成一个大对象。
      </span>
      <CodeBlock :code="lazyLoadRouteExample" />
      <h3 id="route_2">如何优雅的获取路由参数</h3>
      <span class="content">URLSearchParams API（现代浏览器）</span>
      <CodeBlock :code="urlSearchParamsExample" />
      <h3 id="route_3">跳转路由时使用接口白名单</h3>
      <span class="content">
        当需要一个路由地址下的页面无需登录也可以访问时，除了使用路由白名单，也需要使用接口白名单，因为一般接口如果没有携带token的话会被重定向到login页
      </span>
      <CodeBlock :code="requestWhiteListExample" />
    </div>
    <div data-custom="6、其他">
      <h2 id="_6、其他">6、其他</h2>
      <AnchorComponents :data="OTHERS_ANCHOR_POINT" />
      <h3 id="others_1">正则匹配全字符内容的差异</h3>
      <span class="content">
        <span class="bgc" style="margin-right: 5px;">.*?</span>和<span class="bgc" style="margin-left: 5px;">([\s\S]*?)</span>
      </span>
      <ul style="font-size: 16px; font-weight: 700;">
        第一个正则
        <li>使用 <span class="bgc" style="font-weight: 600;"> .</span>（点号） 匹配任意字符</li>
        <li><span class="bgc" style="font-weight: 600;"> .</span>默认不匹配换行符（ <span class="bgc" style="font-weight: 600;">\n, \r</span> 等）</li>
        <li>只能匹配单行内容</li>
      </ul>
      <ul style="font-size: 16px; font-weight: 700;">
        第二个正则
        <li>使用<span class="bgc" style="font-weight: 600;">[\s\S]</span>匹配所有字符</li>
        <li><span class="bgc" style="font-weight: 600;">\s</span> 匹配空白字符（空格、制表符、换行符等）</li>
        <li><span class="bgc" style="font-weight: 600;">\S</span> 匹配非空白字符</li>
        <li>组合起来 <span class="bgc" style="font-weight: 600;">[\s\S]</span> 可以匹配包括换行符在内的所有字符</li>
        <li>可以匹配多行内容</li>
      </ul>
      <div class="attention">括号 () 还创建了一个捕获组，可以提取匹配的内容。</div>
      <CodeBlock :code="regexpReplaceExample" />
      <h3 id="others_2">跨页签通讯</h3>
      <span class="content">当我门需要跨页签通讯时可以采用以下方法: 例如当winA打开winB时</span>
      <CodeBlock :code="tabMessageReceiverExample" />
      <CodeBlock :code="tabMessageSenderExample" />
      <h3 id="others_3">文件导出</h3>
      <span class="content">在文件导出（如 Excel、PDF 等）的接口请求中，设置 responseType: 'blob' 非常重要，它告诉浏览器期望的响应数据格式为二进制大对象（Blob）。responseType: 'blob' 是处理文件下载的标配，能保证二进制数据的完整性，同时兼容错误信息的提取。</span>
    </div>
  </ArticleLayout>
</template>

<style scoped lang="scss">
  ul li {
    line-height: 2.5em;
  }
</style>
