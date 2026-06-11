export const unknownAssignExample = `// 设置 a 的类型为 unknown
let a: unknown

// 以下对 a 的赋值，均符合规范
a = 100
a = false
a = '你好'

// 设置 x 的数据类型为 string
let x: string
x = a // 警告: 不能将类型 "unknown" 分配给类型 "string"`

export const unknownNarrowExample = `// 设置 a 的类型为 unknown
let a: unknown
a = 'hello'

// 第一种方式: 加类型判断
if (typeof a === 'string') {
  x = a
  console.log(x)
}

// 第二种方式: 加断言
x = a as string

// 第三种方式: 加断言
x = <string>a`

export const unknownPropertyExample = `let str1: string
str1 = 'hello'
str1.toUpperCase() // 无警告

let str2: any
str2 = 'hello'
str2.toUpperCase() // 无警告

let str3: unknown
str3 = 'hello'
str3.toUpperCase() // 警告: "str3" 的类型为 "未知"

// 使用断言强制指定 str3 的类型为 string
(str3 as string).toUpperCase() // 无警告`

export const neverVariableExample = `/* 指定 a 的类型为 never, 那就意味着 a 以后不能存任何的数据了 */
let a: never

// 以下对 a 的所有赋值都会有警告
a = 1
a = true
a = undefined
a = null`

export const neverInferenceExample = `// 指定 a 的类型为 string
let a: string
a = 'hello'

if (typeof a === 'string') {
  console.log(a.toUpperCase())
} else {
  console.log(a) // TypeScript 会推断出此处的 a 是 never，因为没有任何一个值符合此处的逻辑
}`

export const neverReturnExample = `// 限制 throwError 函数不需要有任何返回值，任何值都不行，像 undefined、null 都不行
function throwError(str: string): never {
  throw new Error('程序异常退出:' + str)
}`

export const voidFunctionExample = `function logMessage(msg: string): void {
  console.log(msg)
}

logMessage('你好')`

export const voidReturnExample = `// 无警告
function logMessage(msg: string): void {
  console.log(msg)
}

// 无警告
function logMessage(msg: string): void {
  console.log(msg)
  return;
}

// 无警告
function logMessage(msg: string): void {
  console.log(msg)
  return undefined;
}`

export const voidVsUndefinedExample = `function logMessage(msg: string): void {
  console.log(msg)
}

let result = logMessage('你好')

if (result) { // 此行报错：无法测试 "void" 类型的表达式的真实性
  console.log('logMessage有返回值')
}

function logMessage(msg: string): undefined {
  console.log(msg)
}

result = logMessage('你好')

if (result) { // 此行无警告
  console.log('logMessage有返回值')
}`

export const objectLowercaseExample = `let a: object // a 的值可以是任何【非原始类型】，包括: 对象、函数、数组等

// 以下代码，是将【非原始类型】赋给 a，所以均符合要求
a = {}
a = { name: '张三' }
a = [1, 3, 5, 7, 9]
a = function() {}
a = new String('123')

class Person {}
a = new Person()

// 以下代码，是将【原始类型】赋给 a，有警告
a = 1 // 警告: 不能将类型 "number" 分配给类型 "object"
a = true // 警告: 不能将类型 "boolean" 分配给类型 "object"
a = '你好' // 警告: 不能将类型 "string" 分配给类型 "object"
a = null // 警告: 不能将类型 "null" 分配给类型 "object"
a = undefined // 警告: 不能将类型 "undefined" 分配给类型 "object"`

export const objectUppercaseExample = `let b: Object // b 的值必须是 Object 的实例对象（除去 undefined 和 null 的任何值）

// 以下代码，均无警告，因为给 b 赋的值，都是 Object 的实例对象
b = {}
b = { name: '张三' }
b = [1, 3, 5, 7, 9]
b = function() {}
b = new String('123')

class Person {}
b = new Person()
b = 1 // 1 不是 Object 的实例对象，但其包装对象是 Object 的实例
b = true // true 不是 Object 的实例对象，但其包装对象是 Object 的实例
b = '你好' // "你好" 不是 Object 的实例对象，但其包装对象是 Object 的实例

// 以下代码均有警告
b = null // 警告: 不能将类型 "null" 分配给类型 "Object"
b = undefined // 警告: 不能将类型 "undefined" 分配给类型 "Object"`

