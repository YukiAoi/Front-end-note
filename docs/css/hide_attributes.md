# 隐藏元素

## 实现方式

- display:none
- visibility:hidden
- opacity:0
- 设置 height、width 属性为 0
- position:absolute
- clip-path

### display:none

将元素设置为 display:none 后，元素在页面上将彻底消失

元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘

消失后，自身绑定的事件不会触发，也不会有过渡效果

特点：元素不可见，不占据空间，无法响应点击事件

### visibility:hidden

在页面上仅仅是隐藏该元素，DOM 结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘

特点：元素不可见，占据页面空间，无法响应点击事件

### opacity:0

opacity 属性表示元素的透明度，将元素的透明度设置为 0 后，就是透明的

不会引发重排，一般情况下也会引发重绘

如果利用 animation 动画，对 opacity 做变化（animation 会默认触发 GPU 加速），则只会触发 GPU 层面的 composite，不会触发重绘

需要注意的是：其子元素不能设置 opacity 来达到显示的效果

特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

### 设置 height、width 属性为 0

将元素的 margin，border，padding，height 和 width 等影响元素盒模型的属性设置成 0，如果元素内有子元素或内容，还应该设置其 overflow:hidden 来隐藏其子元素

特点：元素不可见，不占据页面空间，无法响应点击事件

### position:absolute

将元素移出可视区域

特点：元素不可见，不影响页面布局

### clip-path

裁剪

```css
.hide {
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
}
```
