<script setup>
import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1>TypeScript-高级类型</h1>
    <div data-custom="泛型">
      <h2 id="_泛型">泛型</h2>
      <span class="content">泛型允许我们在定义函数、类或接⼝时,使⽤类型参数来表示未指定的类型,这些参数在具体使⽤时,才被指定具体的类型,泛型能让同⼀段代码适⽤于多种类型,同时仍然保持类型的安全性。</span>
      <span class="content">举例:如下代码中 {{ `<T>` }} 就是泛型,(不⼀定⾮叫 T ),设置泛型后即可在函数中使⽤ T 来表 示该类型:</span>
      <h3>泛型函数</h3>
      <CodeBlock language="ts">
        <pre>function logData{{ `<T>` }}(data: T): T {
          console.log(data)
          return data
        }
        logData{{ `<number>` }}(100)
        logData{{ `<string>` }}('hello')</pre>
      </CodeBlock>
      <h3>泛型可以有多个</h3>
      <CodeBlock language="ts">
        <pre>function logData{{ `<T, U>` }}(data1: T, data2: U): T | U {
          console.log(data1, data2)
          return Date.now() % 2 ? data1 : data2
        }
        logData{{ `<number, string>` }}(100, 'hello')
        logData{{ `<string, boolean>` }}('ok', false)</pre>
      </CodeBlock>
      <h3>泛型接口</h3>
      <CodeBlock language="ts">
        <pre>interface PersonInterface{{ `<T>` }} {
          name: string,
          age: number,
          extraInfo: T
        }
        let p1: PersonInterface{{ `<string>` }}
        let p2: PersonInterface{{ `<number>` }}
        p1 = { name: '张三', age: 18, extraInfo: '一个好人' }
        p2 = { name: '李四', age: 18, extraInfo: 250 }</pre>
      </CodeBlock>
      <h3>泛型约束</h3>
      <CodeBlock language="ts">
        <pre>interface LengthInterface {
          length: number
        }

        // 约束规则是：传入的类型T必须具有 length 属性
        function logPerson{{ `<T extends LengthInterface>` }}(data: T): void {
            console.log(data.length)
        }

        logPerson{{ `<string>` }}('hello')

        // 报错：因为number不具备length属性
        // logPerson{{ `<number>` }}(100)</pre>
      </CodeBlock>
      <h3>泛型类</h3>
      <CodeBlock language="ts">
        <pre>class Person{{ `<T>` }} {
            constructor(public name: string, public age: number, public extraInfo: T) {}
            speak() {
              console.log(`我叫${this.name}今年${this.age}岁了`)
              console.log(this.extraInfo)
            }
        }

        // 测试代码1
        const p1 = new Person{{ `<number>` }}("tom", 30, 250);

        // 测试代码2
        type JobInfo = {
            title: string;
            company: string;
        }

        const p2 = new Person{{ `<JobInfo>` }}("tom", 30, { title: '研发总监', company: '发发发科技公司' });</pre>
      </CodeBlock>
    </div>
    <div data-custom="type">
      <h2 id="_type">type</h2>
      <span class="content">
        type 可以为任意类型创建别名,让代码更简洁、可读性更强,同时能更⽅便地进⾏类型复⽤和 扩展。
      </span>
      <h3>1、基本⽤法</h3>
      <span class="content">
        类型别名使⽤ type 关键字定义, type 后跟类型名称,例如下⾯代码中 num 是类 型别名。
      </span>
      <CodeBlock language="ts">
        <pre>type num = number;
        Let price: num
        price = 100</pre>
      </CodeBlock>
      <h3>2、联合类型</h3>
      <span class="content">
        联合类型是⼀种⾼级类型,它表示⼀个值可以是⼏种不同类型之⼀。
      </span>
      <CodeBlock language="ts">
        <pre>type Status = number | string;
        type Gender = '男' | '女';

        function printStatus(status: Status) {
          console.log(status);
        }

        function logGender(str: Gender) {
          console.log(str);
        }

        printStatus(404);
        printStatus('200');
        printStatus('501');

        logGender('男');
        logGender('女');</pre>
      </CodeBlock>
      <h3>3、交叉类型</h3>
      <span class="content">
        交叉类型(Intersection Types)允许将多个类型合并为⼀个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常⽤于对象类型。
      </span>
      <CodeBlock language="ts">
        <pre>//⾯积
        type Area = {
          height: number; //⾼
          width: number; //宽
        };

        //地址
        type Address = {
          num: number; //楼号
          cell: number; //单元号
          room: string; //房间号
        };

        // 定义类型House,且House是Area和Address组成的交叉类型
        type House = Area & Address;
          const house: House = {
          height: 180,
          width: 75,
          num: 6,
          cell: 3,
          room: '702'
        };</pre>
      </CodeBlock>
    </div>
    <div data-custom="抽象类">
      <h2 id="_抽象类">抽象类</h2>
      <ul>
        <li><b>概述</b>:抽象类是⼀种⽆法被实例化的类,专⻔⽤来定义类的结构和⾏为,类中可以写抽象 ⽅法,也可以写具体实现。抽象类主要⽤来为其派⽣类提供⼀个基础结构,要求其派⽣类  必须实现其中的抽象⽅法。</li>
        <li><b>简记</b>:抽象类<span class="bgc">不能实例化</span>,其意义是<span class="bgc">可以被继承</span>,抽象类⾥可以有<span class="bgc">普通⽅法</span>、也可以有<span class="bgc">抽象⽅法</span>。 </li>
      </ul>
      <span class="content" style="font-weight: bolder">通过以下场景,理解抽象类:</span>
      <span class="content">我们定义⼀个抽象类 Package ,表示所有包裹的基本结构,任何包裹都有重量属性 weigh t ,包裹都需要计算运费。但不同类型的包裹(如:标准速度、特快专递)都有不同的运费计算 ⽅式,因此⽤于计算运费的 calculate ⽅法是⼀个抽象⽅法,必须由具体的⼦类来实现。</span>
      <span class="content">Package 类 TypeScript</span>
      <CodeBlock language="ts">
        <pre>abstract class Package {
          constructor(public weight: number){}
          // 抽象⽅法:⽤来计算运费,不同类型包裹有不同的计算⽅式
          abstract calculate(): number // 通⽤⽅法:打印包裹详情
          printPackage() {
          console.log(`包裹重量为: ${this.weight}kg,运费为: ${this.calculate()}元`);
          }
        }</pre>
      </CodeBlock>
      <span class="content">StandardPackage 类继承了 Package ,实现了 calculate ⽅法:</span>
      <CodeBlock language="ts">
        <pre>// 标准包裹
        class StandardPackage extends Package {
          constructor( weight: number,
          public unitPrice: number // 每公⽄的固定费率
          ) { super(weight) }

          // 实现抽象⽅法:计算运费
          calculate(): number {
            return this.weight * this.unitPrice;
          }
        }

        // 创建标准包裹实例
        const s1 = new StandardPackage(10,5)
        s1.printPackage()</pre>
      </CodeBlock>
      <span class="content">
        ExpressPackage 类继承了 Package ,实现了 calculate ⽅法:ExpressPackage 类(特快包裹)
      </span>
      <CodeBlock language="ts">
        <pre>class ExpressPackage extends Package {
          constructor(
            private weight: number, // 每公⽄的固定费率(快速包裹更⾼)
            private unitPrice: number,  private additional: number // 超出10kg以后的附加费
          ){ super(weight) }

           // 实现抽象⽅法:计算运费
           calculate(): number {
             if(this.weight > 10){
             // 超出10kg的部分,每公⽄多收additional对应的价格
             return 10 * this.unitPrice + (this.weight - 10) * this.additional
             }else {
             return this.weight * this.unitPrice;
             }
           }
        }
        // 创建特快包裹实例
        const e1 = new ExpressPackage(13,8,2)
        e1.printPackage()</pre>
      </CodeBlock>
      <div class="blue">
        <span style="font-weight: bolder">总结:何时使⽤抽象类?</span>
        <ul>
          <li>定义通用接口 :为⼀组相关的类定义通⽤的⾏为(⽅法或属性)时。</li>
          <li>提供基础实现：在抽象类中提供某些⽅法或为其提供基础实现,这样派⽣类就可以继承这 些实现。</li>
          <li>确保关键实现：强制派⽣类实现⼀些关键⾏为。</li>
          <li>共享代码和逻辑:当多个类需要共享部分代码时,抽象类可以避免代码重复。</li>
        </ul>
      </div>
    </div>
    <div data-custom="interface(接⼝)">
      <h2 id="_interface(接⼝)">interface(接⼝)</h2>
      <span class="content">interface 是⼀种`定义结构`的⽅式,主要作⽤是为:类、对象、函数等规定`⼀种契约`,这样 可以确保代码的⼀致性和类型安全,但要注意 interface `只能`定义`格式`,`不能`包含`任何实现` !</span>
      <h3>定义类结构</h3>
      <CodeBlock language="ts">
        <pre>// PersonInterface接口，用与限制Person类的格式
        interface PersonInterface {
            name: string;
            age: number;
            speak(n: number): void;
        }

        // 定义一个类Person，实现 PersonInterface 接口
        class Person implements PersonInterface {
            constructor(
                public name: string,
                public age: number
            ) { }

            // 实现接口中的 speak 方法
            speak(n: number): void {
                for (let i = 0; i < n; i++) {
                    // 打印出包含名字和年龄的问候语句
                    console.log(`你好，我叫${this.name}，我的年龄是${this.age}`);
                }
            }
        }

        // 创建一个 Person 类的实例 p1，传入名字 'tom' 和年龄 18
        const p1 = new Person('tom', 18);
        p1.speak(3);</pre>
      </CodeBlock>
      <h3>定义对象结构</h3>
      <CodeBlock language="ts">
        <pre>interface UserInterface {
            name: string;
            readonly gender: string; // 只读属性
            age?: number; // 可选属性
            run: (n: number) => void;
        }

        const user: UserInterface = {
            name: "张三",
            gender: '男',
            age: 18,
            run(n) {
                console.log(`奔跑了${n}米`);
            }
        };</pre>
      </CodeBlock>
      <h3>定义函数结构</h3>
      <CodeBlock language="ts">
        <pre>// 定义函数结构
        interface CountInterface {
            (a: number, b: number): number;
        }

        const count: CountInterface = (x, y) => {
            return x + y;
        }</pre>
      </CodeBlock>
      <h3>接口之间的继承</h3>
      <span class="content">一个 interface 继承另一个 interface，从而实现代码的复用</span>
      <CodeBlock language="ts">
        <pre>interface PersonInterface {
            name: string; // 姓名
            age: number; // 年龄
        }

        interface StudentInterface extends PersonInterface {
            grade: string; // 年级
        }

        const stu: StudentInterface = {
            name: "张三",
            age: 25,
            grade: '高三'
        }</pre>
      </CodeBlock>
      <h3>接口自动合井（可重复定义）</h3>
      <CodeBlock language="ts">
        <pre>// PersonInterface接口
        interface PersonInterface {
          // 属性声明
          name: string;
          age: number;
        }

        // 给PersonInterface接口添加新属性
        interface PersonInterface {
          // 方法声明
          speak(): void;
        }

        // Person类实现PersonInterface
        class Person implements PersonInterface {
          name: string;
          age: number;

          // 构造器
          constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
          }

          // 方法
          speak() {
            console.log('你好!我是老师:', this.name);
          }
        }</pre>
      </CodeBlock>
      <div class="blue">
        <span style="font-weight: bolder">总结:何时使⽤接⼝?</span>
        <ul>
          <li>定义对象的格式: 描述数据模型、API 响应格式、配置对象........等等,是开发中⽤的最多 的场景。</li>
          <li>类的契约:规定⼀个类需要实现哪些属性和⽅法。</li>
          <li>扩展已有接⼝:⼀般⽤于扩展第三⽅库的类型, 这种特性在⼤型项⽬中可能会⽤到。</li>
        </ul>
      </div>
    </div>
    <div data-custom="⼀些相似概念的区别">
      <h2 id="_⼀些相似概念的区别">⼀些相似概念的区别</h2>
      <h3>interface 与 type 的区别</h3>
      <div class="blue">
        相同点: interface 和 type 都可以⽤于定义对象结构,在定义对象结构时两者可以 互换。<br>
        不同点:
        <ul>
          <li>interface :更专注于定义对象和类的结构,⽀持继承、合并。</li>
          <li>type :可以定义类型别名、联合类型、交叉类型,但不⽀持继承和⾃动合并。</li>
        </ul>
      </div>
      <span class="content">interface 和 type 都可以定义对象结构 TypeScript</span>
      <CodeBlock language="ts">
        <pre>// 使⽤ interface 定义 Person 对象
        interface PersonInterface {
          name: string;
          age: number;
          speak(): void;
        }
        // 使⽤ type 定义 Person 对象
        type PersonType = {
          name: string;
          age: number;
          speak(): void;
        };
        // 使⽤PersonInterface
        /* let person: PersonInterface = {
         name:'张三',
         age:18,
         speak(){
         console.log(`我叫:${this.name},年龄:${this.age}`)
         }
        } */
        // 使⽤PersonType
        let person: PersonType = {
          name:'张三',
          age:18,
          speak(){
          console.log(`我叫:${this.name},年龄:${this.age}`)
         }
        }</pre>
      </CodeBlock>
      <span class="content">interface 可以继承、合并</span>
      <CodeBlock language="ts">
        <pre>interface PersonInterface {
          name: string; // 姓名
          age: number; // 年龄
        }

        interface PersonInterface {
          speak: () => void;
        }

        interface StudentInterface extends PersonInterface {
          grade: string; // 年级
        }

        const student: StudentInterface = {
          name: '李四',
          age: 18,
          grade: '高二',
          speak() { console.log(this.name, this.age, this.grade); }
        }</pre>
      </CodeBlock>
      <span class="content">type 的交叉类型</span>
      <CodeBlock language="ts">
        <pre>// 使⽤ type 定义 Person 类型,并通过交叉类型实现属性的合并
        type PersonType = {
          name: string; // 姓名
          age: number; // 年龄
          } & {
          speak: () => void;
        };

        // 使⽤ type 定义 Student 类型,并通过交叉类型继承 PersonType
        type StudentType = PersonType & {
          grade: string; // 年级
        };
        const student: StudentType = {
          name: '李四',
          age: 18,
          grade: '⾼⼆',
          speak() {
          console.log(this.name, this.age, this.grade);
          }
        };</pre>
      </CodeBlock>
      <h3>interface 与 抽象类的区别</h3>
      <div class="blue">
        相同点:都能定义⼀个类的格式(定义类应遵循的契约) <br>
        不相同:
        <ul>
          <li>接⼝:只能描述结构,不能有任何实现代码,⼀个类可以实现多个接⼝。</li>
          <li>抽象类:既可以包含抽象⽅法,也可以包含具体⽅法, ⼀个类只能继承⼀个抽象类。</li>
        </ul>
      </div>
      <span class="content">⼀个类可以实现多个接⼝ TypeScript</span>
      <CodeBlock language="ts">
        <pre>// FlyInterface 接⼝
        interface FlyInterface {
          fly(): void;
        }
        // 定义 SwimInterface 接⼝
        interface SwimInterface {
          swim(): void;
        }
        // Duck 类实现了 FlyInterface 和 SwimInterface 两个接⼝
        class Duck implements FlyInterface, SwimInterface {
          fly(): void {
          console.log('鸭⼦可以⻜');
          }
          swim(): void {
          console.log('鸭⼦可以游泳');
          }
        }

        // 创建⼀个 Duck 实例
        const duck = new Duck();
        duck.fly(); // 输出: 鸭⼦可以⻜
        duck.swim(); // 输出: 鸭⼦可以游泳</pre>
      </CodeBlock>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
