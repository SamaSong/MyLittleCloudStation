<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1 class="title">基础类型</h1>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;<span class="bgc">string</span>,<span class="bgc">number</span>, <span class="bgc">boolean</span>，数组，元组， any 就不展开了， 没什么好说的。
    </span>
    <h3>注意点：</h3>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;在 JavaScript 中的这些内置构造函数: Number 、 String 、 Boolean ,
      ⽤于 创建对应的包装对象, 在⽇常开发时==很少使⽤==,在 TypeScript 中也是同理,所以 在 TypeScript 中进⾏类型声明时,通常都是⽤⼩写的 number 、 string 、 boolean。
    </span>
    <h2 id="_unknown">unknown</h2>
    <span class="content">
      &nbsp;	&nbsp; &nbsp; &nbsp;unknown 的含义是: 未知类型。适⽤于: 起初不确定数据的具体类型,要后期才能确定。<br>
      &nbsp;	&nbsp; &nbsp; &nbsp;1、unknown 可以理解为⼀个类型安全的 any 。
    </span>
    <CodeBlock language="ts">
      <pre>// 设置a的类型为unknown
        let a: unknown
        //以下对a的赋值,均符合规范
        a = 100
        a = false
        a = '你好'
        // 设置x的数据类型为string
        let x: string
        x = a //警告:不能将类型"unknown"分配给类型"string"</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp; &nbsp; &nbsp;2、unknown 会强制开发者在使⽤之前进⾏类型检查,从⽽提供更强的类型安全性。
    </span>
    <CodeBlock language="ts">
      <pre>// 设置a的类型为unknown
        let a: unknown
        a = 'hello'

        //第⼀种⽅式:加类型判断
        if(typeof a === 'string'){
         x = a
         console.log(x)
        }

        //第⼆种⽅式:加断⾔
        x = a as string

        //第三种⽅式:加断⾔
        x = {{ `<string>` }}a</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp; &nbsp; &nbsp;3、读取 any 类型数据的任何属性都不会报错,⽽ unknown 正好与之相反。
    </span>
    <CodeBlock language="ts">
      <pre>let str1: string
        str1 = 'hello'
        str1.toUpperCase() //⽆警告

        let str2: any
        str2 = 'hello'
        str2.toUpperCase() //⽆警告

        let str3: unknown
        str3 = 'hello';
        str3.toUpperCase() //警告:"str3"的类型为"未知"

        // 使⽤断⾔强制指定str3的类型为string
        (str3 as string).toUpperCase() //⽆警告</pre>
    </CodeBlock>
    <h2 id="_never">never</h2>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;never 的含义是:任何值都不是,即: 不能有值,例如 undefined 、 null 、 '' 、 0 都不⾏!<br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;1、⼏乎不⽤ never 去直接限制变量,因为没有意义,例如:
    </span>
    <CodeBlock language="ts">
      <pre>/* 指定a的类型为never, 那就意味着a以后不能存任何的数据了 */
        let a: never

        // 以下对a的所有赋值都会有警告
        a = 1
        a = true
        a = undefined
        a = null</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;2、never 一般是 TypeScript 主动推断出来的，例如：
    </span>
    <CodeBlock language="ts">
      <pre>// 指定a的类型为string
        let a: string // 给a设置⼀个值
        a = 'hello'

        if (typeof a === 'string'){
          console.log(a.toUpperCase())
        }else {
          console.log(a) // TypeScript会推断出此处的a是never,因为没有任何⼀个值符合此处的逻辑</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;3、never 也可⽤于限制函数的返回值。
    </span>
    <CodeBlock language="ts">
      <pre>// 限制throwError函数不需要有任何返回值,任何值都不⾏,像undeifned、null都不⾏
        function throwError(str: string): never {
          throw new Error('程序异常退出:' + str)
        }</pre>
    </CodeBlock>
    <h2 id="_void">void</h2>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;void 的含义是空,即: 函数不返回任何值, 调⽤者也不应依赖其返回值进⾏任何操作!<br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;1、void 通常⽤于函数返回值声明
    </span>
    <CodeBlock language="ts">
      <pre>function logMessage(msg:string):void{
          console.log(msg)
        }
        logMessage('你好')</pre>
    </CodeBlock>
    <span class="attention">
      &nbsp;	&nbsp; &nbsp;	&nbsp;注意:编码者没有编写 return 指定函数返回值,所以 logMessage 函数是没有显式返回值的,但会有⼀个隐式返回值,
      是undefined,虽然函数返回类型为void,但也是可以接受undefined的,
      简单记:undefined是void可以接受的⼀种"空"。
    </span>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;2、以下写法均符合规范
    </span>
    <CodeBlock language="ts">
      <pre>// 无警告
        function logMessage(msg: string): void {
          console.log(msg)
        }

        // 无警告
        function logMessage(msg: string): void {
          console.log(msg)
          return;
        }

        // 无警告
        function logMessage(msg: string): void {
          console.log(msg)
          return undefined;
        }</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp; &nbsp;	&nbsp;那限制函数返回值时,是不是 undefined 和 void 就没区别呢?—— 有区别。因为还有 这句话 :【返回值类型为 **void** 的函数,调⽤者不应依赖其返回值进⾏任何操作!】对⽐下 ⾯两段代码:
    </span>
    <CodeBlock language="ts">
      function logMessage(msg: string): void {
        console.log(msg)
        }

      let result = logMessage('你好')

      if (result) { // 此行报错：无法测试 "void" 类型的表达式的真实性
        console.log('logMessage有返回值')
        }


      function logMessage(msg: string): undefined {
        console.log(msg)
        }

      result = logMessage('你好')

      if (result) { // 此行无警告
        console.log('logMessage有返回值')
        }
    </CodeBlock>
    <span class="blue">
      <span style="font-weight: bolder">理解 void 与 undefined</span><br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;void 是⼀个⼴泛的概念,⽤来表达"空",⽽ undefined 则是这种"空"的具体 实现。 <br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;因此可以说 undefined 是 void 能接受的⼀种"空"的状态。 <br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;也可以理解为: void 包含 undefined ,但 void 所表达的语义超越了 undefined , void 是⼀种意图上的约定,⽽不仅仅是特定值的限制。 <br>
    </span>
    <span class="attention">
      <span style="font-weight: bolder">总结</span><br>
      如果⼀个函数返回类型为 void ,那么:<br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;1、从语法上讲:函数是可以返回 undefined 的,⾄于显式返回,还是隐式返回,这⽆ 所谓!<br>
      &nbsp;	&nbsp; &nbsp;	&nbsp;2、从语义上讲:函数调⽤者不应关⼼函数返回的值,也不应依赖返回值进⾏任何操作! 即使我们知道它返回了 undefined 。<br>
    </span>
  </div>
</template>

<style scoped lang="scss">

</style>
