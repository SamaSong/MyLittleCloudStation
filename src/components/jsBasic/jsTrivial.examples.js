export const primitiveWrapperExample = `// 原始类型字符串
let str = 'hello';

// 当访问 str.length 时，JavaScript 引擎做了以下工作:
// 1. 自动装箱: 创建一个临时的 String 对象包装原始字符串
let size = (function() {
  let tempStringObject = new String(str);
  // 2. 访问 String 对象的 length 属性
  let lengthValue = tempStringObject.length;
  // 3. 销毁临时对象，返回长度值
  // JavaScript 引擎自动处理对象销毁，开发者无感知
  return lengthValue;
})();

console.log(size); // 输出: 5`

export const addEventListenerExample = `// 基本语法
window.addEventListener('事件类型', 回调函数, [使用捕获]);`

export const arrayDestructuringExample = `const [key] = Object.keys(arr)
const [value] = Object.values(arr)`

export const regexpExecLoopExample = `// 示例代码
const regex = /\\d+/g;  // 匹配一个或多个数字
const str = "abc123def456ghi789";

console.log("初始状态: regex.lastIndex =", regex.lastIndex); // 0

let match;
let iteration = 1;

while ((match = regex.exec(str)) !== null) {
  console.log(\`\\n第 \${iteration} 次迭代:\`);
  console.log(\`匹配结果: \${match[0]}\`);
  console.log(\`匹配位置: \${match.index}\`);
  console.log(\`匹配后 lastIndex: \${regex.lastIndex}\`);
  iteration++;
}

console.log("\\n循环结束，所有匹配已找到");`

export const matchAllExample = `const regex = /\\d+/g;
const str = "abc123def456";

// 使用 matchAll() - 更现代的方法
for (const match of str.matchAll(regex)) {
  console.log(match[0]);
}

// 对比传统的 exec() 循环
let match;
while ((match = regex.exec(str)) !== null) {
  console.log(match[0]);
}`

export const objectFromEntriesExample = `const entries = [['a', 1], ['b', 2]];
const obj = Object.fromEntries(entries); // { a: 1, b: 2 }`

export const objectEntriesExample = `const obj = { a: 1, b: 2 };
Object.entries(obj); // [['a', 1], ['b', 2]]`

export const objectHasOwnExample = `const obj = { a: 1 };
Object.hasOwn(obj, 'a'); // true
Object.hasOwn(obj, 'toString'); // false`

export const flatMapSyntaxExample = `var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
  // 返回新数组的元素
}[, thisArg])`

export const flatMapCompareExample = `var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]`

export const arrayFromSyntaxExample = 'Array.from(arrayLike[, mapFn[, thisArg]])'

export const trimExample = `var orig = '   foo  ';
console.log(orig.trim()); // 'foo'

// 另一个 trim() 例子，只从一边删除
var orig = 'foo    ';
console.log(orig.trim()); // 'foo'`

export const importMetaGlobExample = `import.meta.glob('../components/**/*.vue')
// import.meta.glob() 默认返回懒加载函数，每个匹配的文件对应一个 () => import('./xxx.vue') 形式的动态导入函数。
// 会让 Vite 在构建阶段扫描 src/components/** 目录下的所有 .vue 文件，为每个文件生成一个按需导入的函数。
// 返回结果是一个以文件相对路径为键、以懒加载函数为值的对象。`

export const lazyLoadRouteExample = `const moduleMap = {
  ...import.meta.glob('../views/**/*.vue'),
  ...import.meta.glob('../components/**/*.vue')
}

const lazyLoad = (relativePath) => {
  const loader = moduleMap[toGlobPath(relativePath)]
  if (!loader) {
    throw new Error(\`[router] 未找到对应的组件文件：\${relativePath}\`)
  }
  return loader
}

// 通过形如 lazyLoad 的函数返回对应的组件懒加载函数`

export const urlSearchParamsExample = `// 获取当前 URL 参数
const urlParams = new URLSearchParams(window.location.search);

// 获取单个参数
const id = urlParams.get('id');           // ?id=123 -> "123"
const name = urlParams.get('name');       // ?name=John -> "John"
const nonExistent = urlParams.get('key'); // 不存在返回 null

// 检查参数是否存在
const hasToken = urlParams.has('token');  // 返回 true/false

// 遍历所有参数
for (const [key, value] of urlParams.entries()) {
  console.log(\`\${key}: \${value}\`);
}

// 转换为对象
const params = Object.fromEntries(urlParams.entries());`

export const requestWhiteListExample = `// 接口白名单：无需 token 也允许访问
const requestWhiteList = [
  "/****",
];

const isWhiteRequest = requestWhiteList.some((url) => config.url.indexOf(url) > -1);

if (token) {
  config.headers.Authorization = token;
} else if (!isWhiteRequest) {
  // 白名单以外的接口仍然需要登录态
  ****
}`

export const regexpReplaceExample = `str.replace(RegExp, (_, match) => {})
// _ : 带有匹配符合的内容
// match : 纯内容，没有匹配符号

// 例如
let str = '#{答案}#'
const Reg = /\\#{([\\s\\S]*?)}\\#/gi;
str.replace(Reg, (_, match) => {
  console.log('_ ==> ', _) // #{答案}#
  console.log('match ==> ', match) // 答案
})`

export const tabMessageReceiverExample = `// winA
window.addEventListener('message', (event) => {
  console.log('event.data ==> ', event.data)
})
// event.data 子窗口传递的 message`

export const tabMessageSenderExample = `// WinB
if (window.opener) {
  window.opener.postMessage(message, targetOrigin, [transfer])
}
// message 要传递的数据，浏览器会自动序列化（无需手动 JSON.stringify）
// targetOrigin 目标窗口的源（协议 + 域名 + 端口），控制消息发送范围，核心安全参数 "任意源：*"`