export const objectShapeExample = `// 限制 person1 对象必须有 name 属性，age 为可选属性
let person1: { name: string, age?: number }

// 含义同上，也能用分号做分隔
let person2: { name: string; age?: number }

// 含义同上，也能用换行做分隔
let person3: {
  name: string
  age?: number  // 加 ? 代表可以为空
}

// 如下赋值均可以
person1 = { name: '李四', age: 18 }
person2 = { name: '张三' }
person3 = { name: '王五' }

// 如下赋值不合法，因为 person3 的类型限制中，没有对 gender 属性的说明
person3 = { name: '王五', gender: '男' }`

export const indexSignatureExample = `// 限制 person 对象必须有 name 属性，可选 age 属性但值必须是数字，同时可以有任意数量、任意类型的其他属性
let person: {
  name: string
  age?: number
  [key: string]: any // 索引签名，完全可以不用 key 这个单词，换成其他的也可以（另一种常用写法：index）
}

// 赋值合法
person = {
  name: '张三',
  age: 18,
  gender: '男'
}`

export const functionTypeExample = `let count: (a: number, b: number) => number
count = function (x, y) { return x + y }`

export const arrayTypeExample = `let arr1: string[]
let arr2: Array<string>

arr1 = ['a', 'b', 'c']
arr2 = ['hello', 'world']`

export const tupleExample = `// 第一个元素必须是 string 类型，第二个元素必须是 number 类型。
let arr1: [string, number]

// 第一个元素必须是 number 类型，第二个元素是可选的，如果存在，必须是 boolean 类型。
let arr2: [number, boolean?]

// 第一个元素必须是 number 类型，后面的元素可以是任意数量的 string 类型
let arr3: [number, ...string[]]

// 可以赋值
arr1 = ['hello', 123]
arr2 = [100, false]
arr2 = [200]
arr3 = [100, 'hello', 'world']
arr3 = [100]

// 不可以赋值，arr1 声明时是两个元素，赋值的是三个
arr1 = ['hello', 123, false]`

export const enumProblemExample = `function walk(str: string) {
  if (str === 'up') {
    console.log("向[上]走");
  } else if (str === 'down') {
    console.log("向[下]走");
  } else if (str === 'left') {
    console.log("向[左]走");
  } else if (str === 'right') {
    console.log("向[右]走");
  } else {
    console.log("未知方向");
  }
}

walk('up');
walk('down');
walk('left');
walk('right');`

export const numberEnumExample = `// 定义一个描述【上下左右】方向的枚举 Direction
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction); // 打印 Direction 会看到如下内容
/*
{
  0: 'Up',
  1: 'Down',
  2: 'Left',
  3: 'Right',
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
*/

// 反向映射
console.log(Direction.Up);
console.log(Direction[0]);`

export const enumInitialValueExample = `enum Direction {
  Up = 6,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // 输出: 6
console.log(Direction.Down); // 输出: 7`

export const enumWalkExample = `enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function walk(n: Direction) {
  if (n === Direction.Up) {
    console.log("向【上】走");
  } else if (n === Direction.Down) {
    console.log("向【下】走");
  } else if (n === Direction.Left) {
    console.log("向【左】走");
  } else if (n === Direction.Right) {
    console.log("向【右】走");
  } else {
    console.log("未知方向");
  }
}

walk(Direction.Up)
walk(Direction.Down)`

export const stringEnumExample = `enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

let dir: Direction = Direction.Up;
console.log(dir); // 输出: "up"`

export const voidStrictReturnExample = `function demo(): void {
  // 返回 undefined 合法
  return undefined
  // 以下返回均不合法
  return 100
  return false
  return null
  return []
}

demo()`

export const voidCallbackReturnExample = `type LogFunc = () => void  // LogFunc 的类型是一个函数，该函数不接受任何参数，并且其返回值是 void 类型的

const f1: LogFunc = () => {
  return 100; // 允许返回非空值
};

const f2: LogFunc = () => 200; // 允许返回非空值

const f3: LogFunc = function () {
  return 300; // 允许返回非空值
};`

export const voidCallbackAssignExample = `let PrintData: () => void;

PrintData = () => {
  return 100; // 允许返回非空值
};

PrintData = () => 200; // 允许返回非空值

PrintData = function () {
  return 300; // 允许返回非空值
};`

export const forEachVoidExample = `const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));  // 箭头函数的简写形式。此时，dst.push(el) 会被作为返回值`
