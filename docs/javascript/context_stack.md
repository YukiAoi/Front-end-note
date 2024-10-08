# 执行上下文和执行栈

## 执行上下文

执行上下文是一种对 Javascript 代码执行环境的抽象概念，它的类型分为三种：

1. 全局执行上下文：只有一个，浏览器中的全局对象就是 window 对象，this 指向这个全局对象
2. 函数执行上下文：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文
3. Eval 函数执行上下文： 指的是运行在 eval 函数中的代码，很少用而且不建议使用

### 生命周期

执行上下文的生命周期包括三个阶段：

1. 创建阶段
2. 执行阶段
3. 回收阶段

#### 创建阶段

创建阶段即当函数被调用，但未执行任何其内部代码之前

创建阶段做了三件事：

1. 确定 this 的值
2. 词法环境组件被创建
3. 变量环境组件被创建

##### 词法环境

有两个组成部分：

- 全局环境：是一个没有外部环境的词法环境，其外部环境引用为 null，有一个全局对象，this 的值指向这个全局对象
- 函数环境：用户在函数中定义的变量被存储在环境记录中，包含了 arguments 对象，外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

##### 变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性

在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定

let 和 const 定义的变量 a 和 b 在创建阶段没有被赋值，但 var 声明的变量从在创建阶段被赋值为 undefined

这是因为，创建阶段，会在代码中扫描变量和函数声明，然后将函数声明存储在环境中

但变量会被初始化为 undefined(var 声明的情况下)和保持 uninitialized(未初始化状态)(使用 let 和 const 声明的情况下)

这就是变量提升的实际原因

#### 执行阶段

在这阶段，执行变量赋值、代码执行

如果 Javascript 引擎在源代码中声明的实际位置找不到变量的值，那么将为其分配 undefined 值

#### 回收阶段

执行上下文出栈等待虚拟机回收执行上下文

## 执行栈

具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文

简单分析一下流程：

- 创建全局上下文并压入执行栈
- first 函数被调用，创建函数执行上下文并压入栈
- 执行 first 函数过程遇到 second 函数，再创建一个函数执行上下文并压入栈
- second 函数执行完毕，对应的函数执行上下文被推出执行栈，执行下一个执行上下文 first 函数
- first 函数执行完毕，对应的函数执行上下文也被推出栈中，然后执行全局上下文
- 所有代码执行完毕，全局上下文也会被推出栈中，程序结束
