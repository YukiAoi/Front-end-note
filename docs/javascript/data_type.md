# 数据类型

分为两种：

1. 基本类型
2. 引用类型

## 基本类型

主要为：

- Number
- String
- Boolean
- Undefined
- Null
- Symbol

### Number

数值最常见的整数类型格式则为十进制，还可以设置八进制（零开头）、十六进制（0x 开头）

```js
let intNum = 55; // 10进制的55
let num1 = 070; // 8进制的56
let hexNum1 = 0xa; //16进制的10
```

浮点类型则在数值汇总必须包含小数点，还可通过科学计数法表示

```js
let floatNum1 = 1.1;
let floatNum2 = 0.1;
let floatNum3 = 0.1; // 有效，但不推荐
let floatNum = 3.125e7; // 等于 31250000
```

在 Number 类型中，存在一个特殊数值 NaN，意为“不是数值”，用于表示本来要返回数值的操作失败了（而不是抛出错误）

```js
console.log(0 / 0); // NaN
console.log(-0 / +0); // NaN
```

### Undefined

使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值

```js
let message;
console.log(message == undefined); // true
```

包含 undefined 值的变量跟未定义变量是有区别的

```js
let message; // 这个变量被声明了，只是值为 undefined

console.log(message); // "undefined"
console.log(age); // 没有声明过这个变量，报错
```

### String

字符串可以使用双引号（"）、单引号（'）或反引号（`）表示

```js
let firstName = "John";
let lastName = "Jacob";
let lastName = `Jingleheimerschmidt`;
```

字符串是不可变的，一旦创建，它们的值就不能变了

```js
let lang = "Java";
lang = lang + "Script"; // 先销毁再创建
```

### Null

null 值表示一个空对象指针，这也是给 typeof 传一个 null 会返回 "object" 的原因

```js
let car = null;
console.log(typeof car); // "object"
```

undefined 值是由 null 值派生而来

```js
console.log(null == undefined); // true
```

### Boolean

通过 Boolean 可以将其他类型的数据转化成布尔值
| 数据类型 | 转换为 true 的值 | 转换为 false 的值 |
| ------- | --------------- | ---------------- |
| String | 非空字符串 | "" |
| Number | 非零数值（包括无穷值） | 0 、 NaN |
| Object | 任意对象 | null |
| Undefined | N/A （不存在） | undefined |

### Symbol

symbol （符号）是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
console.log(genericSymbol == otherGenericSymbol); // false

let fooSymbol = Symbol("foo");
let otherFooSymbol = Symbol("foo");
console.log(fooSymbol == otherFooSymbol); // false
```

## 引用类型

- Object
- Array
- Function
- Date
- RegExp
- Map
- Set

### Object

创建 object 常用方式为对象字面量表示法，属性名可以是字符串或数值

```js
let person = {
  name: "Nicholas",
  age: 29,
  5: true,
};
```

### Array

JavaScript 数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。并且，数组也是动态大小的，会随着数据添加而自动增长

```js
let colors = ["red", 2, { age: 20 }];
colors.push(2);
```

### Function

函数实际上是对象，每个函数都是 Function 类型的实例，而 Function 也有属性和方法，跟其他引用类型一样

函数存在三种常见的表达方式：

- 函数声明

```js
function sum(num1, num2) {
  return num1 + num2;
}
```

- 函数表达式

```js
let sum = function (num1, num2) {
  return num1 + num2;
};
```

- 箭头函数

```js
let sum = (num1, num2) => {
  return num1 + num2;
};
```

## 存储区别

基本数据类型和引用数据类型存储在内存中的位置不同：

- 基本数据类型存储在栈中
- 引用类型的对象存储于堆中

### 小结

- 声明变量时不同的内存地址分配：
  - 基本类型的值存放在栈中，在栈中存放的是对应的值
  - 引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址
- 不同的类型数据导致赋值变量时的不同：
  - 简单类型赋值，是生成相同的值，两个对象对应不同的地址
  - 复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象

## 检测数据类型

### typeof

主要用于检测基本数据类型，用于判断一个引用类型是否属于某构造函数，还可以在继承关系中用来判断一个实例是否属于它的父类型

```js
console.log(typeof 1); // number
console.log(typeof true); // boolean
console.log(typeof "mc"); // string
console.log(typeof Symbol); // function
console.log(typeof function () {}); // function
console.log(typeof console.log()); // function
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof undefined); // undefined
```

### instanceof

主要用于检测引用数据类型

```js
console.log(1 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false
console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

### Object.prototype.toString.call()

用原型对象检测

```js
var toString = Object.prototype.toString;
console.log(toString.call(1)); //[object Number]
console.log(toString.call(true)); //[object Boolean]
console.log(toString.call("mc")); //[object String]
console.log(toString.call([])); //[object Array]
console.log(toString.call({})); //[object Object]
console.log(toString.call(function () {})); //[object Function]
console.log(toString.call(undefined)); //[object Undefined]
console.log(toString.call(null)); //[object Null]
```

### isXXX

1. Array.isArray()
2. Number.isNAN()
3. Number.isFinite()
