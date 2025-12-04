<script setup>

import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1>网络请求API</h1>
    <div data-custom="Fetch">
      <h2 id="_Fetch">Fetch</h2>
      <span class="content">有很多方式可以向服务器发送网络请求，并从服务器获取信息。<span class="bgc">fetch()</span>方法是一种现代通用的方法。<br>基本语法：</span>
      <CodeBlock>
        <pre>let promise = fetch(url, [options])</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">url</span> —— 要访问的 URL。</li>
        <li><span class="b">options</span> —— 可选参数：method，header 等。</li>
      </ul>
      <span>没有 options，这就是一个简单的 GET 请求，下载 url 的内容。</span>
      <span class="content b">第一阶段，当服务器发送了响应头（response header），fetch 返回的 promise 就使用内建的 Response class 对象来对响应头进行解析。</span>
      <span>在这个阶段，我们可以通过检查响应头，来检查 HTTP 状态以确定请求是否成功，当前还没有响应体（response body）。</span>
      <CodeBlock>
        <pre>let response = await fetch(url);

        if (response.ok) { // 如果 HTTP 状态码为 200-299
          // 获取 response body（此方法会在下面解释）
          let json = await response.json();
        } else {
          alert("HTTP-Error: " + response.status);
        }</pre>
      </CodeBlock>
      <span class="content b">第二阶段，为了获取 response body，我们需要使用一个其他的方法调用。</span>
      <br>
      <span>Response 提供了多种基于 promise 的方法，来以不同的格式访问 body：</span>
      <ul>
        <li><span class="b">response.text()</span> —— 读取 response，并以文本形式返回 response</li>
        <li><span class="b">response.json()</span> —— 将 response 解析为 JSON 格式</li>
        <li><span class="b">response.formData()</span> —— 以 FormData 对象的形式返回 response，</li>
        <li><span class="b">response.blob()</span> —— 以 Blob（具有类型的二进制数据）形式返回 response</li>
        <li><span class="b">response.arrayBuffer()</span> —— 以 ArrayBuffer（低级别的二进制数据）形式返回 response</li>
      </ul>
      <span>例如，我们从 GitHub 获取最新 commits 的 JSON 对象：</span>
      <CodeBlock>
        <pre>let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
        let response = await fetch(url);

        let commits = await response.json(); // 读取 response body，并将其解析为 JSON 格式

        alert(commits[0].author.login);

          // 也可以使用纯 promise 语法，不使用 await：
        fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
        .then(response => response.json())
        .then(commits => alert(commits[0].author.login));</pre>
      </CodeBlock>
      <div class="attention">
        <span class="b">重要：</span><br>
        我们只能选择一种读取 body 的方法。<br>
        如果我们已经使用了 response.text() 方法来获取 response，那么如果再用 response.json()，则不会生效，因为 body 内容已经被处理过了。
      </div>
      <h3>Response header</h3>
      <span class="content">
        Response header 位于 response.headers 中的一个类似于 Map 的 header 对象。
        它不是真正的 Map，但是它具有类似的方法，我们可以按名称（name）获取各个 header，或迭代它们：
      </span>
    </div>
    <div data-custom="FormData">
      <h2 id="_FormData">FormData</h2>
      <span class="content">FormData 对象用于捕获 HTML 表单，并使用 fetch 或其他网络方法提交。<br>构造函数是：</span>
      <CodeBlock>
        <pre>let formData = new FormData([form]);</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">formData.append(name, value)</span> —— 添加具有给定 name 和 value 的表单字段</li>
        <li><span class="b">formData.append(name, blob, fileName)</span> —— 添加一个字段，就像它是 {{ `<input type="file">` }}，第三个参数 fileName 设置文件名（而不是表单字段名），因为它是用户文件系统中文件的名称</li>
        <li><span class="b">formData.delete(name)</span> —— 移除带有给定 name 的字段</li>
        <li><span class="b">formData.get(name)</span> —— 获取带有给定 name 的字段值</li>
        <li><span class="b">formData.has(name)</span> —— 如果存在带有给定 name 的字段，则返回 true，否则返回 false</li>
      </ul>
      <span>还有一个 set 方法，语法与 append 相同。不同之处在于 .set 移除所有具有给定 name 的字段，然后附加一个新字段。因此，它确保了只有一个具有这种 name 的字段，其他的和 append 一样：</span>
      <ul>
        <li>formData.set(name, value)</li>
        <li>formData.set(name, blob, fileName)</li>
      </ul>
    </div>
    <div data-custom="Fetch：下载进度">
      <h2 id="_Fetch：下载进度">Fetch：下载进度</h2>
      <span class="content"><span class="bgc">fetch</span> 方法允许去跟踪 下载 进度。</span>
      <span class="content">要跟踪下载进度，我们可以使用 response.body 属性。它是 ReadableStream —— 一个特殊的对象，它可以逐块（chunk）提供 body。在 Streams API 规范中有对 ReadableStream 的详细描述。</span>
      <span class="content">与 response.text()，response.json() 和其他方法不同，response.body 给予了对进度读取的完全控制，我们可以随时计算下载了多少。<br>这是从 response.body 读取 response 的示例代码：</span>
      <CodeBlock>
        <pre>// 代替 response.json() 以及其他方法
        const reader = response.body.getReader();

        // 在 body 下载时，一直为无限循环
        while(true) {
          // 当最后一块下载完成时，done 值为 true
          // value 是块字节的 Uint8Array
          const {done, value} = await reader.read();

          if (done) {
            break;
          }

          console.log(`Received ${value.length} bytes`)
        }</pre>
      </CodeBlock>
      <span>await reader.read() 调用的结果是一个具有两个属性的对象：</span>
      <ul>
        <li><span class="b">done</span> —— 当读取完成时为 true，否则为 false。</li>
        <li><span class="b">value</span> —— 字节的类型化数组：Uint8Array。</li>
      </ul>
      <CodeBlock>
        <pre>// Step 1：启动 fetch，并获得一个 reader
        let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

        const reader = response.body.getReader();

        // Step 2：获得总长度（length）
        const contentLength = +response.headers.get('Content-Length');

        // Step 3：读取数据
        let receivedLength = 0; // 当前接收到了这么多字节
        let chunks = []; // 接收到的二进制块的数组（包括 body）
        while(true) {
          const {done, value} = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);
          receivedLength += value.length;

          console.log(`Received ${receivedLength} of ${contentLength}`)
        }

        // Step 4：将块连接到单个 Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for(let chunk of chunks) {
          chunksAll.set(chunk, position); // (4.2)
          position += chunk.length;
        }

        // Step 5：解码成字符串
        let result = new TextDecoder("utf-8").decode(chunksAll);

        // 我们完成啦！
        let commits = JSON.parse(result);
        alert(commits[0].author.login);</pre>
      </CodeBlock>
    </div>
    <div data-custom="Fetch：中止（Abort）">
      <h2 id="_Fetch：中止（Abort）">Fetch：中止（Abort）</h2>
      <span class="content">有一个特殊的内建对象：AbortController。它不仅可以中止 fetch，还可以中止其他异步任务。</span>
      <h3>AbortController 对象</h3>
      <span class="content">创建一个控制器（controller）：</span>
      <CodeBlock>
        <pre>let controller = new AbortController();</pre>
      </CodeBlock>
      <span class="b">控制器是一个极其简单的对象。</span>
      <ul>
        <li>它具有单个方法 abort()</li>
        <li>和单个属性 signal，我们可以在这个属性上设置事件监听器</li>
      </ul>
      <span class="b">当 abort() 被调用时：</span>
      <ul>
        <li>controller.signal 就会触发 abort 事件</li>
        <li>controller.signal.aborted 属性变为 true</li>
      </ul>
      <span class="b">控制器是一个极其简单的对象。</span>
      <ul>
        <li>一部分是通过在 controller.signal 上添加一个监听器，来执行可取消操作。</li>
        <li>另一部分是触发取消：在需要的时候调用 controller.abort()。</li>
      </ul>
      <h3>与 fetch 一起使用</h3>
      <span class="content">为了能够取消 fetch，请将 AbortController 的 signal 属性作为 fetch 的一个可选参数（option）进行传递：</span>
      <CodeBlock>
        <pre>let controller = new AbortController();
        fetch(url, {
          signal: controller.signal
        });</pre>
      </CodeBlock>
      <span class="content">fetch 方法知道如何与 AbortController 一起工作。它会监听 signal 上的 abort 事件。现在，想要中止 fetch，调用 controller.abort() 即可：</span>
      <CodeBlock>
        <pre>controller.abort();</pre>
      </CodeBlock>
      <span class="content sub-important">当一个 fetch 被中止，它的 promise 就会以一个 error AbortError reject，因此我们应该对其进行处理，例如在 try..catch 中。</span>
      <h3>AbortController 是可伸缩的</h3>
      <span class="content">AbortController 是可伸缩的。它允许一次取消多个 fetch。</span>
      <span class="content">如果我们有自己的与 fetch 不同的异步任务，我们可以使用单个 AbortController 中止这些任务以及 fetch。在我们的任务中，我们只需要监听其 abort 事件：</span>
      <CodeBlock>
        <pre>let urls = [...];
        let controller = new AbortController();

        let ourJob = new Promise((resolve, reject) => { // 我们的任务
          ...
          controller.signal.addEventListener('abort', reject);
        });

        let fetchJobs = urls.map(url => fetch(url, { // fetches
          signal: controller.signal
        }));

        // 等待完成我们的任务和所有 fetch
        let results = await Promise.all([...fetchJobs, ourJob]);

        // controller.abort() 被从任何地方调用，
        // 它都将中止所有 fetch 和 ourJob

        </pre>
      </CodeBlock>
    </div>
    <div data-custom="Fetch API">
      <h2 id="Fetch API">Fetch API</h2>
      <span class="content">fetch 的剩余 API</span>
      <CodeBlock>
        <pre>let promise = fetch(url, {
        method: "GET", // POST，PUT，DELETE，等。
        headers: {
          // 内容类型 header 值通常是自动设置的
          // 取决于 request body
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
        referrer: "about:client", // 或 "" 以不发送 Referer header，
        // 或者是当前源的 url
        referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
        mode: "cors", // same-origin，no-cors
        credentials: "same-origin", // omit，include
        cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
        redirect: "follow", // manual，error
        integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
        keepalive: false, // true
        signal: undefined, // AbortController 来中止请求
        window: window // null
      });</pre>
      </CodeBlock>
      <h3>keepalive</h3>
      <span class="content">keepalive 选项表示该请求可能会在网页关闭后继续存在。</span>
      <span class="content">例如，我们收集有关当前访问者是如何使用我们的页面（鼠标点击，他查看的页面片段）的统计信息，以分析和改善用户体验。当访问者离开我们的网页时 —— 我们希望能够将数据保存到我们的服务器上。我们可以使用 window.onunload 事件来实现：</span>
      <CodeBlock>
        <pre>window.onunload = function() {
          fetch('/analytics', {
            method: 'POST',
            body: "statistics",
            keepalive: true
          });
        };</pre>
      </CodeBlock>
      <span class="content">通常，当一个文档被卸载时（unloaded），所有相关的网络请求都会被中止。但是，keepalive 选项告诉浏览器，即使在离开页面后，也要在后台执行请求。所以，此选项对于我们的请求成功至关重要。</span>
      <ul>
        它有一些限制：
        <li>
          我们无法发送兆字节的数据：keepalive 请求的 body 限制为 64KB。
          <ul>
            <li>如果我们需要收集有关访问的大量统计信息，我们则应该将其定期以数据包的形式发送出去，这样就不会留下太多数据给最后的 onunload 请求了。</li>
            <li>此限制是被应用于当前所有 keepalive 请求的总和的。换句话说，我们可以并行执行多个 keepalive 请求，但它们的 body 长度之和不得超过 64KB。</li>
          </ul>
        </li>
        <li>
          如果文档（document）已卸载（unloaded），我们就无法处理服务器响应。因此，在我们的示例中，因为 keepalive，所以 fetch 会成功，但是后续的函数将无法正常工作。
          <ul>
            <li>在大多数情况下，例如发送统计信息，这不是问题，因为服务器只接收数据，并通常向此类请求发送空的响应。</li>
          </ul>
        </li>
      </ul>
    </div>
    <div data-custom="URL 对象">
      <h2 id="_URL 对象">URL 对象</h2>
      <span class="content">内建的 URL 类提供了用于创建和解析 URL 的便捷接口。</span>
      <h3>创建 URL 对象</h3>
      <CodeBlock>
        <pre>new URL(url, [base])</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">url</span> —— 完整的 URL，或者仅路径（如果设置了 base）</li>
        <li><span class="b">base</span> —— 可选的 base URL：如果设置了此参数，且参数 url 只有路径，则会根据这个 base 生成 URL</li>
      </ul>
      <span class="content">URL 对象立即允许我们访问其组件，因此这是一个解析 url 的好方法，例如：</span>
      <CodeBlock>
        <pre>let url = new URL('https://javascript.info/url');

        alert(url.protocol); // https:
        alert(url.host);     // javascript.info
        alert(url.pathname); // /url</pre>
      </CodeBlock>
      <ul>
        这是 URL 组件的备忘单：
        <li>href 是完整的 URL，与 url.toString() 相同</li>
        <li>protocol 以冒号字符 : 结尾</li>
        <li>search —— 以问号 ? 开头的一串参数</li>
        <li>hash 以哈希字符 # 开头</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
