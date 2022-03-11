## JavaScript

### 深拷贝和浅拷贝

`浅拷贝`：拷贝的是对象的引用地址
`深拷贝`：新开一个堆，两个对象对应两个不同的引用地址

#### 浅拷贝实现
1. 直接赋值
```js
let m = { a: 10, b: 20 }
let n = m
m.a = 15
console.log(n.a)    //15
```
2. `Object.assign()`
3. 扩展运算符`...`
4. `Array.prototype.concat()`
5. `Array.prototype.slice()`

#### 深拷贝实现
1. 手动复制
```js
let m = { a: 10, b: 20 }
let n = { a:m.a, b:m.b }
m.a = 15
console.log(n.a)    //10
```
2. 对象只有一层的话也可以使用`Object.assign()`
3. `JSON.parse()`加`JSON.stringify`（不适用于function）
4. 递归拷贝
```js
function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
var str = {};
var obj = { a: {a: "hello", b: 21} };
deepClone(obj, str);
console.log(str.a);
```
5. `Object.create()`

### 原型 && 原型链

**原型关系：**

- 每个 class 都有显式原型 prototype
- 每个实例都有隐式原型 `__proto__`
- 实例的 `__proto__` 指向对应 class 的 prototype

‌ **原型:**  在 JS 中，每当定义一个对象（函数也是对象）时，对象中都会包含一些预定义的属性。其中每个`函数对象`都有一个`prototype` 属性，这个属性指向函数的`原型对象`。

原型链：函数的原型链对象constructor默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针__proto__，该指针是指向上一层的原型对象，而上一层的原型对象的结构依然类似。因此可以利用__proto__一直指向Object的原型对象上，而Object原型对象用Object.prototype.__ proto__ = null表示原型链顶端。如此形成了js的原型链继承。同时所有的js对象都有Object的基本方法

**特点:**  `JavaScript`对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

### new运算符的实现机制

1.  首先创建了一个新的`空对象`
2.  `设置原型`，将对象的原型设置为函数的`prototype`对象。
3.  让函数的`this`指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4.  判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

### EventLoop 事件循环

`JS`是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，所以会先将同步代码压入执行栈中，依次执行，将异步代码推入异步队列，异步队列又分为宏任务队列和微任务队列，因为宏任务队列的执行时间较长，所以微任务队列要优先于宏任务队列。微任务队列的代表就是，`Promise.then`，`MutationObserver`，宏任务的话就是`setImmediate setTimeout setInterval`

JS运行的环境。一般为浏览器或者Node。 在浏览器环境中，有JS引擎线程和渲染线程，且两个线程互斥。 Node环境中，只有JS线程。 不同环境执行机制有差异，不同任务进入不同Event Queue队列。 当主程结束，先执行准备好微任务，然后再执行准备好的宏任务，一个轮询结束。

#### **浏览器中的事件循环（Event Loop)**

事件循环的运行机制是，先会执行栈中的内容，栈中的内容执行后执行微任务，微任务清空后再执行宏任务，先取出一个宏任务，再去执行微任务，然后在取宏任务清微任务这样不停的循环。

-   eventLoop 是由JS的宿主环境（浏览器）来实现的；

-   事件循环可以简单的描述为以下四个步骤:

    1.  函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs，接着执行同步任务，直到Stack为空
    2.  此期间WebAPIs完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
    3.  执行栈为空时，Event Loop把微任务队列执行清空；
    4.  微任务队列清空后，进入宏任务队列，取队列的第一项任务放入Stack（栈）中执行，执行完成后，查看微任务队列是否有任务，有的话，清空微任务队列。重复4，继续从宏任务中取任务执行，执行完成之后，继续清空微任务，如此反复循环，直至清空所有的任务。

    ![事件循环流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/342e581223d2471d9484fc48beb9f8e1~tplv-k3u1fbpfcp-zoom-1.image)

-   浏览器中的任务源(task):

    -   `宏任务(macrotask)`：\
        宿主环境提供的，比如浏览器\
        ajax、setTimeout、setInterval、setTmmediate(只兼容ie)、script、requestAnimationFrame、messageChannel、UI渲染、一些浏览器api
    -   `微任务(microtask)`：\
        语言本身提供的，比如promise.then\
        then、queueMicrotask(基于then)、mutationObserver(浏览器提供)、messageChannel 、mutationObersve

