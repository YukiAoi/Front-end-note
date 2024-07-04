# tree shaking

## 是什么

Tree shaking 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 Dead code elimination

简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

在 Vue2 中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是 Vue 实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

```js
import Vue from "vue";

Vue.nextTick(() => {});
```

而 Vue3 源码引入 tree shaking 特性，将全局 API 进行分块。如果不使用其某些功能，它们将不会包含在基础包中

```js
import { nextTick, observable } from "vue";

nextTick(() => {});
```

## 如何实现

Tree shaking 是基于 ES6 模板语法（import 与 exports），主要是借助 ES6 模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量

Tree shaking 无非就是做了两件事：

1. 编译阶段利用 ES6 Module 判断哪些模块已经加载
2. 判断那些模块和变量未被使用或者引用，进而删除对应代码

## 小结

通过 Tree shaking，Vue3 给我们带来的好处是：

1. 减少程序体积（更小）
2. 减少程序执行时间（更快）
3. 便于将来对程序架构进行优化（更友好）
