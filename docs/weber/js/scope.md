## 作用域和作用域链

### 作用域

简单讲就是变量和函数的可访问范围，即`{}`
最大的作用就是隔离变量
1. 全局作用域：代码在程序的任何地方都能被访问，window对象的内置属性都拥有全局作用域
1. 函数作用域：在固定的代码片段才能被访问

### 作用域链

如果在当前作用域中没有查到，就会向上级作用域去查，直到查到全局作用域，这个查找过程形成的链就叫做作用域链