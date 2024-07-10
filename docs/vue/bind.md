# 双向绑定

## 什么是双向绑定

- Model 绑定到 View，修改 Model 后，View 会改变，这是单向绑定
- 在单向绑定的基础上，更新 View 后，Model 也更新了，就是双向绑定

## 原理

主要由三个部分组成：

- Model：数据层，应用的数据和逻辑
- View：视图层，应用的展示效果
- ViewModel：视图模型层（逻辑层），框架封装的核心，连接视图层与数据层

### ViewModel

主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据，它由两个主要部分组成：
  - 监听器（Observer）：对所有数据进行监听
  - 解析器（Compiler）：对每个元素节点的指令进行扫描解析，根据指令模板替换数据，并且绑定对应的更新函数

## 实现双向绑定

1. new Vue()执行初始化，对 data 进行响应式处理，这个过程发生在 Observer 中
2. 对模板进行编译，找出动态绑定的数据，从 data 中获取数据并初始化视图，这个过程发生在 Compiler 中
3. 同时定义更新函数和 Watcher，对应的数据变化时，Watcher 会调用更新函数
4. 由于 data 的 key 在一个视图中可能会出现多次，所以每个 key 都需要一个 Dep 来管理多个 Watcher
5. data 中的数据一旦发生变换，会找到对应的 Dep，通知 Watcher 调用更新函数

### 实现

#### 构造函数

初始化，对 data 进行响应式处理

```js
class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 对data选项做响应式处理
    observe(this.$data);

    // 代理data到vm上
    proxy(this);

    // 执行编译
    new Compile(options.el, this);
  }
}
```

对 data 进行响应式处理具体操作

```js
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  new Observer(obj);
}

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
```

#### 编译 Compile

```js
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el); //获取dom
    if (this.$el) {
      this.compile(this.$el);
    }
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      //遍历子节点
      if (this.isElement(node)) {
        //判断是否为节点
        console.log(`编译元素${node.nodeName}`);
      } else if (this.isInterpolation(node)) {
        //判断是否为插值文本
        console.log(`编译插值文本${node.textContent}`);
      }
      if (node.childNodes && node.childNodes.length > 0) {
        //判断是否有子节点
        this.compile(node); //有的话递归
      }
    });
  }
  isElement(node) {
    return node.nodeType === 1;
  }
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}
```

#### 依赖收集

视图中会用到 data 中某个 key，这称为依赖。同⼀个 key 可能出现多次，每次都需要收集出来用⼀个 Watcher 来维护它们，此过程称为依赖收集。多个 Watcher 需要⼀个 Dep 来管理，需要更新时由 Dep 统⼀通知

1. defineReactive 时为每⼀个 key 创建⼀个 Dep 实例
2. 初始化视图时读取某个 key，例如 name1，创建⼀个 watcher1
3. 由于触发 name1 的 getter 方法，将 watcher1 添加到 name1 对应的 Dep 中
4. 当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新

```js
// 负责更新视图
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updater;
    // 创建实例时，把当前实例指定到Dep.target静态属性上
    Dep.target = this;
    // 读一下key，触发get
    vm[key];
    // 置空
    Dep.target = null;
  }
  // 未来执行dom更新函数，由dep调用
  update() {
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}
```

声明 Dep

```js
class Dep {
  constructor() {
    this.deps = []; //依赖管理
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}
```

创建 Watcher 时触发 getter

```js
class Watcher {
  constructor(vm, key, updateFn) {
    Dep.target = this;
    vm[key];
    Dep.target = null;
  }
}
```

依赖收集，创建 Dep 实例

```js
function defineReactive(obj, key, val) {
  this.observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target); //Dep.target也就是Watcher实例
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      dep.notify(); //通知dep执行更新方法
    },
  });
}
```
