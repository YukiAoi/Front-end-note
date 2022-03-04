1. vue的router以及路由守卫
1. 箭头函数的原理（应该是与普通函数的区别）
  - 没有自己的`this`
  - 没有`constructor`
  - 不能通过`new`调用，也没有`new.target`
  - 没有`arguments`对象
  - `call()`，`bind()`和`apply()`都只传入一个参数
  - 没有`原型属性`
  - 不能当作`generator`函数
1. promise对象
1. 数组去重方法
  - Set
  - [...new Set(arr)]
  - 双重循环+splice
  - 新建空数组，indexof判断是否为-1，是就push进新数组
  - sort排序，比较相邻元素是否相同
  - 总结一下，就是两种：1.双重循环，2.自身键不可重复
1. 数组查找元素方法
  - indexOf，返回下标或-1
  - includes，返回boolean
  - lastIndexOf，返回（最后一次出现的）下标或-1
  - some，返回boolean（是否有符合条件的元素）
  - every，返回boolean（所有元素是否符合条件）
  - filter，返回符合条件的元素组成的数组
  - find，返回符合条件的第一个元素或undefined
  - findIndex，和indexOf一样
1. 数组循环方法
  - for
  - forEach
  - map
  - forof
  - keys，values，entries（keys是索引，values是值，entris是两个一起）
1. 判断数据类型
  - typeof，不能判断object，array，null和arguments
  - instanceof，不能判断string，number，boolean
  - object.prototype.toString.call()
  - isArray，isNAN和isFinite
1. promise优缺点
  - 对象的状态不受外界影响
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果
  - 无法取消Promise
  - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
  - 处于pending状态时，无法得知目前进展到哪一个阶段
1. `<script><script async><script defer>`的区别
  - `async`和`defer`都不会阻塞页面渲染
  - `async`的加载顺序是先加载完成的先执行，一般用于独立脚本
  - `defer`是按照他们在文档中的顺序加载，一般用于整个dom的脚本
1. 原型继承
  - 定义新的构造函数，并在内部用`call()`调用希望继承的构造函数，并绑定`this`
  - 借助一个中间函数来实现原型链继承
  ```js
  function inherits(Child, Parent) {
    let F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
  }
  ```
  - 继续在新的构造函数的原型上定义新方法
1. arguments
  - 简单说就是所有（非箭头）函数的实参（是个类数组，即arguments）
  - 除了length和索引元素外没有任何array属性
  - 可以被转换为array
    ```js
    let arr = Array.prototype.slice.call(arguments)
    let arr = [].slice.call(arguments)
    <!-- ES6 -->
    let arr = Array.from(arguments)
    let arr = [...arguments]
    ```
  - typeof返回object
1. 拖动窗口保持正方形
  - 使用vh
  ```css
    .a{
      width:100%;
      height:100vh;
    }
  ```
  - 使用垂直方向的padding
  ```css
  .a{
    width:100%;
    height:0;
    padding-bottom:100%;
  }
  ```
  - 使用伪元素的margin-top
  ```css
  .a{
    width:100%;
    <!-- BFC问题，清除浮动 -->
    overflow:hidden;
  }
  .a:after{
    content:'';
    margin-top:100%;
    display:block:
  }
  ```