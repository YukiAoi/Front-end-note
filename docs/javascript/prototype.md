# 原型与原型链

## 原型

原型（prototype）是实现继承和共享方法的机制。每个 JavaScript 对象都有一个与之关联的原型对象，这个原型对象可以为该对象提供共享的属性和方法。

## 原型链

如果在一个对象上查找某个属性或方法，而这个对象没有这个属性或方法，那么 JavaScript 会继续查找该对象的原型，直到找到属性或达到原型链的顶端（通常是 Object.prototype），如果仍然没有找到，则返回 undefined。

```js
function Person(name) {
  this.name = name;
  this.age = 18;
  this.sayName = function () {
    console.log(this.name);
  };
}
// 第二步 创建实例
var person = new Person("person");
```

- 构造函数 Person 存在原型对象 Person.prototype
- 构造函数生成实例对象 person，person 的\_\_proto\_\_指向构造函数 Person 原型对象
- Person.prototype.\_\_proto\_\_ 指向内置对象，因为 Person.prototype 是个对象，默认是由 Object 函数作为类创建的，而 Object.prototype 为内置对象
- Person.\_\_proto\_\_ 指向内置匿名函数 anonymous，因为 Person 是个函数对象，默认由 Function 作为类创建
- Function.prototype 和 Function.\_\_proto\_\_同时指向内置匿名函数 anonymous，这样原型链的终点就是 null

## 总结

\_\_proto\_\_作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的

![prototype-原型链](../assets/image/prototype-%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

每个对象的\_\_proto\_\_都指向它的构造函数的原型对象 prototype

```js
person1.__proto__ === Person.prototype;
```

构造函数是一个函数对象，是通过 Function 构造器产生的

```js
Person.__proto__ === Function.prototype;
```

原型对象本身是一个普通对象，而普通对象的构造函数都是 Object

```js
Person.prototype.__proto__ === Object.prototype;
```

所有的构造器都是函数对象，函数对象都是 Function 构造产生的

```js
Object.__proto__ === Function.prototype;
```

Object 的原型对象也有\_\_proto\_\_属性指向 null，null 是原型链的顶端

```js
Object.prototype.__proto__ === null;
```
