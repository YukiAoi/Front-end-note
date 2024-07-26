# 小于 12px 的文字

## 解决方法

- zoom
- -webkit-transform:scale()
- -webkit-text-size-adjust:none

### zoom

变焦

可以写成小数或百分比

zoom 并不是标准属性，需要考虑其兼容性

```html
<body>
  <span class="span1">测试10px</span>
  <span class="span2">测试12px</span>
</body>
<style>
  .span1 {
    font-size: 12px;
    display: inline-block;
    zoom: 0.8;
  }
  .span2 {
    display: inline-block;
    font-size: 12px;
  }
</style>
```

### -webkit-transform:scale()

使用 scale 属性只对可以定义宽高的元素生效，所以，下面代码中将 span 元素转为行内块元素

```html
<body>
  <span class="span1">测试10px</span>
  <span class="span2">测试12px</span>
</body>
<style type="text/css">
  .span1 {
    font-size: 12px;
    display: inline-block;
    -webkit-transform: scale(0.8);
  }
  .span2 {
    display: inline-block;
    font-size: 12px;
  }
</style>
```

### -webkit-text-size-adjust:none

用来设定文字大小是否根据设备(浏览器)来自动调整显示大小

属性值：

- percentage：字体显示的大小
- auto：默认，字体大小会根据设备/浏览器来自动调整
- none:字体大小不会自动调整

不建议全局应用该属性，而是单独对某一属性使用

```css
html {
  -webkit-text-size-adjust: none;
}
```

自从 chrome 27 之后，就取消了对这个属性的支持。同时，该属性只对英文、数字生效，对中文不生效
