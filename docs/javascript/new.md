# new

## 是什么

new 操作符用于创建一个给定构造函数的实例对象：

- new 通过构造函数创建出来的实例可以访问到构造函数中的属性
- new 通过构造函数创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）

## 流程

new 主要做了以下工作：

- 创建一个新的对象 obj
- 将对象与构建函数通过原型链连接起来
- 将构建函数中的 this 绑定到新建的对象 obj 上
- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

## 实现一个

```js
function mynew(Func, ...args) {
  // 1.创建一个新对象
  const obj = {};
  // 2.新对象原型指向构造函数原型对象
  obj.__proto__ = Func.prototype;
  // 3.将构建函数的this指向新对象
  let result = Func.apply(obj, args);
  // 4.根据返回值判断
  return result instanceof Object ? result : obj;
}
```
