# 上拉加载，下拉刷新

## 实现原理

### 上拉加载

```
<!-- 触底公式 -->
scrollTop + clientHeight >= scrollHeight
```

- scrollTop：滚动视窗的高度距离 window 顶部的距离，它会随着往上滚动而不断增加，初始值是 0，它是一个变化的值
- clientHeight：它是一个定值，表示屏幕可视区域的高度
- scrollHeight：页面不能滚动时也是存在的,此时 scrollHeight 等于 clientHeight。scrollHeight 表示 body 所有元素的总长度(包括 body 元素自身的 padding)

```js
let clientHeight = document.documentElement.clientHeight; //浏览器高度
let scrollHeight = document.body.scrollHeight;
let scrollTop = document.documentElement.scrollTop;

let distance = 50; //距离视窗还用50的时候，开始触发；

if (scrollTop + clientHeight >= scrollHeight - distance) {
  console.log("开始加载数据");
}
```

### 下拉刷新

下拉刷新的本质是页面本身置于顶部时，用户下拉时需要触发的动作

下拉刷新的原生实现，主要分成三步：

1. 监听原生 touchstart 事件，记录其初始位置的值，e.touches[0].pageY
2. 监听原生 touchmove 事件，记录并计算当前滑动的位置值与初始位置值的差值，大于 0 表示向下拉动，并借助 CSS3 的 translateY 属性使元素跟随手势向下滑动对应的差值，同时也应设置一个允许滑动的最大值
3. 监听原生 touchend 事件，若此时元素滑动达到最大值，则触发 callback，同时将 translateY 重设为 0，元素回到初始位置

```html
<main>
  <p class="refreshText"></p>
  <ul id="refreshContainer">
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
    <li>555</li>
    ...
  </ul>
</main>
```

```js
// 监听touchstart事件，记录初始的值
var _element = document.getElementById("refreshContainer"),
  _refreshText = document.querySelector(".refreshText"),
  _startPos = 0, // 初始的值
  _transitionHeight = 0; // 移动的距离

_element.addEventListener(
  "touchstart",
  function (e) {
    _startPos = e.touches[0].pageY; // 记录初始位置
    _element.style.position = "relative";
    _element.style.transition = "transform 0s";
  },
  false
);
```

```js
// 监听touchmove移动事件，记录滑动差值
_element.addEventListener(
  "touchmove",
  function (e) {
    // e.touches[0].pageY 当前位置
    _transitionHeight = e.touches[0].pageY - _startPos; // 记录差值

    if (_transitionHeight > 0 && _transitionHeight < 60) {
      _refreshText.innerText = "下拉刷新";
      _element.style.transform = "translateY(" + _transitionHeight + "px)";

      if (_transitionHeight > 55) {
        _refreshText.innerText = "释放更新";
      }
    }
  },
  false
);
```

```js
// 监听touchend离开的事件
_element.addEventListener(
  "touchend",
  function (e) {
    _element.style.transition = "transform 0.5s ease 1s";
    _element.style.transform = "translateY(0px)";
    _refreshText.innerText = "更新中...";
    // todo...
  },
  false
);
```
