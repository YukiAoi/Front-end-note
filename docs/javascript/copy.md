# 深拷贝与浅拷贝

## 浅拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

```js
function shallowClone(obj) {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}
```

在 JavaScript 中，浅拷贝的方法有：

- Object.assign
- Array.prototype.slice()，Array.prototype.concat()
- 使用拓展运算符实现的复制

### Object.assign

```js
var obj = {
  age: 18,
  nature: ["smart", "good"],
  names: {
    name1: "fx",
    name2: "xka",
  },
  love: function () {
    console.log("fx is a great girl");
  },
};
var newObj = Object.assign({}, fxObj);
```

### slice()

```js
const fxArr = ["One", "Two", "Three"];
const fxArrs = fxArr.slice(0);
fxArrs[1] = "love";
console.log(fxArr); // ["One", "Two", "Three"]
console.log(fxArrs); // ["One", "love", "Three"]
```

### concat()

```js
const fxArr = ["One", "Two", "Three"];
const fxArrs = fxArr.concat();
fxArrs[1] = "love";
console.log(fxArr); // ["One", "Two", "Three"]
console.log(fxArrs); // ["One", "love", "Three"]
```

### 拓展运算符

```js
const fxArr = ["One", "Two", "Three"];
const fxArrs = [...fxArr];
fxArrs[1] = "love";
console.log(fxArr); // ["One", "Two", "Three"]
console.log(fxArrs); // ["One", "love", "Three"]
```

## 深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

- \_.cloneDeep()
- jQuery.extend()
- JSON.stringify()，JSON.parse()
- 手写循环递归

### \_.cloneDeep()

```js
const _ = require("lodash");
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

### jQuery.extend()

```js
const $ = require("jquery");
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
const obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

### JSON.stringify()，JSON.parse()

```js
const obj2 = JSON.parse(JSON.stringify(obj1));
```

但是这种方式存在弊端，会忽略 undefined、symbol 和函数

```js
const obj = {
  name: "A",
  name1: undefined,
  name3: function () {},
  name4: Symbol("A"),
};
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

### 循环递归

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

## 区别

浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象

```js
// 浅拷贝
const obj1 = {
  name: "init",
  arr: [1, [2, 3], 4],
};
const obj3 = shallowClone(obj1); // 一个浅拷贝方法
obj3.name = "update";
obj3.arr[1] = [5, 6, 7]; // 新旧对象还是共享同一块内存

console.log("obj1", obj1); // obj1 { name: 'init',  arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log("obj3", obj3); // obj3 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

```js
// 深拷贝
const obj1 = {
  name: "init",
  arr: [1, [2, 3], 4],
};
const obj4 = deepClone(obj1); // 一个深拷贝方法
obj4.name = "update";
obj4.arr[1] = [5, 6, 7]; // 新对象跟原对象不共享内存

console.log("obj1", obj1); // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log("obj4", obj4); // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

### 小结

前提为拷贝类型为引用类型的情况下：

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址
