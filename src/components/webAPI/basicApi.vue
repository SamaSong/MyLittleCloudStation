<script setup>

import CodeBlock from "@/common/components/codeBlock.vue";
</script>

<template>
  <div class="content-container">
    <h1>基本API</h1>
    <div data-custom="ArrayBuffer，二进制数组">
      <h2 id="_ArrayBuffer，二进制数组">ArrayBuffer，二进制数组</h2>
      <span class="content">在 JavaScript 中有很多种二进制数据格式，
        <span class="bgc">ArrayBuffer</span>，<span class="bgc">Uint8Array</span>，<span class="bgc">DataView</span>，<span class="bgc">Blob</span>，<span class="bgc">File</span> 及其他。
        <br>
        <span class="b">基本的二进制对象是 ArrayBuffer —— 对固定长度的连续内存空间的引用。</span>
        <br>
        我们这样创建它：
      </span>
      <CodeBlock>
        <pre>let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
        alert(buffer.byteLength); // 16</pre>
      </CodeBlock>
      <span class="content">
        它会分配一个 16 字节的连续内存空间，并用 0 进行预填充。
        <br>
        <span class="bgc">ArrayBuffer</span> 不是某种东西的数组。ArrayBuffer 与 Array 没有任何共同之处
      </span>
      <span class="content"><span class="b">如要操作 ArrayBuffer，我们需要使用“视图”对象。</span></span>
    </div>
    <div data-coustom="TextDecoder 和 TextEncoder">
      <h2 id="_TextDecoder和TextEncoder">TextDecoder 和 TextEncoder</h2>
      <span class="content">如果二进制数据实际上是一个字符串怎么办？例如，我们收到了一个包含文本数据的文件。</span>
      <h3>TextDecoder</h3>
      <span class="content">内建的 TextDecoder 对象在给定缓冲区（buffer）和编码格式（encoding）的情况下，允许将值读取为实际的 JavaScript 字符串。</span>
      <CodeBlock>
        <pre>let decoder = new TextDecoder([label], [options]);</pre>
      </CodeBlock>
      <ul>
        <li>label —— 编码格式，默认为 utf-8，但同时也支持 big5，windows-1251 等许多其他编码格式。</li>
        <li>options —— 可选对象：</li>
        <li>fatal —— 布尔值，如果为 true 则为无效（不可解码）字符抛出异常，否则（默认）用字符 \uFFFD 替换无效字符。</li>
        <li>ignoreBOM —— 布尔值，如果为 true 则忽略 BOM（可选的字节顺序 Unicode 标记），很少需要使用。</li>
      </ul>
      <CodeBlock>
        <pre>let str = decoder.decode([input], [options]);</pre>
      </CodeBlock>
      <ul>
        <li>input —— 要被解码的 BufferSource。</li>
        <li>options —— 可选对象：</li>
        <li>stream —— 对于解码流，为 true，则将传入的数据块（chunk）作为参数重复调用 decoder。在这种情况下，多字节的字符可能偶尔会在块与块之间被分割。这个选项告诉 TextDecoder 记住“未完成”的字符，并在下一个数据块来的时候进行解码。</li>
      </ul>
      <span>例如</span>
      <CodeBlock>
        <pre>let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

        alert( new TextDecoder().decode(uint8Array) ); // Hello

        let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

        alert( new TextDecoder().decode(uint8Array) ); // 你好</pre>
      </CodeBlock>
      <h3>TextEncoder</h3>
      <span class="content"><span class="bgc">TextEncoder</span> 做相反的事情 —— 将字符串转换为字节。
        <br>
        语法为：
      </span>
      <CodeBlock>
        <pre>let encoder = new TextEncoder();</pre>
      </CodeBlock>
      <span>只支持 utf-8 编码。<br>它有两种方法：</span>
      <ul>
        <li>encode(str) —— 从字符串返回 Uint8Array。</li>
        <li>encodeInto(str, destination) —— 将 str 编码到 destination 中，该目标必须为 Uint8Array。</li>
      </ul>
      <CodeBlock>
        <pre>let encoder = new TextEncoder();

        let uint8Array = encoder.encode("Hello");
        alert(uint8Array); // 72,101,108,108,111</pre>
      </CodeBlock>
    </div>
    <div data-custom="Blob">
      <h2 id="_Blob">Blob</h2>
      <span class="content">Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成 —— 一系列其他 Blob 对象，字符串和 BufferSource。<br>构造函数的语法为：</span>
      <CodeBlock>
        <pre>new Blob(blobParts, options);</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">blobParts</span> 是 Blob/BufferSource/String 类型的值的数组。</li>
        <li>
          <span class="b">options</span> 可选对象：
          <ul>
            <li><span class="b">type</span> —— Blob 类型，通常是 MIME 类型，例如 image/png</li>
            <li><span class="b">endings</span> —— 是否转换换行符，使 Blob 对应于当前操作系统的换行符（\r\n 或 \n）。默认为 "transparent"（啥也不做），不过也可以是 "native"（转换）。</li>
          </ul>
        </li>
      </ul>
      <span>例如</span>
      <CodeBlock>
        <pre>// 从字符串创建 Blob
        let blob = new Blob(["{{ `<html>` }}…{{ `<html>` }}"], {type: 'text/html'});
        // 请注意：第一个参数必须是一个数组 [...]

        // 从类型化数组（typed array）和字符串创建 Blob
        let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"

        let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});</pre>
      </CodeBlock>
      <span class="content">我们可以用 slice 方法来提取 Blob 片段：</span>
      <CodeBlock>
        <pre>blob.slice([byteStart], [byteEnd], [contentType]);</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">byteStart</span> —— 起始字节，默认为 0。</li>
        <li><span class="b">byteEnd</span> —— 最后一个字节（不包括，默认为最后）。</li>
        <li><span class="b">contentType</span> —— 新 blob 的 type，默认与源 blob 相同。</li>
      </ul>
      <h3>Blob 用作 URL</h3>
      <span class="content">
        Blob 可以很容易用作 {{ `<a>` }}、{{ `<img>` }} 或其他标签的 URL，来显示它们的内容。<br>
        多亏了 type，让我们也可以下载/上传 Blob 对象，而在网络请求中，type 自然地变成了 Content-Type。<br>
        让我们从一个简单的例子开始。通过点击链接，你可以下载一个具有动态生成的内容为 hello world 的 Blob 的文件：
      </span>
      <CodeBlock>
        <pre>// download 特性（attribute）强制浏览器下载而不是导航
        {{ ` <a download="hello.txt" href='#' id="link">Download</a>` }}

        {{ `<script>
        let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

        link.href = URL.createObjectURL(blob);
        </script>` }}
        </pre>
      </CodeBlock>
      <span class="content">
        我们也可以在 Javascript 中动态创建一个链接，通过 link.click() 模拟一个点击，然后便自动下载了。<br>
        下面是类似的代码，此代码可以让用户无需任何 HTML 即可下载动态生成的 Blob（译注：也就是通过代码模拟用户点击，从而自动下载）：
      </span>
      <CodeBlock>
        <pre>let link = document.createElement('a');
        link.download = 'hello.txt';

        let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

        link.href = URL.createObjectURL(blob);

        link.click();

        URL.revokeObjectURL(link.href);</pre>
      </CodeBlock>
      <span class="content">
        <span class="bgc">URL.createObjectURL</span>取一个 Blob，并为其创建一个唯一的 URL，形式为 {{ `blob:<origin>/<uuid>` }}。<br>
        也就是 link.href 的值的样子：<br>
        浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 很短，但可以访问 Blob。<br>
        生成的 URL（即其链接）仅在当前文档打开的状态下才有效。它允许引用 {{ `<img>、<a>` }} 中的 Blob，以及基本上任何其他期望 URL 的对象。<br>
          不过它有个副作用。虽然这里有 Blob 的映射，但 Blob 本身只保存在内存中的。浏览器无法释放它。<br>
          在文档退出时（unload），该映射会被自动清除，因此 Blob 也相应被释放了。但是，如果应用程序寿命很长，那这个释放就不会很快发生。
      </span>
      <span class="content">
        <span class="b">因此，如果我们创建一个 URL，那么即使我们不再需要该 Blob 了，它也会被挂在内存中。</span><br>
        URL.revokeObjectURL(url) 从内部映射中移除引用，因此允许 Blob 被删除（如果没有其他引用的话），并释放内存。<br>
        在上面最后一个示例中，我们打算仅使用一次 Blob，来进行即时下载，因此我们立即调用 URL.revokeObjectURL(link.href)。<br>
        而在前一个带有可点击的 HTML 链接的示例中，我们不调用 URL.revokeObjectURL(link.href)，因为那样会使 Blob URL 无效。在调用该方法后，由于映射被删除了，因此该 URL 也就不再起作用了。
      </span>
      <h3>Image 转换为 blob</h3>
      <span class="content">
        我们可以创建一个图像（image）的、图像的一部分、或者甚至创建一个页面截图的 Blob。这样方便将其上传至其他地方。<br>
        图像操作是通过 {{ `<canvas>` }} 元素来实现的：
      </span>
      <ul>
        <li>使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" target="_blank">canvas.drawImage</a> 在 canvas 上绘制图像（或图像的一部分）。</li>
        <li>调用 canvas 方法 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob" target="_blank">.toBlob(callback, format, quality)</a> 创建一个 Blob，并在创建完成后使用其运行 callback。</li>
      </ul>
      <span>在下面这个示例中，图像只是被复制了，不过我们可以在创建 blob 之前，从中裁剪图像，或者在 canvas 上对其进行转换：</span>
      <CodeBlock>
        <pre>// 获取任何图像
        let img = document.querySelector('img');

        // 生成同尺寸的 {{ `<canvas>` }}
        let canvas = document.createElement('canvas');
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;

        let context = canvas.getContext('2d');

        // 向其中复制图像（此方法允许剪裁图像）
        context.drawImage(img, 0, 0);
        // 我们 context.rotate()，并在 canvas 上做很多其他事情

        // toBlob 是异步操作，结束后会调用 callback
        canvas.toBlob(function(blob) {
          // blob 创建完成，下载它
          let link = document.createElement('a');
          link.download = 'example.png';

          link.href = URL.createObjectURL(blob);
          link.click();

          // 删除内部 blob 引用，这样浏览器可以从内存中将其清除
          URL.revokeObjectURL(link.href);
        }, 'image/png');</pre>
      </CodeBlock>
      <span>如果我们更喜欢 async/await 而不是 callback：</span>
      <CodeBlock>
        <pre>let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));</pre>
      </CodeBlock>
      <span class="content">对于页面截屏，我们可以使用诸如 <a href="https://github.com/niklasvh/html2canvas" target="_blank">https://github.com/niklasvh/html2canvas</a> 之类的库。它所做的只是扫一遍浏览器页面，并将其绘制在 {{ `<canvas>` }} 上。然后，我们就可以像上面一样获取一个它的 Blob。</span>
      <h3>Blob 转换为 ArrayBuffer</h3>
      <span class="content">
        Blob 构造器允许从几乎任何东西创建 blob，包括任何 BufferSource。<br>
        但是，如果我们需要执行低级别的处理时，我们可以从 blob.arrayBuffer() 中获取最低级别的 ArrayBuffer：
      </span>
      <CodeBlock>
        <pre>// 从 blob 获取 arrayBuffer
        const bufferPromise = await blob.arrayBuffer();

        // 或
        blob.arrayBuffer().then(buffer => /* 处理 ArrayBuffer */);</pre>
      </CodeBlock>
    </div>
    <div data-custom="File和FileReader">
      <h2 id="_File和FileReader">File 和 FileReader</h2>
      <span class="content">File 对象继承自 Blob，并扩展了与文件系统相关的功能。<br>有两种方式可以获取它。<br>第一种，与 Blob 类似，有一个构造器：</span>
      <CodeBlock>
        <pre>new File(fileParts, fileName, [options])</pre>
      </CodeBlock>
      <ul>
        <li><span class="b">fileParts</span> —— Blob/BufferSource/String 类型值的数组。</li>
        <li><span class="b">fileName</span> —— 文件名字符串。</li>
        <li>
          <span class="b">options</span> —— 可选对象：
          <ul>
            <li><span class="b">lastModified</span> —— 最后一次修改的时间戳（整数日期）。</li>
          </ul>
        </li>
      </ul>
      <span class="content">
        第二种，更常见的是，我们从 {{ `<input type="file">` }} 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。<br>
        由于 File 是继承自 Blob 的，所以 File 对象具有相同的属性，附加：<br>
      </span>
      <ul>
        <li>name —— 文件名</li>
        <li>lastModified —— 最后一次修改的时间戳。</li>
      </ul>
      <span>这就是我们从 {{ `<input type="file">` }} 中获取 File 对象的方式：</span>
      <CodeBlock>
        <pre>{{ `<input type="file" onchange="showFile(this)">` }}

        {{  `<script>` }}
        function showFile(input) {
          let file = input.files[0];

          alert(`File name: ${file.name}`); // 例如 my.png
          alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
        }
        {{  `</script>` }}</pre>
      </CodeBlock>
      <span class="content sub-important">请注意：输入（input）可以选择多个文件，因此 input.files 是一个类数组对象。这里我们只有一个文件，所以我们只取 input.files[0]。</span>
      <h3>FileReader</h3>
      <span class="content">
        <a href="https://www.w3.org/TR/FileAPI/#dfn-filereader" target="_blank">FileReader</a> 是一个对象，其唯一目的是从 Blob（因此也从 File）对象中读取数据。
        <br>
        它使用事件来传递数据，因为从磁盘读取数据可能比较费时间。
        <br>
        构造函数：
      </span>
      <CodeBlock>
        <pre>let reader = new FileReader(); // 没有参数</pre>
      </CodeBlock>
      <span>主要方法:</span>
      <ul>
        <li><span class="b">readAsArrayBuffer(blob)</span> —— 将数据读取为二进制格式的 ArrayBuffer。</li>
        <li><span class="b">readAsText(blob, [encoding])</span> —— 将数据读取为给定编码（默认为 utf-8 编码）的文本字符串。</li>
        <li><span class="b">readAsDataURL(blob)</span> —— 读取二进制数据，并将其编码为 base64 的 data url。</li>
        <li><span class="b">abort()</span> —— 取消操作。</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
