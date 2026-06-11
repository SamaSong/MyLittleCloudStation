export const typeDeclarationExample = `let a: string  // 变量 a 只能存储字符串
let b: number  // 变量 b 只能存储数值
let c: boolean // 变量 c 只能存储布尔值

a = 'hello'
a = 100  // 警告: 不能将类型 “number” 分配给类型 “string”

b = 666
b = '你好' // 警告: 不能将类型 "string" 分配给类型 "number"

c = true
c = 666  // 警告: 不能将类型 “number” 分配给类型 “boolean”

// 参数 x 必须是数字，参数 y 也必须是数字，函数返回值也必须是数字
function demo(x: number, y: number): number {
  return x + y
}

demo(100, 200)
demo(100, '200') // 警告: 类型 “string" 的参数不能赋给类型 "number" 的参数
demo(100, 200, 300) // 警告: 应有 2 个参数, 但获得 3 个
demo(100) // 警告: 应有 2 个参数，但获得 1 个`

export const literalTypeExample = `let a: '你好' // a 的值只能为字符串 "你好"
let b: 100 // b 的值只能为数字 100

a = '欢迎' // 警告: 不能将类型 "欢迎" 分配给类型 "你好"
b = 200 // 警告: 不能将类型 "200" 分配给类型 "100"`

export const typeInferenceExample = `let d = -99 // TypeScript 会推断出变量 d 的类型是数字
d = false // 警告: 不能将类型 "boolean" 分配给类型 "number"`
