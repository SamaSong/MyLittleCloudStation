<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1 class="title">常用类型</h1>
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
        	  2、unknown 会强制开发者在使⽤之前进⾏类型检查,从⽽提供更强的类型安全性。
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
          x = {{
            `<string>` }}a</pre>
      </CodeBlock>
      <span class="content">
        3、读取 any 类型数据的任何属性都不会报错,⽽ unknown 正好与之相反。
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
    </div>
    <div data-custom="never">
      <h2 id="_never">never</h2>
      <span class="content">
        never 的含义是:任何值都不是,即: 不能有值,例如 undefined 、 null 、 '' 、 0 都不⾏!<br>
        1、⼏乎不⽤ never 去直接限制变量,因为没有意义,例如:
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
        2、never 一般是 TypeScript 主动推断出来的，例如：
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
        3、never 也可⽤于限制函数的返回值。
      </span>
      <CodeBlock language="ts">
        <pre>// 限制throwError函数不需要有任何返回值,任何值都不⾏,像undeifned、null都不⾏
          function throwError(str: string): never {
            throw new Error('程序异常退出:' + str)
          }</pre>
      </CodeBlock>
    </div>
    <div data-custom="void">
      <h2 id="_void">void</h2>
      <span class="content">
        void 的含义是空,即: 函数不返回任何值, 调⽤者也不应依赖其返回值进⾏任何操作!<br>
        1、void 通常⽤于函数返回值声明
      </span>
      <CodeBlock language="ts">
        <pre>function logMessage(msg:string):void{
            console.log(msg)
          }
          logMessage('你好')</pre>
      </CodeBlock>
      <span class="attention">
        注意:编码者没有编写 return 指定函数返回值,所以 logMessage 函数是没有显式返回值的,但会有⼀个隐式返回值,
        是undefined,虽然函数返回类型为void,但也是可以接受undefined的,
        简单记:undefined是void可以接受的⼀种"空"。
      </span>
      <span class="content">
        	 	2、以下写法均符合规范
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
        那限制函数返回值时,是不是 undefined 和 void 就没区别呢?—— 有区别。因为还有 这句话 :【返回值类型为 **void** 的函数,调⽤者不应依赖其返回值进⾏任何操作!】对⽐下 ⾯两段代码:
      </span>
      <CodeBlock language="ts">
          <pre>function logMessage(msg: string): void {
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
        </pre>
      </CodeBlock>
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
      <CodeBlock language="ts">
        <pre>let a:object //a的值可以是任何【⾮原始类型】,包括:对象、函数、数组等
        // 以下代码,是将【⾮原始类型】赋给a,所以均符合要求
        a = {}
        a = {name:'张三'}
        a = [1,3,5,7,9]
        a = function(){}
        a = new String('123')
        class Person {}
        a = new Person()

        // 以下代码,是将【原始类型】赋给a,有警告
        a = 1 // 警告:不能将类型"number"分配给类型"object"
        a = true // 警告:不能将类型"boolean"分配给类型"object"
        a = '你好' // 警告:不能将类型"string"分配给类型"object"
        a = null // 警告:不能将类型"null"分配给类型"object"
        a = undefined // 警告:不能将类型"undefined"分配给类型"object"</pre>
      </CodeBlock>
      <h3>Object(⼤写)</h3>
      <ul>
        <li>官⽅描述:所有可以调⽤ **Object** ⽅法的类型。 </li>
        <li>简单记忆:除了 undefined 和 null 的任何值。 </li>
        <li>由于限制的范围实在太⼤了!所以实际开发中使⽤频率极低。 </li>
      </ul>
      <CodeBlock language="ts">
        <pre>let b:Object //b的值必须是Object的实例对象(除去undefined和null的任何值)
        // 以下代码,均⽆警告,因为给a赋的值,都是Object的实例对象
        b = {}
        b = {name:'张三'}
        b = [1,3,5,7,9]
        b = function(){}
        b = new String('123'

        class Person {}
        b = new Person()
        b = 1 // 1不是Object的实例对象,但其包装对象是Object的实例
        b = true // truue不是Object的实例对象,但其包装对象是Object的实例
        b = '你好' // "你好"不是Object的实例对象,但其包装对象是Object的实例

        // 以下代码均有警告
        b = null // 警告:不能将类型"null"分配给类型"Object"
        b = undefined // 警告:不能将类型"undefined"分配给类型"Object"</pre>
      </CodeBlock>
      <h3>声明对象类型</h3>
      <span class="content">
        1、实际开发中,限制⼀般对象,通常使⽤以下形式
      </span>
      <CodeBlock language="ts">
        <pre>// 限制person1对象必须有name属性,age为可选属性
        let person1: { name: string, age?: number }
        // 含义同上,也能⽤分号做分隔
        let person2: { name: string; age?: number }

        // 含义同上,也能⽤换⾏做分隔
        let person3: {
          name: string
          age?: number  // 加？代表可以为空
        }
        // 如下赋值均可以
        person1 = {name:'李四',age:18}
        person2 = {name:'张三'}
        person3 = {name:'王五'}

        // 如下赋值不合法,因为person3的类型限制中,没有对gender属性的说明
        person3 = {name:'王五',gender:'男'}</pre>
      </CodeBlock>
      <span class="content">
        2、索引签名: 允许定义对象可以具有任意数量的属性,这些属性的键和类型是可变的, 常⽤于:描述类型不确定的属性,(具有动态属性的对象)。
      </span>
      <CodeBlock language="ts">
        <pre>// 限制person对象必须有name属性,可选age属性但值必须是数字,同时可以有任意数量、任意类型的其他属性
        let person: {
          name: string
          age?: number
          [key: string]: any // 索引签名,完全可以不⽤key这个单词,换成其他的也可以(另一种常用写法：index)
        }

        // 赋值合法
        person = {
          name:'张三',
          age:18,
          gender:'男'
        }</pre>
      </CodeBlock>
      <h3>声明函数类型</h3>
      <CodeBlock language="ts">
        <pre>let count: (a: number, b: number) => number
        count = function (x, y) { return x + y }</pre>
      </CodeBlock>
      <ul>
        <li>TypeScript 中的 => 在函数类型声明时表示==函数类型,==描述其==参数类型==和返回类型。 </li>
        <li>JavaScript 中的 => 是⼀种定义函数的语法,是具体的函数实现。 </li>
        <li>函数类型声明还可以使⽤:接⼝、⾃定义类型等⽅式,下⽂中会详细讲解。 </li>
      </ul>
      <h3>声明数组类型</h3>
      <CodeBlock language="ts">
        <pre>let arr1: string[]
        let arr2: Array{{ `<string>` }}

        arr1 = ['a','b','c']
        arr2 = ['hello','world']</pre>
      </CodeBlock>
    </div>
    <div data-custom="tuple">
      <h2 id="_tuple">tuple</h2>
      <span class="content">
        元组 (Tuple) 是⼀种==特殊的数组类型==,可以存储固定数量的元素,并且每个元素的类型是==已知==的且可以==不同==。元组⽤于精确描述⼀组值的类型， ? 表示可选元素。
      </span>
      <CodeBlock language="ts">
        <pre>// 第⼀个元素必须是 string 类型,第⼆个元素必须是 number 类型。
        let arr1: [string,number]
        // 第⼀个元素必须是 number 类型,第⼆个元素是可选的,如果存在,必须是 boolean 类型。
        let arr2: [number,boolean?]
        // 第⼀个元素必须是 number 类型,后⾯的元素可以是任意数量的 string 类型
        let arr3: [number,...string[]]

        // 可以赋值
        arr1 = ['hello',123]
        arr2 = [100,false]
        arr2 = [200]
        arr3 = [100,'hello','world']
        arr3 = [100]

        // 不可以赋值,arr1声明时是两个元素,赋值的是三个
        arr1 = ['hello',123,false]</pre>
      </CodeBlock>
    </div>
    <div data-custom="enum">
      <h2 id="_enum">enum</h2>
      <span class="content">
        枚举( enum )可以定义==⼀组命名常量==,它能增强代码的可读性,也让代码更好维护。<br>
        如下代码的功能是:根据调⽤ walk 时传⼊的不同参数,执⾏不同的逻辑,存在的问题是调⽤ walk 时传参时没有任何提示,编码者很容易写错字符串内容;并且⽤于判断逻辑的 up 、 down 、 left 、 right 是连续且==相关的⼀组值==,那此时就特别适合使⽤==枚举( enum )==。
      </span>
      <CodeBlock language="ts">
        <pre>function walk(str: string) {
           if (str === 'up') {
             console.log("向[上]走");
           } else if (str === 'down') {
             console.log("向[下]走");
           } else if (str === 'left') {
             console.log("向[左]走");
           } else if (str === 'right') {
             console.log("向[右]走");
           } else {
             console.log("未知方向");
           }
        }
        walk('up');
        walk('down');
        walk('left');
        walk('right');</pre>
      </CodeBlock>
      <h3>1、数字枚举</h3>
      <span class="content">
        数字枚举⼀种最常⻅的枚举类型,其成员的值会⾃动递增,且数字枚举还具备==反向映射==的 特点,在下⾯代码的打印中,不难发现:可以通过值来获取对应的枚举成员名称.
      </span>
      <CodeBlock language="ts">
        <pre>// 定义一个描述【上下左右】方向的枚举Direction
        enum Direction {
           Up,
           Down,
           Left,
           Right
        }

        console.log(Direction); // 打印Direction会看到如下内容
        /*
        {
           0: 'Up',
           1: 'Down',
           2: 'Left',
           3: 'Right',
           Up: 0,
           Down: 1,
           Left: 2,
           Right: 3
        }
        */

        // 反向映射
        console.log(Direction.Up);
        console.log(Direction[0]);</pre>
      </CodeBlock>
      <span class="content">
        也可以指定枚举成员的初始值,其后的成员值会⾃动递增。
      </span>
      <CodeBlock language="ts">
        <pre>enum Direction {
           Up = 6,
           Down,
           Left,
           Right
        }
        console.log(Direction.Up); // 输出: 6
        console.log(Direction.Down); // 输出: 7</pre>
      </CodeBlock>
      <span class="content">
        使⽤数字枚举完成刚才 walk 函数中的逻辑,此时我们发现: 代码更加直观易读,⽽且类型安全,同时也更易于维护。
      </span>
      <CodeBlock language="ts">
        <pre>enum Direction {
          Up,
          Down,
          Left,
          Right,
        }
        function walk(n: Direction) {
          if (n === Direction.Up) {
          console.log("向【上】⾛");
          } else if (n === Direction.Down) {
          console.log("向【下】⾛");
          } else if (n === Direction.Left) {
          console.log("向【左】⾛");
          } else if (n === Direction.Right) {
          console.log("向【右】⾛");
          } else {
          console.log("未知⽅向");
          }
        }
        walk(Direction.Up)
        walk(Direction.Down)</pre>
      </CodeBlock>
      <h3>2、字符串枚举</h3>
      <span class="content">
        枚举成员的值是字符串。没有反向映射。
      </span>
      <CodeBlock language="ts">
        <pre>enum Direction {
          Up = "up",
          Down = "down",
          Left = "left",
          Right = "right"
        }
        let dir: Direction = Direction.Up;
        console.log(dir); // 输出: "up"</pre>
      </CodeBlock>
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
      <CodeBlock language="ts">
        <pre>function demo():void{
          // 返回undefined合法
          return undefined
          // 以下返回均不合法
          return 100
          return false
          return null
          return []
        }
        demo()</pre>
      </CodeBlock>
      <span class="content">代码段2(特殊):使⽤ 限制函数返回值为 void 时, **TypeScript** 并不会严格要求函数返回空。</span>
      <CodeBlock language="ts">
        <pre>type LogFunc = () => void  // LogFunc的类型是一个函数，该函数不接受任何参数，并且其返回值是void类型的

        const f1: LogFunc = () => {
           return 100; // 允许返回⾮空值
        };
        const f2: LogFunc = () => 200; // 允许返回⾮空值

        const f3: LogFunc = function () {
          return 300; // 允许返回⾮空值
        };</pre>
      </CodeBlock>
      <span class="content">另一种写法：</span>
      <CodeBlock language="ts">
        <pre>let PrintData: () => void;

        PrintData = () => {
          return 100; // 允许返回非空值
        };

        PrintData = () => 200; // 允许返回非空值

        PrintData = function () {
          return 300; // 允许返回非空值
        };</pre>
      </CodeBlock>
      <div class="attention">
        为什么会这样? <br>
        <span class="content">是为了确保如下代码成⽴,我们知道 <span class="bgc">Array.prototype.push</span> 的返回值是⼀个数字, ⽽ <span class="bgc">Array.prototype.forEach</span> ⽅法期望其回调的返回类型是 void 。</span>
      </div>
      <CodeBlock language="ts">
        <pre>const src = [1, 2, 3];
        const dst = [0];
        src.forEach((el) => dst.push(el));  //箭头函数的简写形式。此时,dst.push(el)会被作为返回值</pre>
      </CodeBlock>
      <div class="blue">官⽅⽂档的说明: <a href="https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions" target="_blank">Assignability of Functions</a> </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
