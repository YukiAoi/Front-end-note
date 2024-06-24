# 过滤器

## 是什么

过滤器不改变原始数据，只是返回过滤后的数据再进行调用处理，我们也可以将其理解为一个纯函数

Vue 允许你自定义过滤器，可被用于一些常见的文本格式化

Vue3 中已废弃 filter

## 怎么用

```vue
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div :id="rawId | formatId"></div>
```

### 定义 filter

在组件的选项中定义本地的过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

全局过滤器

```js
// 注意：当全局过滤器和局部过滤器重名时，会采用局部过滤器
// 过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  // ...
});
```

过滤器可以串联

```vue
{{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数，因此可以接收参数

```vue
<!-- 这里，filterA 被定义为接收三个参数的过滤器函数。

其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数 -->
{{ message | filterA("arg1", arg2) }}
```

### 小结

- 局部过滤器先于全局过滤器调用
- 一个表达式可以使用多个过滤器，过滤器之间使用“|”隔开

## 原理

在模板编译阶段过滤器表达式将会被编译为过滤器函数，主要是用过 parseFilters

```js
_s(_f("filterFormat")(message));
```

\_f 函数全名是：resolveFilter，这个函数的作用是从 this.$options.filters 中找出注册的过滤器并返回

```js
this.$options.filters["filterFormat"](message); // message为参数
```

关于 resolveFilter

```js
import { indentity, resolveAsset } from "core/util/index";

export function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id, true) || identity;
}
```

内部直接调用 resolveAsset，将 option 对象，类型，过滤器 id，以及一个触发警告的标志作为参数传递，如果找到，则返回过滤器

```js
export function resolveAsset(options, type, id, warnMissing) {
  // 因为我们找的是过滤器，所以在 resolveFilter函数中调用时 type 的值直接给的 'filters',实际这个函数还可以拿到其他很多东西
  if (typeof id !== "string") {
    // 判断传递的过滤器id 是不是字符串，不是则直接返回
    return;
  }
  const assets = options[type]; // 将我们注册的所有过滤器保存在变量中
  // 接下来的逻辑便是判断id是否在assets中存在，即进行匹配
  if (hasOwn(assets, id)) return assets[id]; // 如找到，直接返回过滤器
  // 没有找到，代码继续执行
  const camelizedId = camelize(id); // 万一你是驼峰的呢
  if (hasOwn(assets, camelizedId)) return assets[camelizedId];
  // 没找到，继续执行
  const PascalCaseId = capitalize(camelizedId); // 万一你是首字母大写的驼峰呢
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
  // 如果还是没找到，则检查原型链(即访问属性)
  const result = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  // 如果依然没找到，则在非生产环境的控制台打印警告
  if (process.env.NODE_ENV !== "production" && warnMissing && !result) {
    warn("Failed to resolve " + type.slice(0, -1) + ": " + id, options);
  }
  // 无论是否找到，都返回查找结果
  return result;
}
```

\_s 函数的全称是 toString,过滤器处理后的结果会当作参数传递给 toString 函数，最终 toString 函数执行后的结果会保存到 Vnode 中的 text 属性中，渲染到视图中

```js
function toString(value) {
  return value == null
    ? ""
    : typeof value === "object"
    ? JSON.stringify(value, null, 2) // JSON.stringify()第三个参数可用来控制字符串里面的间距
    : String(value);
}
```

parseFilters，在模板编译阶段使用该函数阶段将模板过滤器解析为过滤器函数调用表达式

```js
function parseFilters(filter) {
  let filters = filter.split("|");
  let expression = filters.shift().trim(); // shift()删除数组第一个元素并将其返回，该方法会更改原数组
  let i;
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      experssion = warpFilter(expression, filters[i].trim()); // 这里传进去的expression实际上是管道符号前面的字符串，即过滤器的第一个参数
    }
  }
  return expression;
}
// warpFilter函数实现
function warpFilter(exp, filter) {
  // 首先判断过滤器是否有其他参数
  const i = filter.indexof("(");
  if (i < 0) {
    // 不含其他参数，直接进行过滤器表达式字符串的拼接
    return `_f("${filter}")(${exp})`;
  } else {
    const name = filter.slice(0, i); // 过滤器名称
    const args = filter.slice(i + 1); // 参数，但还多了 ')'
    return `_f('${name}')(${exp},${args}`; // 注意这一步少给了一个 ')'
  }
}
```

### 小结

- 在编译阶段通过 parseFilters 将过滤器编译成函数调用（串联过滤器则是一个嵌套的函数调用，前一个过滤器执行的结果是后一个过滤器函数的参数）
- 编译后通过调用 resolveFilter 函数找到对应过滤器并返回结果
- 执行结果作为参数传递给 toString 函数，而 toString 执行后，其结果会保存在 Vnode 的 text 属性中，渲染到视图
