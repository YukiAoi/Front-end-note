# 用 css 画三角形

## 实现方式

如果盒子的 width 和 height 为 0，全部用边框填满，就会得到四个三角形

```css
.border {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 50px 50px;
  border-color: green yellow red orange;
}
```

![triangle无内容](../assets/image/triangle-%E6%97%A0%E5%86%85%E5%AE%B9.png)

去掉三个多余的三角形

```css
.border {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 50px 50px;
  border-color: transparent transparent #d9534f;
}
```

想要实现一个只有边框是空心的三角形，最直接的方法是利用伪类新建一个三角形定位上去

```css
.border:after {
  content: "";
  border-style: solid;
  border-width: 0 40px 40px;
  border-color: transparent transparent #96ceb4;
  position: absolute;
  top: 6px;
  left: -40px;
}
```

仅有邻边时，两个边会变成对分的三角（直角三角形）

```css
.box {
  /* 内部大小 */
  width: 0px;
  height: 0px;
  /* 边框大小 只设置两条边*/
  border-top: #4285f4 solid;
  border-right: transparent solid;
  border-width: 85px;
  /* 其他设置 */
  margin: 50px;
}
```
