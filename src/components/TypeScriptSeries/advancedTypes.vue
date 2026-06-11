<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import ArticleSection from '@/common/components/ArticleSection.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  genericFunctionExample,
  multipleGenericsExample,
  genericInterfaceExample,
  genericConstraintExample,
  genericClassExample,
  typeAliasExample,
  unionTypeExample,
  intersectionTypeExample,
  abstractPackageExample,
  standardPackageExample,
  expressPackageExample,
  classInterfaceExample,
  objectInterfaceExample,
  functionInterfaceExample,
  interfaceExtendsExample,
  interfaceMergeExample,
  interfaceTypeObjectExample,
  interfaceInheritanceMergeExample,
  typeIntersectionInheritanceExample,
  multipleInterfacesExample,
} from './advancedTypes.examples.js'
</script>

<template>
  <ArticleLayout
    title="TypeScript-高级类型"
    description="整理泛型、type、抽象类、interface 以及相似概念的区别。"
  >
    <ArticleSection title="泛型">
      <span class="content">泛型允许我们在定义函数、类或接⼝时,使⽤类型参数来表示未指定的类型,这些参数在具体使⽤时,才被指定具体的类型,泛型能让同⼀段代码适⽤于多种类型,同时仍然保持类型的安全性。</span>
      <span class="content">举例:如下代码中 {{ `<T>` }} 就是泛型,(不⼀定⾮叫 T ),设置泛型后即可在函数中使⽤ T 来表 示该类型:</span>
      <h3>泛型函数</h3>
      <CodeBlock language="ts" :code="genericFunctionExample" />
      <h3>泛型可以有多个</h3>
      <CodeBlock language="ts" :code="multipleGenericsExample" />
      <h3>泛型接口</h3>
      <CodeBlock language="ts" :code="genericInterfaceExample" />
      <h3>泛型约束</h3>
      <CodeBlock language="ts" :code="genericConstraintExample" />
      <h3>泛型类</h3>
      <CodeBlock language="ts" :code="genericClassExample" />
    </ArticleSection>
    <ArticleSection title="type">
      <span class="content">
        type 可以为任意类型创建别名,让代码更简洁、可读性更强,同时能更⽅便地进⾏类型复⽤和 扩展。
      </span>
      <h3>1、基本⽤法</h3>
      <span class="content">
        类型别名使⽤ type 关键字定义, type 后跟类型名称,例如下⾯代码中 num 是类 型别名。
      </span>
      <CodeBlock language="ts" :code="typeAliasExample" />
      <h3>2、联合类型</h3>
      <span class="content">
        联合类型是⼀种⾼级类型,它表示⼀个值可以是⼏种不同类型之⼀。
      </span>
      <CodeBlock language="ts" :code="unionTypeExample" />
      <h3>3、交叉类型</h3>
      <span class="content">
        交叉类型(Intersection Types)允许将多个类型合并为⼀个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常⽤于对象类型。
      </span>
      <CodeBlock language="ts" :code="intersectionTypeExample" />
    </ArticleSection>
    <ArticleSection title="抽象类">
      <ul>
        <li><b>概述</b>:抽象类是⼀种⽆法被实例化的类,专⻔⽤来定义类的结构和⾏为,类中可以写抽象 ⽅法,也可以写具体实现。抽象类主要⽤来为其派⽣类提供⼀个基础结构,要求其派⽣类  必须实现其中的抽象⽅法。</li>
        <li><b>简记</b>:抽象类<span class="bgc">不能实例化</span>,其意义是<span class="bgc">可以被继承</span>,抽象类⾥可以有<span class="bgc">普通⽅法</span>、也可以有<span class="bgc">抽象⽅法</span>。 </li>
      </ul>
      <span class="content" style="font-weight: bolder">通过以下场景,理解抽象类:</span>
      <span class="content">我们定义⼀个抽象类 Package ,表示所有包裹的基本结构,任何包裹都有重量属性 weigh t ,包裹都需要计算运费。但不同类型的包裹(如:标准速度、特快专递)都有不同的运费计算 ⽅式,因此⽤于计算运费的 calculate ⽅法是⼀个抽象⽅法,必须由具体的⼦类来实现。</span>
      <span class="content">Package 类 TypeScript</span>
      <CodeBlock language="ts" :code="abstractPackageExample" />
      <span class="content">StandardPackage 类继承了 Package ,实现了 calculate ⽅法:</span>
      <CodeBlock language="ts" :code="standardPackageExample" />
      <span class="content">
        ExpressPackage 类继承了 Package ,实现了 calculate ⽅法:ExpressPackage 类(特快包裹)
      </span>
      <CodeBlock language="ts" :code="expressPackageExample" />
      <div class="blue">
        <span style="font-weight: bolder">总结:何时使⽤抽象类?</span>
        <ul>
          <li>定义通用接口 :为⼀组相关的类定义通⽤的⾏为(⽅法或属性)时。</li>
          <li>提供基础实现：在抽象类中提供某些⽅法或为其提供基础实现,这样派⽣类就可以继承这 些实现。</li>
          <li>确保关键实现：强制派⽣类实现⼀些关键⾏为。</li>
          <li>共享代码和逻辑:当多个类需要共享部分代码时,抽象类可以避免代码重复。</li>
        </ul>
      </div>
    </ArticleSection>
    <ArticleSection title="interface(接⼝)">
      <span class="content">interface 是⼀种`定义结构`的⽅式,主要作⽤是为:类、对象、函数等规定`⼀种契约`,这样 可以确保代码的⼀致性和类型安全,但要注意 interface `只能`定义`格式`,`不能`包含`任何实现` !</span>
      <h3>定义类结构</h3>
      <CodeBlock language="ts" :code="classInterfaceExample" />
      <h3>定义对象结构</h3>
      <CodeBlock language="ts" :code="objectInterfaceExample" />
      <h3>定义函数结构</h3>
      <CodeBlock language="ts" :code="functionInterfaceExample" />
      <h3>接口之间的继承</h3>
      <span class="content">一个 interface 继承另一个 interface，从而实现代码的复用</span>
      <CodeBlock language="ts" :code="interfaceExtendsExample" />
      <h3>接口自动合井（可重复定义）</h3>
      <CodeBlock language="ts" :code="interfaceMergeExample" />
      <div class="blue">
        <span style="font-weight: bolder">总结:何时使⽤接⼝?</span>
        <ul>
          <li>定义对象的格式: 描述数据模型、API 响应格式、配置对象........等等,是开发中⽤的最多 的场景。</li>
          <li>类的契约:规定⼀个类需要实现哪些属性和⽅法。</li>
          <li>扩展已有接⼝:⼀般⽤于扩展第三⽅库的类型, 这种特性在⼤型项⽬中可能会⽤到。</li>
        </ul>
      </div>
    </ArticleSection>
    <ArticleSection title="⼀些相似概念的区别">
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
      <CodeBlock language="ts" :code="interfaceTypeObjectExample" />
      <span class="content">interface 可以继承、合并</span>
      <CodeBlock language="ts" :code="interfaceInheritanceMergeExample" />
      <span class="content">type 的交叉类型</span>
      <CodeBlock language="ts" :code="typeIntersectionInheritanceExample" />
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
      <CodeBlock language="ts" :code="multipleInterfacesExample" />
    </ArticleSection>
  </ArticleLayout>
</template>