传送门 ☞ [# 宏任务和微任务](https://juejin.cn/post/7001881781125251086)

#### **Node 环境中的事件循环（Event Loop)**

`Node`是基于V8引擎的运行在服务端的`JavaScript`运行环境，在处理高并发、I/O密集(文件操作、网络操作、数据库操作等)场景有明显的优势。虽然用到也是V8引擎，但由于服务目的和环境不同，导致了它的API与原生JS有些区别，其Event Loop还要处理一些I/O，比如新的网络连接等，所以Node的Event Loop(事件环机制)与浏览器的是不太一样。

![2020120317343116.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e362c1770f62428fbf3faabd99d2a64c~tplv-k3u1fbpfcp-zoom-1.image) 执行顺序如下：

-   `timers`: 计时器，执行setTimeout和setInterval的回调
-   `pending callbacks`: 执行延迟到下一个循环迭代的 I/O 回调
-   `idle, prepare`: 队列的移动，仅系统内部使用
-   `poll轮询`: 检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。
-   `check`: 执行`setImmediate`回调，setImmediate在这里执行
-   `close callbacks`: 执行`close`事件的`callback`，一些关闭的回调函数，如：socket.on('close', ...)

### setTimeout、Promise、Async/Await 的区别

1.  setTimeout

    settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行。

2.  Promise

    Promise本身是**同步的立即执行函数**， 当在执行函数中遇到resolve或者reject的时候， 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行。

    ```js
    console.log('script start')
    let promise1 = new Promise(function (resolve) {
      console.log('promise1')
      resolve()
      console.log('promise1 end')
    }).then(function () {
      console.log('promise2')
    })
    setTimeout(function(){
      console.log('settimeout')
    })
    console.log('script end')
    // 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
    
    // Promise.all()会等待所有的promise程序都返回结果之后执行后续的程序，返回一个新的Promise。
    let p1 = new Promise((resolve, reject) => {  
      resolve('success1')
    })
    let p2 = new Promise((resolve, reject) => {  
      resolve('success1')
    })
    Promise.all([p1, p2]).then((result) => {  
      console.log(result)   // ['success1', 'success2']             
    }).catch((error) => {  
      console.log(error)
    })

    //Promise.race()是一组集合中最先解决或最先拒绝的Promise，返回一个新的Promise。
    let p1 = new Promise((resolve, reject) => {  
      setTimeout(() => {    
        resolve('success1')  
      },1000)
    })
    let p2 = new Promise((resolve, reject) => {  
      setTimeout(() => {    
        reject('failed2')  
      }, 1500)
    })
    Promise.race([p1, p2]).then((result) => {  
      console.log(result)
    }).catch((error) => {  
      console.log(error)  //  'success1'    
    })
    ```

3.  async/await

    async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

    ```js
    async function async1(){
      console.log('async1 start');
      await async2();
      console.log('async1 end')
    }
    async function async2(){
      console.log('async2')
    }

    console.log('script start');
    async1();
    console.log('script end')

    // 输出顺序：script start->async1 start->async2->script end->async1 end
    ```
传送门 ☞ [# JavaScript Promise 专题](https://juejin.cn/post/6999651011304357925)

### Async/Await 如何通过同步的方式实现异步

Async/Await就是一个**自执行**的generator函数。利用generator函数的特性把异步的代码写成“同步”的形式,第一个请求的返回值作为后面一个请求的参数,其中每一个参数都是一个promise对象。

### 介绍节流防抖原理、区别以及应用

`节流`：事件触发后，规定时间内，事件处理函数不能再次被调用。也就是说在规定的时间内，函数只能被调用一次，且是最先被触发调用的那次。

`防抖`：多次触发事件，事件处理函数只能执行一次，并且是在触发操作结束时执行。也就是说，当一个事件被触发准备执行事件函数前，会等待一定的时间（这时间是码农自己去定义的，比如 1 秒），如果没有再次被触发，那么就执行，如果被触发了，那就本次作废，重新从新触发的时间开始计算，并再次等待 1 秒，直到能最终执行！

`使用场景`：\
节流：滚动加载更多、搜索框搜的索联想功能、高频点击、表单重复提交……\
防抖：搜索框搜索输入，并在输入完以后自动搜索、手机号，邮箱验证输入检测、窗口大小 resize 变化后，再重新渲染。

```js
/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function throttle(fn, delay) {
  //记录上一次函数触发的时间
  var lastTime = 0;
  return function(){
    //记录当前函数触发的时间
    var nowTime = Date.now();
    if(nowTime - lastTime > delay){
      //修正this指向问题
      fn.call(this);
      //同步执行结束时间
      lastTime = nowTime;
    }
  }
}

document.onscroll = throttle(function () {
    console.log('scllor事件被触发了' + Date.now());
}, 200); 

/**
 * 防抖函数  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function debounce(fn, delay) {
  //记录上一次的延时器
  var timer = null;
  return function () {
    //清除上一次的演示器
    clearTimeout(timer);
    //重新设置新的延时器
    timer = setTimeout(function(){
      //修正this指向问题
      fn.apply(this);
    }, delay); 
  }
}
document.getElementById('btn').onclick = debounce(function () {
  console.log('按钮被点击了' + Date.now());
}, 1000);
```
