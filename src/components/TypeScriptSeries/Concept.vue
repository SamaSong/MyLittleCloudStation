<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import ArticleSection from '@/common/components/ArticleSection.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  typeDeclarationExample,
  literalTypeExample,
  typeNarrowingExample,
  typeInferenceExample,
} from './Concept.examples.js'
</script>

<template>
  <ArticleLayout
    title="TypeScript概念（基本内容）"
    description="整理 TypeScript 的基础定位、静态类型检查、类型声明和类型推断。"
  >
    <ArticleSection title="概念">
      <h3>简介</h3>
      <span class="content">
        	1、TypeScript 由微软开发,是基于 JavaScript 的⼀个扩展语⾔。
        	2、TypeScript 包含了 JavaScript 的所有内容,即: TypeScript 是 JavaScript 的超集。
        	3、TypeScript 增加了:静态类型检查、接⼝、 泛型等很多现代开发特性,更适合⼤型项⽬ 的开发。
        	4、TypeScript 需要编译为 JavaScript ,然后交给浏览器或其他 JavaScript 运⾏环 境执⾏。
      </span>
      <h3>静态类型检查</h3>
      <span class="content">
        	在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现的几率，此种检查叫“静态类
        型检查”，TypeScript和核心就是“静态类型检查”，简言之就是把运行时的错误前置。<br>
        	同样的功能，TypeScript的代码量要大于JavaScript,但由于TypeScript的代码结构更加清晰，在后期代码
        的维护中TypeScript却远胜于JavaScript。
      </span>
    </ArticleSection>
    <ArticleSection title="类型声明">
      <span class="content">
        使⽤<span class="bgc"> : </span>来对变量或函数形参,进⾏类型声明:
      </span>
      <CodeBlock language="ts" :code="typeDeclarationExample" />
      <span class="content">
        在 : 后也可以写字⾯量类型,不过实际开发中⽤的不多。
      </span>
      <CodeBlock language="ts" :code="literalTypeExample" />
    </ArticleSection>
    <ArticleSection title="类型判断">
      <span class="content">
        &nbsp;	&nbsp; &nbsp;	&nbsp;TS 会根据我们的代码,进⾏类型推导,例如下⾯代码中的变量 d ,只能存储数字。
      </span>
      <CodeBlock language="ts" :code="typeInferenceExample" />
      <span class="content"><span class="sub-important">但要注意,类型推断不是万能的,⾯对复杂类型时推断容易出问题,所以尽量还是明确的编写类型声明!</span></span>
    </ArticleSection>
    <ArticleSection title="类型收窄">
      <span class="content">
        类型收窄是把一个较宽的联合类型，通过判断语句逐步缩小到更具体类型的过程。实际开发中，它比直接使用 as 断言更安全，也能让编辑器在分支内给出正确提示。
      </span>
      <CodeBlock language="ts" :code="typeNarrowingExample" />
      <ul>
        <li>typeof 适合判断 string、number、boolean、function 等基础类型。</li>
        <li>Array.isArray 适合判断数组，优先于 instanceof Array。</li>
        <li>可选属性访问前先判断存在性，避免运行时读取 undefined。</li>
      </ul>
    </ArticleSection>
  </ArticleLayout>
</template>
