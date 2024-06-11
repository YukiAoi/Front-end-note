# 为什么 data 是一个函数而不是一个对象

## 实例和组件定义 data 的区别

vue 实例定义 data 可以是对象也可以是函数，但是组件定义 data 只能是函数

## 组件中 data 定义为函数与对象的区别

如果定义为对象，会因为共用同一个内存地址，污染其他组件的 data。但是定义为函数，就能避免这个问题

## 原理分析

vue 初始化 data 的代码，data 的定义可以是函数也可以是对象

```js
// /vue-dev/src/core/instance/state.js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
    ...
}
```

组件在创建的时候，会进行选项的合并,自定义组件会进入 mergeOptions 进行选项合并

```js
Vue.prototype._init = function (options?: Object) {
    ...
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    ...
  }
```

定义 data 会进行数据校验，这时候 vm 实例为 undefined，进入 if 判断，若 0data 类型不是 function，则出现警告提示

```js
// /vue-dev/src/core/instance/init.js
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      process.env.NODE_ENV !== "production" &&
        warn(
          'The "data" option should be a function ' +
            "that returns a per-instance value in component " +
            "definitions.",
          vm
        );

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
```
