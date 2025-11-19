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
  </div>
</template>

<style scoped lang="scss">

</style>
