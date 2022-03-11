## this

简单说就是谁调用的this就指向谁
1. 普通函数调用：通过函数名()直接调用：`this`指向`全局对象window`
1. 构造函数调用：函数作为构造函数，用new关键字调用时：`this`指向`新new出的对象`
1. 对象函数调用：通过对象.函数名()调用的：`this`指向`这个对象`
1. 箭头函数调用：箭头函数里面没有`this`，所以`永远是上层作用域this`（上下文）
1. apply和call调用：函数体内`this`的指向的是`call/apply方法第一个参数`，若为空默认是指向全局对象`window`
1. 函数作为数组的一个元素，通过数组下标调用的：this指向`这个数组`
1. 函数作为window内置函数的回调函数调用：this指向window（如`setInterval`，`setTimeout`等）

### call/apply/bind

#### 相同点

1. 都是用来改变函数的this对象的指向
1. 第一个参数都是this要指向的对象，如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window

#### 不同点

1. apply和call传入的参数列表形式不同。apply 接收 arguments （伪数组），call接收一串参数列表
```js
fn.call(obj, 1, 2)
fn.apply(obj, [1, 2])
```
2. bind语法和call一模一样，但是bind是等待执行，apply和call是立即执行
3. apply和call是一次性传入参数，而bind可以分为多次传入
4. bind会返回一个新的函数，如果这个返回的新的函数作为构造函数创建一个新的对象，那么此时this不再指向传入给bind的第一个参数，而是指向用`new创建的实例`

### 箭头函数

1. `箭头函数没有自己的this`，会捕获其所在的上下文的this值，作为自己的this值
1. `箭头函数没有constructor`，是匿名函数，不能作为构造函数，不能通过new 调用；
1. `不能通过new调用，也没有new.target 属性`。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined
1.  `箭头函数不绑定 Arguments 对象`。取而代之用rest参数...解决。由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立）
1. 箭头函数通过`call()`或`apply()`方法调用一个函数时，只传入了一个参数，对`this`并没有影响。
1. `箭头函数没有原型属性`，`Fn.prototype`值为`undefined`
1. `箭头函数不能当做Generator函数`，不能使用yield关键字