export const genericFunctionExample = `function logData<T>(data: T): T {
  console.log(data)
  return data
}

logData<number>(100)
logData<string>('hello')`

export const multipleGenericsExample = `function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2)
  return Date.now() % 2 ? data1 : data2
}

logData<number, string>(100, 'hello')
logData<string, boolean>('ok', false)`

export const genericInterfaceExample = `interface PersonInterface<T> {
  name: string,
  age: number,
  extraInfo: T
}

let p1: PersonInterface<string>
let p2: PersonInterface<number>

p1 = { name: '张三', age: 18, extraInfo: '一个好人' }
p2 = { name: '李四', age: 18, extraInfo: 250 }`

export const genericConstraintExample = `interface LengthInterface {
  length: number
}

// 约束规则是：传入的类型 T 必须具有 length 属性
function logPerson<T extends LengthInterface>(data: T): void {
  console.log(data.length)
}

logPerson<string>('hello')

// 报错：因为 number 不具备 length 属性
// logPerson<number>(100)`

export const genericClassExample = `class Person<T> {
  constructor(public name: string, public age: number, public extraInfo: T) {}

  speak() {
    console.log(\`我叫\${this.name}今年\${this.age}岁了\`)
    console.log(this.extraInfo)
  }
}

// 测试代码1
const p1 = new Person<number>("tom", 30, 250);

// 测试代码2
type JobInfo = {
  title: string;
  company: string;
}

const p2 = new Person<JobInfo>("tom", 30, { title: '研发总监', company: '发发发科技公司' });`

export const typeAliasExample = `type num = number;
let price: num
price = 100`

export const unionTypeExample = `type Status = number | string;
type Gender = '男' | '女';

function printStatus(status: Status) {
  console.log(status);
}

function logGender(str: Gender) {
  console.log(str);
}

printStatus(404);
printStatus('200');
printStatus('501');

logGender('男');
logGender('女');`

export const intersectionTypeExample = `// 面积
type Area = {
  height: number; // 高
  width: number; // 宽
};

// 地址
type Address = {
  num: number; // 楼号
  cell: number; // 单元号
  room: string; // 房间号
};

// 定义类型 House，且 House 是 Area 和 Address 组成的交叉类型
type House = Area & Address;

const house: House = {
  height: 180,
  width: 75,
  num: 6,
  cell: 3,
  room: '702'
};`

export const abstractPackageExample = `abstract class Package {
  constructor(public weight: number) {}

  // 抽象方法: 用来计算运费，不同类型包裹有不同的计算方式
  abstract calculate(): number

  // 通用方法: 打印包裹详情
  printPackage() {
    console.log(\`包裹重量为: \${this.weight}kg,运费为: \${this.calculate()}元\`);
  }
}`

export const standardPackageExample = `// 标准包裹
class StandardPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number // 每公斤的固定费率
  ) {
    super(weight)
  }

  // 实现抽象方法: 计算运费
  calculate(): number {
    return this.weight * this.unitPrice;
  }
}

// 创建标准包裹实例
const s1 = new StandardPackage(10, 5)
s1.printPackage()`

export const expressPackageExample = `class ExpressPackage extends Package {
  constructor(
    private weight: number, // 每公斤的固定费率（快速包裹更高）
    private unitPrice: number,
    private additional: number // 超出 10kg 以后的附加费
  ) {
    super(weight)
  }

  // 实现抽象方法: 计算运费
  calculate(): number {
    if (this.weight > 10) {
      // 超出 10kg 的部分，每公斤多收 additional 对应的价格
      return 10 * this.unitPrice + (this.weight - 10) * this.additional
    } else {
      return this.weight * this.unitPrice;
    }
  }
}

// 创建特快包裹实例
const e1 = new ExpressPackage(13, 8, 2)
e1.printPackage()`

export const classInterfaceExample = `// PersonInterface 接口，用于限制 Person 类的格式
interface PersonInterface {
  name: string
  age: number
  speak(n: number): void
}

// 定义一个类 Person，实现 PersonInterface 接口
class Person implements PersonInterface {
  constructor(
    public name: string,
    public age: number
  ) {}

  // 实现接口中的 speak 方法
  speak(n: number): void {
    for (let i = 0; i < n; i++) {
      console.log(\`你好，我叫\${this.name}，我的年龄是\${this.age}\`)
    }
  }
}

const p1 = new Person('tom', 18)
p1.speak(3)`

export const objectInterfaceExample = `interface UserInterface {
  name: string
  readonly gender: string // 只读属性
  age?: number // 可选属性
  run: (n: number) => void
}

const user: UserInterface = {
  name: '张三',
  gender: '男',
  age: 18,
  run(n) {
    console.log(\`奔跑了\${n}米\`)
  }
}`

export const functionInterfaceExample = `// 定义函数结构
interface CountInterface {
  (a: number, b: number): number
}

const count: CountInterface = (x, y) => {
  return x + y
}`

export const interfaceExtendsExample = `interface PersonInterface {
  name: string // 姓名
  age: number // 年龄
}

interface StudentInterface extends PersonInterface {
  grade: string // 年级
}

const stu: StudentInterface = {
  name: '张三',
  age: 25,
  grade: '高三'
}`

export const interfaceMergeExample = `// PersonInterface 接口
interface PersonInterface {
  name: string
  age: number
}

// 给 PersonInterface 接口添加新属性
interface PersonInterface {
  speak(): void
}

class Person implements PersonInterface {
  constructor(
    public name: string,
    public age: number
  ) {}

  speak() {
    console.log('你好!我是老师:', this.name)
  }
}`

export const interfaceTypeObjectExample = `// 使用 interface 定义 Person 对象
interface PersonInterface {
  name: string
  age: number
  speak(): void
}

// 使用 type 定义 Person 对象
type PersonType = {
  name: string
  age: number
  speak(): void
}

let person: PersonType = {
  name: '张三',
  age: 18,
  speak() {
    console.log(\`我叫:\${this.name},年龄:\${this.age}\`)
  }
}`

export const interfaceInheritanceMergeExample = `interface PersonInterface {
  name: string // 姓名
  age: number // 年龄
}

interface PersonInterface {
  speak: () => void
}

interface StudentInterface extends PersonInterface {
  grade: string // 年级
}

const student: StudentInterface = {
  name: '李四',
  age: 18,
  grade: '高二',
  speak() {
    console.log(this.name, this.age, this.grade)
  }
}`

export const typeIntersectionInheritanceExample = `// 使用 type 定义 Person 类型，并通过交叉类型实现属性的合并
type PersonType = {
  name: string // 姓名
  age: number // 年龄
} & {
  speak: () => void
}

// 使用 type 定义 Student 类型，并通过交叉类型继承 PersonType
type StudentType = PersonType & {
  grade: string // 年级
}

const student: StudentType = {
  name: '李四',
  age: 18,
  grade: '高二',
  speak() {
    console.log(this.name, this.age, this.grade)
  }
}`

export const multipleInterfacesExample = `interface FlyInterface {
  fly(): void
}

interface SwimInterface {
  swim(): void
}

class Duck implements FlyInterface, SwimInterface {
  fly(): void {
    console.log('鸭子可以飞')
  }

  swim(): void {
    console.log('鸭子可以游泳')
  }
}

const duck = new Duck()
duck.fly()
duck.swim()`
