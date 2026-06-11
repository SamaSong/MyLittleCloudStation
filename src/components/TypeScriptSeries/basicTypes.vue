<script setup>
  import ArticleLayout from '@/common/components/ArticleLayout.vue'
  import CodeBlock from "@/common/components/codeBlock.vue";
  import {
    unknownAssignExample,
    unknownNarrowExample,
    unknownPropertyExample,
    neverVariableExample,
    neverInferenceExample,
    neverReturnExample,
    voidFunctionExample,
    voidReturnExample,
    voidVsUndefinedExample,
    objectLowercaseExample,
    objectUppercaseExample,
    objectShapeExample,
    indexSignatureExample,
    functionTypeExample,
    arrayTypeExample,
    tupleExample,
    enumProblemExample,
    numberEnumExample,
    enumInitialValueExample,
    enumWalkExample,
    stringEnumExample,
    voidStrictReturnExample,
    voidCallbackReturnExample,
    voidCallbackAssignExample,
    forEachVoidExample,
  } from './basicTypes.examples.js'
</script>

<template>
  <ArticleLayout
    title="常用类型"
    description="整理 TypeScript 中 unknown、never、void、object、tuple、enum 等常用类型。"
  >
    <span class="content">
      <span class="bgc">string</span>,<span class="bgc">number</span>, <span class="bgc">boolean</span>，数组， any 就不展开了， 没什么好说的。
    </span>
    <h3>注意点：</h3>
    <span class="content">
      在 JavaScript 中的这些内置构造函数: Number 、 String 、 Boolean ,
      ⽤于 创建对应的包装对象, 在⽇常开发时==很少使⽤==,在 TypeScript 中也是同理,所以 在 TypeScript 中进⾏类型声明时,通常都是⽤⼩写的 number 、 string 、 boolean。
    </span>
    <div data-custom="unknown">
      <h2 id="_unknown">unknown</h2>
      <span class="content">
        unknown 的含义是: 未知类型。适⽤于: 起初不确定数据的具体类型,要后期才能确定。<br>
        1、unknown 可以理解为⼀个类型安全的 any 。
      </span>
      <CodeBlock language="ts" :code="unknownAssignExample" />
      <span class="content">
        	  2、unknown 会强制开发者在使⽤之前进⾏类型检查,从⽽提供更强的类型安全性。
      </span>
      <CodeBlock language="ts" :code="unknownNarrowExample" />
      <span class="content">
        3、读取 any 类型数据的任何属性都不会报错,⽽ unknown 正好与之相反。
      </span>
      <CodeBlock language="ts" :code="unknownPropertyExample" />
    </div>
    <div data-custom="never">
      <h2 id="_never">never</h2>
      <span class="content">
        never 的含义是:任何值都不是,即: 不能有值,例如 undefined 、 null 、 '' 、 0 都不⾏!<br>
        1、⼏乎不⽤ never 去直接限制变量,因为没有意义,例如:
      </span>
      <CodeBlock language="ts" :code="neverVariableExample" />
      <span class="content">
        2、never 一般是 TypeScript 主动推断出来的，例如：
      </span>
      <CodeBlock language="ts" :code="neverInferenceExample" />
      <span class="content">
        3、never 也可⽤于限制函数的返回值。
      </span>
      <CodeBlock language="ts" :code="neverReturnExample" />
    </div>
    <div data-custom="void">
      <h2 id="_void">void</h2>
      <span class="content">
        void 的含义是空,即: 函数不返回任何值, 调⽤者也不应依赖其返回值进⾏任何操作!<br>
        1、void 通常⽤于函数返回值声明
      </span>
      <CodeBlock language="ts" :code="voidFunctionExample" />
      <span class="attention">
        注意:编码者没有编写 return 指定函数返回值,所以 logMessage 函数是没有显式返回值的,但会有⼀个隐式返回值,
        是undefined,虽然函数返回类型为void,但也是可以接受undefined的,
        简单记:undefined是void可以接受的⼀种"空"。
      </span>
      <span class="content">
        	 	2、以下写法均符合规范
      </span>
      <CodeBlock language="ts" :code="voidReturnExample" />
      <span class="content">
        那限制函数返回值时,是不是 undefined 和 void 就没区别呢?—— 有区别。因为还有 这句话 :【返回值类型为 **void** 的函数,调⽤者不应依赖其返回值进⾏任何操作!】对⽐下 ⾯两段代码:
      </span>
      <CodeBlock language="ts" :code="voidVsUndefinedExample" />
      <div class="blue">
        <span style="font-weight: bolder">理解 void 与 undefined</span><br>
        void 是⼀个⼴泛的概念,⽤来表达"空",⽽ undefined 则是这种"空"的具体 实现。 <br>
        因此可以说 undefined 是 void 能接受的⼀种"空"的状态。 <br>
        也可以理解为: void 包含 undefined ,但 void 所表达的语义超越了 undefined , void 是⼀种意图上的约定,⽽不仅仅是特定值的限制。 <br>
      </div>
      <div class="attention">
        <span style="font-weight: bolder">总结</span><br>
        如果⼀个函数返回类型为 void ,那么:<br>
        1、从语法上讲:函数是可以返回 undefined 的,⾄于显式返回,还是隐式返回,这⽆ 所谓!<br>
        2、从语义上讲:函数调⽤者不应关⼼函数返回的值,也不应依赖返回值进⾏任何操作! 即使我们知道它返回了 undefined 。<br>
      </div>
    </div>
    <div data-custom="object">
      <h2 id="_object">object</h2>
      <div class="blue">关于 **object** 与 **Object** ,直接说结论:实际开发中⽤的相对较少,因为范围太⼤了。</div>
      <h3>object(⼩写)</h3>
      <span class="content">
        **object** (⼩写)的含义是:所有⾮原始类型,可存储:对象、函数、数组等,由于限制 的范围⽐较宽泛,在实际开发中使⽤的相对较少。
      </span>
      <CodeBlock language="ts" :code="objectLowercaseExample" />
      <h3>Object(⼤写)</h3>
      <ul>
        <li>官⽅描述:所有可以调⽤ **Object** ⽅法的类型。 </li>
        <li>简单记忆:除了 undefined 和 null 的任何值。 </li>
        <li>由于限制的范围实在太⼤了!所以实际开发中使⽤频率极低。 </li>
      </ul>
      <CodeBlock language="ts" :code="objectUppercaseExample" />
      <h3>声明对象类型</h3>
      <span class="content">
        1、实际开发中,限制⼀般对象,通常使⽤以下形式
      </span>
      <CodeBlock language="ts" :code="objectShapeExample" />
      <span class="content">
        2、索引签名: 允许定义对象可以具有任意数量的属性,这些属性的键和类型是可变的, 常⽤于:描述类型不确定的属性,(具有动态属性的对象)。
      </span>
      <CodeBlock language="ts" :code="indexSignatureExample" />
      <h3>声明函数类型</h3>
      <CodeBlock language="ts" :code="functionTypeExample" />
      <ul>
        <li>TypeScript 中的 => 在函数类型声明时表示==函数类型,==描述其==参数类型==和返回类型。 </li>
        <li>JavaScript 中的 => 是⼀种定义函数的语法,是具体的函数实现。 </li>
        <li>函数类型声明还可以使⽤:接⼝、⾃定义类型等⽅式,下⽂中会详细讲解。 </li>
      </ul>
      <h3>声明数组类型</h3>
      <CodeBlock language="ts" :code="arrayTypeExample" />
    </div>
    <div data-custom="tuple">
      <h2 id="_tuple">tuple</h2>
      <span class="content">
        元组 (Tuple) 是⼀种==特殊的数组类型==,可以存储固定数量的元素,并且每个元素的类型是==已知==的且可以==不同==。元组⽤于精确描述⼀组值的类型， ? 表示可选元素。
      </span>
      <CodeBlock language="ts" :code="tupleExample" />
    </div>
    <div data-custom="enum">
      <h2 id="_enum">enum</h2>
      <span class="content">
        枚举( enum )可以定义==⼀组命名常量==,它能增强代码的可读性,也让代码更好维护。<br>
        如下代码的功能是:根据调⽤ walk 时传⼊的不同参数,执⾏不同的逻辑,存在的问题是调⽤ walk 时传参时没有任何提示,编码者很容易写错字符串内容;并且⽤于判断逻辑的 up 、 down 、 left 、 right 是连续且==相关的⼀组值==,那此时就特别适合使⽤==枚举( enum )==。
      </span>
      <CodeBlock language="ts" :code="enumProblemExample" />
      <h3>1、数字枚举</h3>
      <span class="content">
        数字枚举⼀种最常⻅的枚举类型,其成员的值会⾃动递增,且数字枚举还具备==反向映射==的 特点,在下⾯代码的打印中,不难发现:可以通过值来获取对应的枚举成员名称.
      </span>
      <CodeBlock language="ts" :code="numberEnumExample" />
      <span class="content">
        也可以指定枚举成员的初始值,其后的成员值会⾃动递增。
      </span>
      <CodeBlock language="ts" :code="enumInitialValueExample" />
      <span class="content">
        使⽤数字枚举完成刚才 walk 函数中的逻辑,此时我们发现: 代码更加直观易读,⽽且类型安全,同时也更易于维护。
      </span>
      <CodeBlock language="ts" :code="enumWalkExample" />
      <h3>2、字符串枚举</h3>
      <span class="content">
        枚举成员的值是字符串。没有反向映射。
      </span>
      <CodeBlock language="ts" :code="stringEnumExample" />
      <h3>3、常量枚举</h3>
      <div class="blue">官⽅描述:常量枚举是⼀种特殊枚举类型,它使⽤ <span class="bgc">const</span> 关键字定义,在编译时会被内联,避免⽣成⼀些额外的代码。</div>
      <div class="attention">
        何为编译时内联?<br>
        所谓"内联"其实就是 TypeScript 在编译时,会将枚举成员引⽤替换为它们的实际值, ⽽不是⽣成额外的枚举对象。这可以减少⽣成的 JavaScript 代码量,并提⾼运⾏时性能。
      </div>
    </div>
    <div data-custom="⼀个特殊情况">
      <h2 id="_⼀个特殊情况">⼀个特殊情况</h2>
      <span class="content">先来观察如下两段代码:</span>
      <span class="content">
        代码段1(正常):在函数定义时,限制函数返回值为 void ,那么函数的返回值就必须是空。
      </span>
      <CodeBlock language="ts" :code="voidStrictReturnExample" />
      <span class="content">代码段2(特殊):使⽤ 限制函数返回值为 void 时, **TypeScript** 并不会严格要求函数返回空。</span>
      <CodeBlock language="ts" :code="voidCallbackReturnExample" />
      <span class="content">另一种写法：</span>
      <CodeBlock language="ts" :code="voidCallbackAssignExample" />
      <div class="attention">
        为什么会这样? <br>
        <span class="content">是为了确保如下代码成⽴,我们知道 <span class="bgc">Array.prototype.push</span> 的返回值是⼀个数字, ⽽ <span class="bgc">Array.prototype.forEach</span> ⽅法期望其回调的返回类型是 void 。</span>
      </div>
      <CodeBlock language="ts" :code="forEachVoidExample" />
      <div class="blue">官⽅⽂档的说明: <a href="https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions" target="_blank">Assignability of Functions</a> </div>
    </div>
  </ArticleLayout>
</template>
