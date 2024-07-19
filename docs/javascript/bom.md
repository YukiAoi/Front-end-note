# bom

## 是什么

BOM 是浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象
浏览器的全部内容可以看成 DOM，整个浏览器可以看成 BOM。

## window

Bom 的核心对象是 window，它表示浏览器的一个实例

在浏览器中，window 对象有双重角色，即是浏览器窗口的一个接口，又是全局对象

因此所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法

```js
var name = "11111";
function lookName() {
  alert(this.name);
}

console.log(window.name); //11111
lookName(); //11111
window.lookName(); //11111
```

窗口控制方法：

- moveBy(x,y)：从当前位置水平移动窗体 x 个像素，垂直移动窗体 y 个像素，x 为负数，将向左移动窗体，y 为负数，将向上移动窗体
- moveTo(x,y)：移动窗体左上角到相对于屏幕左上角的(x,y)点
- resizeBy(w,h)：相对窗体当前的大小，宽度调整 w 个像素，高度调整 h 个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- resizeTo(w,h)：把窗体宽度调整为 w 个像素，高度调整为 h 个像素
- scrollTo(x,y)：如果有滚动条，将横向滚动条移动到相对于窗体宽度为 x 个像素的位置，将纵向滚动条移动到相对于窗体高度为 y 个像素的位置
- scrollBy(x,y)： 如果有滚动条，将横向滚动条向左移动 x 个像素，将纵向滚动条向下移动 y 个像素

window.open() 既可以导航到一个特定的 url，也可以打开一个新的浏览器窗口

如果 window.open() 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的 URL

```js
window.open("htttp://www.baidu.com", "topFrame");
//  <a href="" target="topFrame"></a>
```

window.open() 会返回新窗口的引用，也就是新窗口的 window 对象

```js
const myWin = window.open("http://www.baidu.com", "myWin");
```

window.close() 仅用于通过 window.open() 打开的窗口

新创建的 window 对象有一个 opener 属性，该属性指向打开他的原始窗口对象

## location

location 属性：

- hash：url 中#后面的字符，没有则返回空字符串
- host：服务器名称和端口号
- hostname：服务器名称
- href：完整 url
- pathname：服务器下面的文件路径
- port：端口号，没有则为空
- protocol：使用的协议
- search：url 的查询字符串，通常为?后面的内容

除了 hash 以外，改变任意一个属性都会引起刷新

location.reload()，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载

如果要强制从服务器中重新加载，传递一个参数 true 即可

## navigator

navigator 对象主要用来获取浏览器的属性，区分浏览器类型

## screen

浏览器窗口外面的客户端显示器的信息

## history

history 对象主要用来操作浏览器 URL 的历史记录，可以通过参数向前，向后，或者向指定 URL 跳转

常用的属性：

- history.go()：向最近的一个记录中包含指定字符串的页面跳转

```js
// 接收一个整数数字或者字符串参数
history.go("maixaofei.com");
// 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面
history.go(3); //向前跳转三个记录
history.go(-1); //向后跳转一个记录
```

- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数
