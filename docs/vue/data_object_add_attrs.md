# vue2 中直接给对象添加属性页面不刷新

## 原理分析

vue2 是用过 Object.defineProperty 实现数据响应式

```js
const obj = {};
Object.defineProperty(obj, "foo", {
  get() {
    console.log(`get foo:${val}`);
    return val;
  },
  set(newVal) {
    if (newVal !== val) {
      console.log(`set foo:${newVal}`);
      val = newVal;
    }
  },
});
```

我们访问 foo 属性或者设置 foo 值的时候都能够触发 setter 与 getter，但是我们为 obj 添加新属性的时候，却无法触发事件属性的拦截

```js
obj.foo;
obj.foo = "new";
obj.bar = "新属性";
```

原因是 obj 的 foo 属性被设成了响应式数据，而 bar 是后面新增的属性，并没有通过 Object.defineProperty 设置成响应式数据

## 解决方案

- Vue.set()
- Object.assign()
- $forcecUpdated()

### Vue.set()

Vue.set( target, propertyName/index, value )
通过 Vue.set 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新

```js
// src\core\observer\index.js
function set (target: Array<any> | Object, key: any, val: any): any {
  ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

再次调用 defineReactive 方法，实现新增属性的响应式，内部还是通过 Object.defineProperty 实现属性拦截

```js
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}:${val}`);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set ${key}:${newVal}`);
        val = newVal;
      }
    },
  });
}
```

### Object.assign()

直接使用 Object.assign()添加到对象的新属性不会触发更新，应创建一个新的对象，合并原对象和混入对象的属性

```js
this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})
```

### $forceUpdate

强制更新（不推荐）

## Vue3

通过 proxy 来实现数据响应式，所以可以直接添加属性
