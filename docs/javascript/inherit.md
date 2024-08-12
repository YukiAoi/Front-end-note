# 继承

## 是什么

继承是一种机制，它允许一个类（对象）基于另一个类（对象）来创建，从而使新类（子类）继承父类的属性和方法

这种机制能够促进代码复用和简化代码结构

## 实现方式

JavaScript 常见的继承方式：

- 原型链继承
- 构造函数继承（借助 call）
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 原型链继承

```js
function Parent() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}
function Child() {
  this.type = "child2";
}
Child1.prototype = new Parent();
console.log(new Child());
```

但是这种方式有问题，因为两个实例使用的是同一个原型对象，内存空间是共享的，所以属性会跟着改变

```js
var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s1.play, s2.play); // [1,2,3,4]
```

### 构造函数继承

借助 call 调用 Parent 函数

```js
function Parent() {
  this.name = "parent1";
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent1.call(this);
  this.type = "child";
}

let child = new Child();
console.log(child); // 没问题
console.log(child.getName()); // 会报错
```

相比原型链继承，父类的引用属性不会被共享，但是只能继承父类的实例属性和方法，不能继承原型属性或者方法

### 组合继承

将原型链和构造函数结合起来

```js
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};
function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = "child3";
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```

但是 parent3 执行了两次，有多余的性能开销

### 原型式继承

借助 Object.create 方法实现普通对象的继承

```js
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name); // parent4
console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]
```

Object.create 方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

### 寄生式继承

在原型式继承上进行优化，利用这个浅拷贝的能力再进行增强，添加一些方法

```js
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person5 = clone(parent5);

console.log(person5.getName()); // parent5
console.log(person5.getFriends()); // ["p1", "p2", "p3"]
```

因为是浅拷贝，一样会被篡改

### 寄生组合式继承

借助解决普通对象的继承问题的 Object.create 方法，在前面几种继承方式的优缺点基础上进行改造

```js
function clone(parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent6() {
  this.name = "parent6";
  this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
  return this.name;
};
function Child6() {
  Parent6.call(this);
  this.friends = "child5";
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
  return this.friends;
};

let person6 = new Child6();
console.log(person6); //{friends:"child5",name:"child5",play:[1,2,3],__proto__:Parent6}
console.log(person6.getName()); // parent6
console.log(person6.getFriends()); // child5
```

ES6 的 extends 实际采用的也是寄生组合继承方式

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log("Person:", this.name);
  };
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name);
    this.age = age;
  }
}
const asuna = new Gamer("Asuna", 20);
asuna.getName(); // 成功访问到父类的方法
```

## 总结

通过 Object.create 来划分不同的继承方式，最后的寄生式组合继承方式是通过组合继承改造之后的最优继承方式，而 extends 的语法糖和寄生组合继承的方式基本类似
