# 事件代理

## 是什么

事件代理，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素

因此，事件代理是在冒泡阶段完成的

## 应用场景

有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件。这时就可以将点击事件代理在父级元素 ul 上

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```

```js
// 给父层元素绑定事件
document.getElementById("list").addEventListener("click", function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === "li") {
    console.log("the content is: ", target.innerHTML);
  }
});
```

## 总结

适合事件代理的事件有：click，mousedown，mouseup，keydown，keyup，keypress

事件代理存在两大优点：

- 减少整个页面所需的内存，提升整体性能
- 动态绑定，减少重复工作

但是也存在局限性：

- focus、blur 这些事件没有事件冒泡机制，所以无法进行委托绑定事件
- mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的
