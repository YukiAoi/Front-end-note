## 深浅拷贝

### 深拷贝

新开一个堆，两个对象对应两个不同的引用地址

#### 深拷贝实现

1. 手动复制
```js
let m = { a: 10, b: 20 }
let n = { a:m.a, b:m.b }
m.a = 15
console.log(n.a)    //10
```
2. 对象只有一层的话也可以使用`Object.assign()`
3. `JSON.parse()`加`JSON.stringify`（不适用于function）
4. 递归拷贝
```js
function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
var str = {};
var obj = { a: {a: "hello", b: 21} };
deepClone(obj, str);
console.log(str.a);
```
5. `Object.create()`

### 浅拷贝

拷贝的是对象的引用地址

#### 浅拷贝实现
1. 直接赋值
```js
let m = { a: 10, b: 20 }
let n = m
m.a = 15
console.log(n.a)    //15
```
2. `Object.assign()`
3. 扩展运算符`...`
4. `Array.prototype.concat()`
5. `Array.prototype.slice()`