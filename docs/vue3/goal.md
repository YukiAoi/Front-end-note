# Vue3 的设计目标

## 设计目标

- 更小
- 更快
- TypeScript 支持
- API 设计一致性
- 提高自身可维护性
- 开放更多底层功能

一句话概述，就是更小更快更友好了

### 更小

Vue3 移除一些不常用的 API

引入 tree-shaking，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了

### 更快

主要体现在编译方面：

- diff 算法优化
- 静态提升
- 事件监听缓存
- SSR 优化

### 更友好

vue3 在兼顾 vue2 的 options API 的同时还推出了 composition API，大大增加了代码的逻辑组织和代码复用能力

同时，VUE3 是基于 typescipt 编写的，可以享受到自动的类型定义提示

## 优化方案

vue3 从很多层面都做了优化，可以分成三个方面：

- 源码
- 性能
- 语法 API

### 源码

源码可以从两个层面展开：

- 源码管理
- TypeScript

#### 源码管理

vue3 整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中

这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性

另外一些 package（比如 reactivity 响应式库）是可以独立于 Vue 使用的，这样用户如果只想使用 Vue3 的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 Vue

#### TypeScript

Vue3 是基于 typeScript 编写的，提供了更好的类型检查，能支持复杂的类型推导

### 性能

vue3 从以下几个方面进行了性能优化：

- 体积优化
- 编译优化
- 数据劫持优化

#### 数据劫持

在 vue2 中，数据劫持是通过 Object.defineProperty，不能检测对象属性的添加和删除

尽管 Vue 为了解决这个问题提供了 set 和 delete 实例方法，但是对于用户来说，还是增加了一定的负担，同时在面对嵌套层级比较深的情况下，还存在性能问题

相比之下，vue3 是通过 proxy 监听整个对象，那么对于删除还是添加当然也能监听到

同时 Proxy 并不能监听到内部深层次的对象变化，而 Vue3 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

#### 语法 API

composition API 的两个显著优化：

- 优化逻辑组织
- 优化逻辑复用

##### 逻辑组织

相同功能的代码编写在一块，而不像 options API 那样，各个功能的代码混成一块

##### 逻辑复用

在 vue2 中，我们是通过 mixin 实现功能混合，如果多个 mixin 混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰

而通过 composition 这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可

```js
import { toRefs, reactive, onUnmounted, onMounted } from "vue";
function useMouse() {
  const state = reactive({ x: 0, y: 0 });
  const update = (e) => {
    state.x = e.pageX;
    state.y = e.pageY;
  };
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return toRefs(state);
}
```

组件使用

```js
import useMousePosition from "./mouse";
export default {
  setup() {
    const { x, y } = useMousePosition();
    return { x, y };
  },
};
```

数据来源清晰了，即使去编写更多的 hook 函数，也不会出现命名冲突的问题
