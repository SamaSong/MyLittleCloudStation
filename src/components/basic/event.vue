<template>
  <div class="content-container">
    <h1 class="title">事件</h1>
    <span class="sub-title">JavaScript 与 HTML 的交互是通过事件实现的，事件代表文档或浏览器窗口中某个有意义的时刻。</span>
    <h2 id="_1、事件流">1、事件流</h2>
    <h3>事件冒泡</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;	&nbsp;IE 事件流被称为事件冒泡，这是因为事件被定义为从最具体的元素（文档树中最深的节点）开始触
      发，然后向上传播至没有那么具体的元素（文档）。<br>
      <span class="sub-important">div => body => html => document</span>
    </span>
    <h3>事件捕获</h3>
    <span class="content">
      &nbsp;&nbsp;&nbsp;&nbsp;事件捕获的意思是最不具体的节
      点应该最先收到事件，而最具体的节点应该最后收到事件。事件捕获实际上是为了在事件到达最终目标
      前拦截事件。
    </span>
    <h3>DOM 事件流</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;DOM2 Events 规范规定事件流分为 3 个阶段：事件捕获、到达目标和事件冒泡。事件捕获最先发生，
      为提前拦截事件提供了可能。然后，实际的目标元素接收到事件。最后一个阶段是冒泡，最迟要在这个
      阶段响应事件。
    </span>
    <h2 id="_2、事件处理程序">2、事件处理程序</h2>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;事件意味着用户或浏览器执行的某种动作。比如，单击（click）、加载（load）、鼠标悬停（mouseover）。为响应事件而调用的函数被称为事件处理程序（或事件监听器）。
    </span>
    <h2 id="_3、事件对象">3、事件对象</h2>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;在 DOM 中发生事件时，所有相关信息都会被收集并存储在一个名为 event 的对象中。这个对象包
      含了一些基本信息，比如导致事件的元素、发生的事件类型，以及可能与特定事件相关的任何其他数据。
    </span>
    <h2 id="_4、事件类型">4、事件类型</h2>
    <span class="content">
       用户界面事件（UIEvent）：涉及与 BOM 交互的通用浏览器事件。<br />
       焦点事件（FocusEvent）：在元素获得和失去焦点时触发。<br />
       鼠标事件（MouseEvent）：使用鼠标在页面上执行某些操作时触发。<br />
       滚轮事件（WheelEvent）：使用鼠标滚轮（或类似设备）时触发。<br />
       输入事件（InputEvent）：向文档中输入文本时触发。<br />
       键盘事件（KeyboardEvent）：使用键盘在页面上执行某些操作时触发。<br />
       合成事件（CompositionEvent）：在使用某种 IME（Input Method Editor，输入法编辑器）输入
      字符时触发。
    </span>
    <h2 id="_5、内存与性能">5、内存与性能</h2>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;在 JavaScript 中，页面中事件处理程序的数量与页面整体性能直接相关。原
      因有很多。首先，每个函数都是对象，都占用内存空间，对象越多，性能越差。其次，为指定事件处理
      程序所需访问 DOM 的次数会先期造成整个页面交互的延迟。
    </span>
    <h3>事件委托</h3>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;“过多事件处理程序”的解决方案是使用事件委托。<br>
      事件委托利用事件冒泡，可以只使用一个事件
      处理程序来管理一种类型的事件。例如，click 事件冒泡到 document。这意味着可以为整个页面指定
      一个 onclick 事件处理程序，而不用为每个可点击元素分别指定事件处理程序。比如有以下 HTML：
    </span>
    <div id="html"></div>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;这里的 HTML 包含 3 个列表项，在被点击时应该执行某个操作。对此，通常的做法是像这样指定 3个事件处理程序：
    </span>
    <CodeBlock>
      <pre>let item2 = document.getElementById("doSomething");
      let item3 = document.getElementById("sayHi");
      item1.addEventListener("click", (event) => {
       location.href = "http:// www.wrox.com";
      });
      item2.addEventListener("click", (event) => {
       document.title = "I changed the document's title";
      });
      item3.addEventListener("click", (event) => {
       console.log("hi");
      });</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;如果对页面中所有需要使用 onclick 事件处理程序的元素都如法炮制，结果就会出现大片雷同的
      只为指定事件处理程序的代码。使用事件委托，只要给所有元素共同的祖先节点添加一个事件处理程序，
      就可以解决问题。比如：
    </span>
    <CodeBlock>
      <pre>let list = document.getElementById("myLinks");
      list.addEventListener("click", (event) => {
         let target = event.target;
         switch(target.id) {
         case "doSomething":
         document.title = "I changed the document's title";
         break;
         case "goSomewhere":
         location.href = "http:// www.wrox.com";
         break;
         case "sayHi":
         console.log("hi");
         break;
       }
      });</pre>
    </CodeBlock>
    <span class="content">
      &nbsp;	&nbsp;这里只给元素添加了一个 onclick 事件处理程序。因为所有列表项都是这个
      元素的后代，所以它们的事件会向上冒泡，最终都会由这个函数来处理。但事件目标是每个被点击的列
      表项，只要检查 event 对象的 id 属性就可以确定，然后再执行相应的操作即可。相对于前面不使用事
      件委托的代码，这里的代码不会导致先期延迟，因为只访问了一个 DOM 元素和添加了一个事件处理程
      序。结果对用户来说没有区别，但这种方式占用内存更少。所有使用按钮的事件（大多数鼠标事件和键
      盘事件）都适用于这个解决方案。
    </span>
    <span class="content">
      &nbsp;	&nbsp;	&nbsp;事件委托具有如下优点。<br>
       document 对象随时可用，任何时候都可以给它添加事件处理程序（不用等待 DOMContentLoaded或 load 事件）。这意味着只要页面渲染出可点击的元素，就可以无延迟地起作用。<br>
       节省花在设置页面事件处理程序上的时间。只指定一个事件处理程序既可以节省 DOM 引用，也可以节省时间。<br>
       减少整个页面所需的内存，提升整体性能。
    </span>
  </div>
</template>

<script setup>
import CodeBlock from "@/common/components/codeBlock.vue";
import { onMounted } from "vue";

function escapeHtml(html) {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

onMounted(() => {
  document.getElementById("html").innerHTML = `<pre>${ escapeHtml("<ul id=\"myLinks\"> \n" +
    " <li id=\"goSomewhere\">Go somewhere</li> \n" +
    " <li id=\"doSomething\">Do something</li> \n" +
    " <li id=\"sayHi\">Say hi</li> \n" +
    "</ul>") }<pre>`;
})
</script>

<style scoped lang="scss">

</style>
