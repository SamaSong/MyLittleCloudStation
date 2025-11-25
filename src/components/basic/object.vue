<script setup>
  import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <span class="title">对象、类与面向对象编程</span>
    <span class="sub-title">&nbsp;	&nbsp;	&nbsp;	ECMA-262 将对象定义为一组属性的无序集合。严格来说，这意味着对象就是一组没有特定顺序的
    值。对象的每个属性或方法都由一个名称来标识，这个名称映射到一个值。正因为如此（以及其他还未
    讨论的原因），可以把 ECMAScript 的对象想象成一张散列表，其中的内容就是一组名/值对，值可以是
    数据或者函数。</span>
    <h1 id="_1、对象">1、对象</h1>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;通过New Object()创建一个对象。<br>
      ECMAScript 提供了 Object.defineProperties()方法。这个方法可以通过多个描述符一次性定义多个属性。它接收两个参数：要为之添
      加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应。比如：
    </span>
    <CodeBlock>
      <pre>let book = {};
        Object.defineProperties(book, {
         year_: {
          value: 2017
         },
         edition: {
          value: 1
         },
         year: {
           get() {
            return this.year_;
           },
           set(newValue) {
           if (newValue > 2017) {
             this.year_ = newValue;
             this.edition += newValue - 2017;
           }
          }
         }
        });</pre>
    </CodeBlock>
    <h3>合并对象</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;ECMAScript 6 专门为合并对象提供了 Object.assign()方法。这个方法接收一个目标对象和一个
      或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true）
      和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性
      会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标
      对象上的[[Set]]设置属性的值。<br>
      Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。<br>
      <span class="sub-important">"浅复制意味着只会复制对象的引用"</span>
    </span>
    <h3>可计算属性</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时将其作为 JavaScript 表达式而不是字符串来求值：
    </span>
    <CodeBlock>
      <pre>const nameKey = 'name';
        const ageKey = 'age';
        const jobKey = 'job';
        let person = {
         [nameKey]: 'Matt',
         [ageKey]: 27,
         [jobKey]: 'Software engineer'
        };
        console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }</pre>
    </CodeBlock>
    <h3>对象解构</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;ECMAScript 6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。简单地说，对象解构就是使用与对象匹配的结构来实现对象属性赋值。
    </span>
    <CodeBlock>
      <pre>// 使用对象解构
        let person = {
         name: 'Matt',
         age: 27
        };
        let { name: personName, age: personAge } = person;
        console.log(personName); // Matt
        console.log(personAge); // 27</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;
      <span class="sub-important">解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这
      意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据 ToObject()的定义），null
      和 undefined 不能被解构，否则会抛出错误。</span>
    </span>
    <h1 id="_2、创建对象">2、创建对象</h1>
    <h3>工厂模式</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;工厂模式是一种众所周知的设计模式，广泛应用于软件工程领域，用于抽象创建特定对象的过程。
    </span>
    <CodeBlock>
      <pre>function createPerson(name, age, job) {
         let o = new Object();
         o.name = name;
         o.age = age;
         o.job = job;
         o.sayName = function() {
          console.log(this.name);
         };
         return o;
        }
        let person1 = createPerson("Nicholas", 29, "Software Engineer");
        let person2 = createPerson("Greg", 27, "Doctor");</pre>
    </CodeBlock>
    <h3>构造函数模式</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;ECMAScript 中的构造函数是用于创建特定类型对象的。像 Object 和 Array 这
      样的原生构造函数，运行时可以直接在执行环境中使用。当然也可以自定义构造函数，以函数的形式为
      自己的对象类型定义属性和方法。<br>
      比如，前面的例子使用构造函数模式可以这样写：
    </span>
    <CodeBlock>
      <pre>function Person(name, age, job){
         this.name = name;
         this.age = age;
         this.job = job;
         this.sayName = function() {
          console.log(this.name);
         };
        }
        let person1 = new Person("Nicholas", 29, "Software Engineer");
        let person2 = new Person("Greg", 27, "Doctor");
        person1.sayName(); // Nicholas
        person2.sayName(); // Greg</pre>
    </CodeBlock>
    <span class="content">
      <span class="sub-important">
      构造函数和工厂函数的区别:<br>没有显式地创建对象。属性和方法直接赋值给了 this。没有 return。
      </span>
    </span>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;
      <span class="sub-important">任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。</span>
    </span>
    <h3>原型模式</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例
      共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处
      是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以
      直接赋值给它们的原型，如下所示：
    </span>
    <CodeBlock>
      <pre>function Person() {}
        Person.prototype.name = "Nicholas";
        Person.prototype.age = 29;
        Person.prototype.job = "Software Engineer";
        Person.prototype.sayName = function() {
         console.log(this.name);
        };
        let person1 = new Person();
        person1.sayName(); // "Nicholas"
        let person2 = new Person();
        person2.sayName(); // "Nicholas"
        console.log(person1.sayName == person2.sayName); // true
        使用函数表达式也可以：
        let Person = function() {};
        Person.prototype.name = "Nicholas";
        Person.prototype.age = 29;
        Person.prototype.job = "Software Engineer";
        Person.prototype.sayName = function() {
         console.log(this.name);
        };
        let person1 = new Person();
        person1.sayName(); // "Nicholas"
        let person2 = new Person();
        person2.sayName(); // "Nicholas"
        console.log(person1.sayName == person2.sayName); // true</pre>
    </CodeBlock>
    <h3>原型</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向
      原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构
      造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而
      异，可能会给原型对象添加其他属性和方法。
    </span>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;<span class="sub-important">关于“原型”的详细解释，请阅读JavaScript高级程序设计(第4版)8.2.4</span>
    </span>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;关于构造函数、原型对象和实例的解释：<br>
      1. 构造函数 (Constructor):构造函数是用来创建对象的特殊函数，通常以大写字母开头。<br>
      2. 原型对象 (Prototype):每个函数都有一个 prototype 属性，指向原型对象。<br>
      3. 实例 (Instance):通过构造函数创建的对象就是实例。
    </span>
    <h3>原型层级</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个
      实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原
      型对象，然后在原型对象上找到属性后，再返回对应的值。
    </span>
    <h3>原型和 in 操作符</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在可
      以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上。
    </span>
    <h3>对象迭代</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;两个静态方法
      Object.values()和 Object.entries()接收一个对象，返回它们内容的数组。Object.values()
      返回对象值的数组，Object.entries()返回键/值对的数组。<br>
    </span>
    <CodeBlock>
      <pre>const o = {
         foo: 'bar',
         baz: 1,
         qux: {}
        };
        console.log(Object.values(o));
        // ["bar", 1, {}]
        console.log(Object.entries((o)));
        // [["foo", "bar"], ["baz", 1], ["qux", {}]]</pre>
    </CodeBlock>
    <h1 id="_3、继承">3、继承</h1>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;继承是面向对象编程中讨论最多的话题。很多面向对象语言都支持两种继承：接口继承和实现继承。实现继承是 ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的。
    </span>
    <h3>原型链</h3>
    <span class="content"><span class="sub-important">关于“原型链”的详细解释，请阅读JavaScript高级程序设计(第4版)8.3.1</span></span>
    <h3>盗用构造函数</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;为了解决原型包含引用值(数组也属于引用值)导致的继承问题，需要使用“盗用构造函数”。基本思路很简单：在子类
      构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用
      apply()和 call()方法以新创建的对象为上下文执行构造函数。来看下面的例子：
    </span>
    <CodeBlock>
      <pre>function SuperType() {
         this.colors = ["red", "blue", "green"];
        }
        function SubType() {
         // 继承 SuperType
         SuperType.call(this);
        }
        let instance1 = new SubType();
        instance1.colors.push("black");
        console.log(instance1.colors); // "red,blue,green,black"
        let instance2 = new SubType();
        console.log(instance2.colors); // "red,blue,green"</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;盗用构造函数还有另外一个优点，可以在子类构造函数中向父类构造函数传参。
    </span>
    <CodeBlock>
      <pre>function SuperType(name){
         this.name = name;
        }
        function SubType() {
         // 继承 SuperType 并传参
         SuperType.call(this, "Nicholas");
         // 实例属性
         this.age = 29;
        }
        let instance = new SubType();
        console.log(instance.name); // "Nicholas";
        console.log(instance.age); // 29</pre>
    </CodeBlock>
    <span class="content"><span class="sub-important">盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。</span></span>
    <span class="content"><span class="sub-important">其他继承方式请阅读JavaScript高级程序设计(第4版)8.3</span></span>
    <h1 id="_4、类">4、类</h1>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;类（class）是ECMAScript 中新的基础性语法糖结构。
    </span>
    <h3>类定义</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;与函数类型相似，定义类也有两种主要方式：类声明和类表达式。这两种方式都使用 class 关键字加大括号：
    </span>
    <CodeBlock>
      <pre>// 类声明
        class Person {}
        // 类表达式
        const Animal = class {};</pre>
    </CodeBlock>
    <h3>类的构成</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。
      空的类定义照样有效。默认情况下，类定义中的代码都在严格模式下执行。
    </span>
    <h3>类构造函数</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;constructor 关键字用于在类定义块内部创建类的构造函数。方法名 constructor 会告诉解释器
      在使用 new 操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必需的，不定义构造函
      数相当于将构造函数定义为空函数。
    </span>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;类可以像函数一样在任何地方定义，比如在数组中。与立即调用函数表达式相似，类也可以立即实例化
    </span>
    <h3>实例、原型和类成员</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;每次通过new调用类标识符时，都会执行类构造函数。在这个函数内部，可以为新创建的实例（this）添加“自有”属性。每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享：
    </span>
    <CodeBlock>
      <pre>class Person {
          constructor() {
           // 这个例子先使用对象包装类型定义一个字符串
           // 为的是在下面测试两个对象的相等性
           this.name = new String('Jack');
           this.sayName = () => console.log(this.name);
           this.nicknames = ['Jake', 'J-Dog']
         }
        }
        let p1 = new Person(),
        p2 = new Person();
        p1.sayName(); // Jack
        p2.sayName(); // Jack
        console.log(p1.name === p2.name); // false
        console.log(p1.sayName === p2.sayName); // false
        console.log(p1.nicknames === p2.nicknames); // false
        p1.name = p1.nicknames[0];
        p2.name = p2.nicknames[1];
        p1.sayName(); // Jake
        p2.sayName(); // J-Dog</pre>
    </CodeBlock>
    <h3>静态类方法</h3>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。与原型成员类似，静态成员每个类上只能有一个。
    </span>
    <span class="content">
      &nbsp;	&nbsp;   &nbsp;   &nbsp;静态类成员在类定义中使用 static 关键字作为前缀。在静态成员中，this 引用类自身。
    </span>
    <h3>类的继承</h3>
    <span class="content">&nbsp;	&nbsp;   &nbsp;   &nbsp;
      <span class="sub-important">建议直接阅读JavaScript高级程序设计(第4版)8.4.4</span>
    </span>
  </div>
</template>

<style scoped lang="scss">

</style>
