# typeof 和 instanceof

## typeof

主要用于检测基本数据类型

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

## instanceof

主要用于检测引用数据类型

```js
console.log(1 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false
console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

## 区别

- typeof 会返回一个变量的基本类型，instanceof 返回的是一个布尔值
- instanceof 可以准确地判断引用数据类型，但是不能正确判断基本数据类型
- typeof 可以判断基础数据类型（null 除外），但是不能判断引用数据类型（function 除外）

如果需要通用检测数据类型，可以采用 Object.prototype.toString，调用该方法，统一返回格式“[object Xxx]”的字符串

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
