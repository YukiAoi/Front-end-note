# 盒子模型

盒子模型可以分成：

- W3C 标准盒子模型
- IE 怪异盒子模型

默认情况下，盒子模型为 W3C 标准盒子模型

## 标准盒子模型

width/height 只是内容高度，不包含 padding 和 border

## 怪异盒子模型

width/height 包含了 padding 和 border

## Box-sizing

CSS 中的 box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度

```css
box-sizing: content-box|border-box|inherit;
```

- content-box：默认值，元素的 width/height 不包含 padding，border，与标准盒子模型表现一致
- border-box：元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
- inherit：从父元素继承
