<script setup>

import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1 class="title">TypeScript概念（基本内容）</h1>
    <h2 id="_概念">概念</h2>
    <h3>简介</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	1、TypeScript 由微软开发,是基于 JavaScript 的⼀个扩展语⾔。
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	2、TypeScript 包含了 JavaScript 的所有内容,即: TypeScript 是 JavaScript 的超集。
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	3、TypeScript 增加了:静态类型检查、接⼝、 泛型等很多现代开发特性,更适合⼤型项⽬ 的开发。
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	4、TypeScript 需要编译为 JavaScript ,然后交给浏览器或其他 JavaScript 运⾏环 境执⾏。
    </span>
    <h3>静态类型检查</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现的几率，此种检查叫“静态类
      型检查”，TypeScript和核心就是“静态类型检查”，简言之就是把运行时的错误前置。<br>
      &nbsp;	&nbsp;	&nbsp;	&nbsp;	同样的功能，TypeScript的代码量要大于JavaScript,但由于TypeScript的代码结构更加清晰，在后期代码
      的维护中TypeScript却远胜于JavaScript。
    </span>
    <h2 id="_类型声明">类型声明</h2>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;使⽤<span class="bgc"> : </span>来对变量或函数形参,进⾏类型声明:
    </span>
    <CodeBlock language="ts">
      <pre>let a: string  // 变量a只能存储字符串
        let b: number  // 变量b只能存储数值
        let c: boolean // 变量c只能存储布尔值

        a = 'hello'
        a = 100  // 警告: 不能将类型“number”分配给类型“string”

        b = 666
        b = '你好' // 警告: 不能将类型"string"分配给类型"number"

        c = true
        c = 666  // 警告: 不能将类型“number”分配给类型“boolean”

        // 参数x必须是数字，参数y也必须是数字，函数返回值也必须是数字
        function demo(x: number, y: number): number {
          return x + y
        }

        demo(100, 200)
        demo(100, '200') // 警告: 类型“string"的参数不能赋给类型"number"的参数
        demo(100, 200, 300) // 警告: 应有 2个参数, 但获得 3个
        demo(100) // 警告: 应有 2个参数，但获得 1个</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;在 : 后也可以写字⾯量类型,不过实际开发中⽤的不多。
    </span>
    <CodeBlock language="ts">
      <pre>let a: '你好' //a的值只能为字符串"你好"
        let b: 100 //b的值只能为数字100
        a = '欢迎'//警告:不能将类型""欢迎""分配给类型""你好""
        b = 200 //警告:不能将类型"200"分配给类型"100"</pre>
    </CodeBlock>
    <h2 id="_类型判断">类型判断</h2>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;TS 会根据我们的代码,进⾏类型推导,例如下⾯代码中的变量 d ,只能存储数字。
    </span>
    <CodeBlock language="ts">
      <pre>let d = -99 //TypeScript会推断出变量d的类型是数字
        d = false //警告:不能将类型"boolean"分配给类型"number"</pre>
    </CodeBlock>
    <span class="content"><span class="sub-important">但要注意,类型推断不是万能的,⾯对复杂类型时推断容易出问题,所以尽量还是明确的编写类型声明!</span></span>
  </div>
</template>

<style scoped lang="scss">

</style>
