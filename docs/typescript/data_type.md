# 数据类型

## 有哪些

typescript 的数据类型主要有：

- boolean（布尔类型）
- number（数字类型）
- string（字符串类型）
- array（数组类型）
- tuple（元组类型）
- enum（枚举类型）
- any（任意类型）
- null 和 undefined
- void
- never
- object

### boolean

```ts
let flag: boolean = true;
// flag = 123; // 错误
flag = false; //正确
```

### number

```ts
let num: number = 123;
// num = '456'; // 错误
num = 456; //正确

let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
```

### string

```ts
let str:string = "'this is ts'";
str = 'test';

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }
```

### array

有两种写法

```ts
let arr: string[] = ["12", "23"];
arr = ["45", "56"];

let arr2: Array<number> = [1, 2];
arr2 = ["45", "56"];
```

### tuple

元祖类型，表示一个已知元素数量和类型的数组，各元素的类型不必相同

赋值的类型、位置、个数需要和定义（生明）的类型、位置、个数一致

```ts
let tupleArr: [number, string, boolean];
tupleArr = [12, "34", true];
typleArr = [12, "34"]; // warning
```

### enum

枚举类型，用于定义一组命名常量

```ts
enum EnumData {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

console.log(EnumData[0]); // 输出: "RED"
console.log(Direction["RED"]); // 输出: 0
```

### any

使用 any 类型允许被赋值为任意类型，甚至可以调用其属性、方法

```ts
let num: any = 123;
num = "str";
num = true;

let arrayList: any[] = [1, false, "fine"];
arrayList[1] = 100;
```

### null 和 和 undefined

默认情况下，null 和 undefined 是所有类型的子类型。这意味着可以将它们赋值给任何类型的变量。但在开启 --strictNullChecks 编译选项后，null 和 undefined 只能赋值给 void 或它们各自的类型，或显式地包括它们的联合类型

```ts
// 在 --strictNullChecks 关闭时
let z: number;
z = null; // 正常
z = undefined; // 正常

// 在 --strictNullChecks 开启时
let c: number;
c = null; // 错误
c = undefined; // 错误

let a: number | null;
a = null; // 正常
a = 5; // 正常

let b: number | undefined;
b = undefined; // 正常
b = 5; // 正常
```

### void

用于标识方法返回值的类型，表示该方法没有返回值

```ts
function hello(): void {
  alert("Hello Runoob");
}
```

### never

never 是其他类型 （包括 null 和 undefined）的子类型，可以赋值给任何类型，代表从不会出现的值

但是没有类型是 never 的子类型，这意味着声明 never 的变量只能被 never 类型所赋值

一般用来指定那些总是会抛出异常、无限循环的方法

```ts
// warning
let a: never;
a = 123;

a = (() => {
  throw new Error("错误");
})();

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```

### object

```ts
let obj: object;
obj = { name: "Wang", age: 25 };
```
