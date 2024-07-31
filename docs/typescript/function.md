# 函数

## 用法

没有提供函数实现的情况下，有两种声明函数类型的方式：

```ts
// 当存在函数重载时，只能使用方式一
// 方式一
type LongHand = {
  (a: number): number;
};

// 方式二
type ShortHand = (a: number) => number;
```

### 可选参数

```ts
const add = (a: number, b?: number) => a + (b ? b : 0);
```

### 剩余参数

与 JavaScript 的语法类似，需要用 ... 来表示剩余参数

```ts
const add = (a: number, ...rest: number[]) => rest.reduce((a, b) => a + b, a);
```

### 函数重载

允许创建数项名称相同但输入输出类型或个数不同的子程序，它可以简单地称为一个单独功能可以执行多项任务的能力

必须要把精确的定义放在前面，最后函数实现时，需要使用 |操作符或者?操作符，把所有可能的输入类型全部包含进去，用于具体实现

```ts
// 上边是声明
function add(arg1: string, arg2: string): string;
function add(arg1: number, arg2: number): number;
// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字

// 下边是实现
function add(arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === "string" && typeof arg2 === "string") {
    return arg1 + arg2;
  } else if (typeof arg1 === "number" && typeof arg2 === "number") {
    return arg1 + arg2;
  }
}
```
