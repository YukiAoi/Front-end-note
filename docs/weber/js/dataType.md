## 数据类型

### 基本数据类型

在内存中占据固定大小，保存在栈内存中
1. Number
1. String
1. Boolean
1. Symbol
1. Null
1. Undefined

### 引用数据类型

保存在堆内存中，栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址
1. Array
1. Object
1. Function
1. Date
1. RegExp

### Symbol

使用Symbol来作为对象属性名(key)，利用该特性，把一些不需要对外操作和访问的属性使用Symbol来定义

### BigInt

由于在Number与BigInt之间进行转换会损失精度，因而建议仅在值可能大于253时使用BigInt类型，并且不在两种类型之间进行相互转换

### 检测数据类型

#### typeof

主要用于检测基本数据类型
用于判断一个引用类型是否属于某构造函数
还可以在继承关系中用来判断一个实例是否属于它的父类型
```js
console.log(typeof 1);               // number
console.log(typeof true);            // boolean
console.log(typeof 'mc');            // string
console.log(typeof Symbol)           // function
console.log(typeof function(){});    // function
console.log(typeof console.log());   // function
console.log(typeof []);              // object 
console.log(typeof {});              // object
console.log(typeof null);            // object
console.log(typeof undefined);       // undefined
```

#### instanceof

主要用于检测引用数据类型
```js
console.log(1 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

#### Object.prototype.toString.call()

建议封装后再使用
```js
var toString = Object.prototype.toString;
console.log(toString.call(1));      //[object Number]
console.log(toString.call(true));   //[object Boolean]
console.log(toString.call('mc'));   //[object String]
console.log(toString.call([]));     //[object Array]
console.log(toString.call({}));     //[object Object]
console.log(toString.call(function(){})); //[object Function]
console.log(toString.call(undefined));  //[object Undefined]
console.log(toString.call(null)); //[object Null]
```

#### isXXX

1. isArray
1. isNAN
1. isFinite