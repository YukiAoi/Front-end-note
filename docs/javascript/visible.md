# 如何判断一个元素是否在可视区域中

## 实现方式

- offsetTop、scrollTop
- getBoundingClientRect
- Intersection Observer

### offsetTop、scrollTop

offsetTop：元素的上外边框至包含元素的上内边框之间的像素距离

scrollTop：既可以确定元素当前滚动的状态，也可以设置元素的滚动位置，将元素的 scrollTop 设置为 0，可以重置元素的滚动位置

```js
function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scrollTop = document.documentElement.scrollTop;
  const top = offsetTop - scrollTop;
  return top <= viewPortHeight;
}
```

### getBoundingClientRect

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

1. top 大于等于 0
2. left 大于等于 0
3. bottom 小于等于视窗高度
4. right 小于等于视窗宽度

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```

### Intersection Observer

使用步骤主要分为两步：创建观察者和传入被观察者

#### 创建观察者

```js
const options = {
  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
  // 1 表示完全被包含
  threshold: 1.0,
  root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = (entries, observer) => { ....}

const observer = new IntersectionObserver(callback, options);
```

#### 传入被观察者

```js
const target = document.querySelector(".target");
observer.observe(target);
```
