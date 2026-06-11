export const arrayBufferExample = `let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
alert(buffer.byteLength); // 16`

export const textDecoderConstructorExample = 'let decoder = new TextDecoder([label], [options]);'

export const textDecoderDecodeExample = 'let str = decoder.decode([input], [options]);'

export const textDecoderExample = `let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello

let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好`

export const textEncoderConstructorExample = 'let encoder = new TextEncoder();'

export const textEncoderExample = `let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111`

export const blobConstructorExample = 'new Blob(blobParts, options);'

export const blobCreateExample = `// 从字符串创建 Blob
let blob = new Blob(["<html>...</html>"], { type: 'text/html' });
// 请注意：第一个参数必须是一个数组 [...]

// 从类型化数组（typed array）和字符串创建 Blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"

let blob = new Blob([hello, ' ', 'world'], { type: 'text/plain' });`

export const blobSliceExample = 'blob.slice([byteStart], [byteEnd], [contentType]);'

export const blobDownloadLinkExample = [
  '// download 特性（attribute）强制浏览器下载而不是导航',
  '<a download="hello.txt" href="#" id="link">Download</a>',
  '',
  '<script>',
  'let blob = new Blob(["Hello, world!"], { type: "text/plain" });',
  '',
  'link.href = URL.createObjectURL(blob);',
  '</' + 'script>',
].join('\n')

export const blobAutoDownloadExample = `let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], { type: 'text/plain' });

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);`

export const imageToBlobExample = `// 获取任何图像
let img = document.querySelector('img');

// 生成同尺寸的 <canvas>
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
}, 'image/png');`

export const canvasToBlobAsyncExample = "let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));"

export const blobToArrayBufferExample = `// 从 blob 获取 arrayBuffer
const bufferPromise = await blob.arrayBuffer();

// 或
blob.arrayBuffer().then(buffer => /* 处理 ArrayBuffer */);`

export const fileConstructorExample = 'new File(fileParts, fileName, [options])'

export const fileInputExample = [
  '<input type="file" onchange="showFile(this)">',
  '',
  '<script>',
  'function showFile(input) {',
  '  let file = input.files[0];',
  '',
  '  alert(`File name: ${file.name}`); // 例如 my.png',
  '  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824',
  '}',
  '</' + 'script>',
].join('\n')

export const fileReaderConstructorExample = 'let reader = new FileReader(); // 没有参数'
