# TypeScript

## 是什么

TypeScript 是 JavaScript 的类型的超集，支持 ES6 语法，支持面向对象编程的概念，如类、接口、继承、泛型等

## 特性

- 类型批注和编译时类型检查：在编译时批注变量类型
- 类型推断：ts 中没有批注变量类型会自动推断变量的类型
- 类型擦除：在编译过程中批注的内容和接口会在运行时利用工具擦除
- 接口：ts 中用接口来定义对象类型
- 枚举：用于取值被限定在一定范围内的场景
- Mixin：可以接受任意类型的值
- 泛型编程：写代码时使用一些以后才指定的类型
- 命名空间：名字只在该区域内有效，其他区域可重复使用该名字而不冲突
- 元组：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组

### 类型批注

通过类型批注提供在编译时启动类型检查的静态类型

```ts
function Add(left: number, right: number): number {
  return left + right;
}
```

### 类型推断

当类型没有给出时，TypeScript 编译器利用类型推断来推断类型，如果缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型

```ts
let str = "string";
```

### 接口

接口简单来说就是用来描述对象的类型

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};
```

## 区别

- TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法
- TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译
- TypeScript 文件的后缀名 .ts （.ts，.tsx，.dts），JavaScript 文件是 .js
- 在编写 TypeScript 的文件的时候就会自动编译成 js 文件
