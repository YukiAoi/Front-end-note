## 变量声明

### var

1. 没有作用域
1. 有变量提升，所以可以先使用，后声明
1. 同一作用域中可以重复声明变量

### let
1. 有作用域
1. 没有变量提升
1. 同一作用域中不能重复声明变量
1. 会产生`暂时性死区`

### const
1. 有作用域
1. 没有变量提升
1. 同一作用域中不能重复声明变量
1. 声明后就要赋值，并且声明的基本数据类型不能修改
1. 会产生`暂时性死区`

### 暂时性死区

```js
// var
console.log(a)  //undefined
var a

//let和const
console.log(a)  // ReferenceError: a is not defined
let a
const a = 1

// 因此使用typeof也有风险
console.log(typeof a)  //undefined
let a
```