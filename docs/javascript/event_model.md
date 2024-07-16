# 事件模型

## 事件流

事件流都会经历三个阶段：

1. 事件捕获阶段(capture phase)
2. 处于目标阶段(target phase)
3. 事件冒泡阶段(bubbling phase)

### 事件冒泡

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是 DOM 中最高层的父节点

### 事件捕获

与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件

## 事件模型

分为三种：

1. 原始事件模型
2. 标准事件模型
3. IE 事件模型（基本不用）

### 原始事件模型

在这种模型中，绑定监听函数有两种方式：

1. HTML 代码中直接绑定

```js
<input type="button" onclick="fun()">
```

2. 通过 JS 代码绑定

```js
var btn = document.getElementById(".btn");
btn.onclick = fun;
```

删除 DOM0 级事件处理程序只要将对应事件属性置为 null 即可

```js
btn.onclick = null;
```

#### 特点

- 绑定速度快
- 只支持冒泡，不支持捕获
- 同一个类型的事件只能绑定一次

### 标准事件模型

在该事件模型中，一次事件共有三个过程：

1. 事件捕获阶段：事件从 document 一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
2. 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
3. 事件冒泡阶段：事件从目标元素冒泡到 document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数：

```js
addEventListener(eventType, handler, useCapture);
```

事件移除监听函数：

```js
removeEventListener(eventType, handler, useCapture);
```

- eventType 指定事件类型(不要加 on)
- handler 是事件处理函数
- useCapture 是一个 boolean 用于指定是否在捕获阶段进行处理，一般设置为 false 与 IE 浏览器保持一致

#### 特点

- 可以在一个 DOM 元素上绑定多个事件处理器
- 执行时机
  当第三个参数(useCapture)设置为 true 就在捕获过程中执行，反之在冒泡过程中执行处理函数

### IE 事件模型

IE 事件模型共有两个过程：

- 事件处理阶段：事件到达目标元素，触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数：

```js
attachEvent(eventType, handler);
```

事件移除监听函数：

```js
detachEvent(eventType, handler);
```
