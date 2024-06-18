# mixin

## 是什么

本质其实就是一个 js 对象，它可以包含我们组件中任意功能选项，如 data、components、methods、created、computed 等等

## 局部混入

定义一个 mixin 对象，有组件 options 的 data、methods 属性

```js
const myMixin = {
  data(){
    return{
      str:'mixin'
    }
  }
  methods: {
    hello () {
      console.log(`console.log(${this.str})`)
    }
  }
}
```

组件通过 mixins 属性调用 mixin 对象

```vue
<script>
import myMixin from "./mixins.js";
export default {
  mixins: [myMixin],
};
</script>
```

## 全局混入

通过 Vue.mixin()进行全局混入

```js
Vue.mixin({
  created: function () {
    console.log("全局混入");
  },
});
```

## 注意事项

如果组件存在与 mixin 对象相同的选项，mixin 的会被覆盖。但是如果是生命周期钩子，会合并为数组，先执行 mixin 的，再执行组件的

## 使用场景

在不同组件中遇到的相同代码，就可以使用 mixin 进行混入

## 源码分析

```js
// /src/core/global-api/mixin.js
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
```

```js
// /src/core/util/options.js
// 调用mergeOptions方法
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (child.mixins) {
    // 判断有没有mixin 也就是mixin里面挂mixin的情况 有的话递归进行合并
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }

  const options = {};
  let key;
  for (key in parent) {
    mergeField(key); // 先遍历parent的key 调对应的strats[XXX]方法进行合并
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      // 如果parent已经处理过某个key 就不处理了
      mergeField(key); // 处理child中的key 也就parent中没有处理过的key
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key); // 根据不同类型的options调用strats中不同的方法进行合并
  }
  return options;
}
```

- 优先递归处理 mixins
- 先遍历合并 parent 中的 key，调用 mergeField 方法进行合并，然后保存在变量 options
- 再遍历 child，合并补上 parent 中没有的 key，调用 mergeField 方法进行合并，保存在变量 options
- 通过 mergeField 函数进行了合并

Vue 的几种类型的合并策略:

- 替换型
- 合并型
- 队列型
- 叠加型

### 替换型

替换型合并有 props、methods、inject、computed

```js
// 同名的 props、methods、inject、computed 会被后来者代替
strats.props =
  strats.methods =
  strats.inject =
  strats.computed =
    function (
      parentVal: ?Object,
      childVal: ?Object,
      vm?: Component,
      key: string
    ): ?Object {
      if (!parentVal) return childVal; // 如果parentVal没有值，直接返回childVal
      const ret = Object.create(null); // 创建一个第三方对象 ret
      extend(ret, parentVal); // extend方法实际是把parentVal的属性复制到ret中
      if (childVal) extend(ret, childVal); // 把childVal的属性复制到ret中
      return ret;
    };
strats.provide = mergeDataOrFn;
```

### 合并型

合并型合并有 data

```js
// mergeData 函数遍历了要合并的 data 的所有属性，然后根据不同情况进行合并
// - 当目标 data 对象不包含当前属性时，调用 set 方法进行合并（set 方法其实就是一些合并重新赋值的方法）
// - 当目标 data 对象包含当前属性并且当前值为纯对象时，递归合并当前对象值，这样做是为了防止对象存在新增属性
strats.data = function (parentVal, childVal, vm) {
  return mergeDataOrFn(parentVal, childVal, vm);
};

function mergeDataOrFn(parentVal, childVal, vm) {
  return function mergedInstanceDataFn() {
    var childData = childVal.call(vm, vm); // 执行data挂的函数得到对象
    var parentData = parentVal.call(vm, vm);
    if (childData) {
      return mergeData(childData, parentData); // 将2个对象进行合并
    } else {
      return parentData; // 如果没有childData 直接返回parentData
    }
  };
}

function mergeData(to, from) {
  if (!from) return to;
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    // 如果不存在这个属性，就重新设置
    if (!to.hasOwnProperty(key)) {
      set(to, key, fromVal);
    }
    // 存在相同属性，合并对象
    else if (typeof toVal == "object" && typeof fromVal == "object") {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
```

### 队列性

队列性合并有所有的生命周期和 watch

```js
// 生命周期钩子和 watch 被合并为一个数组，然后正序遍历一次执行
function mergeHook(
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal;
}

LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

// watch
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child)
      ? child
      : [child];
  }
  return ret;
};
```

### 叠加型

叠加型合并有 component、directives、filters

```js
// 叠加型主要是通过原型链进行层层的叠加
strats.components =
  strats.directives =
  strats.filters =
    function mergeAssets(parentVal, childVal, vm, key) {
      var res = Object.create(parentVal || null);
      if (childVal) {
        for (var key in childVal) {
          res[key] = childVal[key];
        }
      }
      return res;
    };
```

### 小结

- 替换型策略有 props、methods、inject、computed，就是将新的同名参数替代旧的参数
- 合并型策略是 data, 通过 set 方法进行合并和重新赋值
- 队列型策略有生命周期函数和 watch，原理是将函数存入一个数组，然后正序遍历依次执行
- 叠加型有 component、directives、filters，通过原型链进行层层的叠加
