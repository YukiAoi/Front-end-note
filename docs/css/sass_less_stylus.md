# css 预编语言

## 是什么

扩充了 css 语言，增加了诸如变量、混合（mixin）、函数等功能，让 css 更易维护、方便

本质上，预编语言是 css 的超集

## 有哪些

- sass
- less
- stylus

## 区别

### 基本使用

less 和 scss 需要{}，sass 和 stylus 不需要

```css
/* less和scss */
.box {
  display: block;
}
```

```css
/* sass 和 stylus */
.box
  display: block
```

### 嵌套

三个都一样，引用父级选择器的标记 & 也相同

```css
.a {
  &.b {
    color: red;
  }
}
```

### 变量

less 声明的变量必须以@开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号:分隔开

```css
/* less */
@red: #c00;

strong {
  color: @red;
}
```

sass 声明的变量跟 less 十分的相似，只是变量名前面使用$开头

```css
/* sass */
$red: #c00;

strong {
  color: $red;
}
```

stylus 声明的变量没有任何的限定，可以使用$开头，结尾的分号;可有可无，但变量与变量值之间需要使用=

在 stylus 中我们不建议使用@符号开头声明变量

```css
red = #c00

strong
  color: red
```

### 作用域

sass 中不存在全局变量，所以，在 sass 中最好不要定义相同的变量名

```css
/* 编译前 */
$color: black;
.scoped {
  $bg: blue;
  $color: white;
  color: $color;
  background-color: $bg;
}
.unscoped {
  color: $color;
}
/* 编译后 */
.scoped {
  color: white; /*是白色*/
  background-color: blue;
}
.unscoped {
  color: white; /*白色（无全局变量概念）*/
}
```

less 与 stylus 的作用域跟 javascript 十分的相似，首先会查找局部定义的变量，如果没有找到，会像冒泡一样，一级一级往下查找，直到根为止

```css
/* 编译前 */
@color: black;
.scoped {
  @bg: blue;
  @color: white;
  color: @color;
  background-color: @bg;
}
.unscoped {
  color: @color;
}
/* 编译后 */
.scoped {
  color: white; /* 白色（调用了局部变量）*/
  background-color: blue;
}
.unscoped {
  color: black; /* 黑色（调用了全局变量）*/
}
```

### 混入

Mixins 可以将一部分样式抽出，作为单独定义的模块，被很多选择器重复使用

在 less 中，混合的用法是指将定义好的 ClassA 中引入另一个已经定义的 Class，也能使用够传递参数，参数变量为@声明

```css
/* 编译前 */
.alert {
  font-weight: 700;
}

.highlight(@color: red) {
  font-size: 1.2em;
  color: @color;
}

.heads-up {
  .alert;
  .highlight(red);
}
/* 编译后 */
.alert {
  font-weight: 700;
}
.heads-up {
  font-weight: 700;
  font-size: 1.2em;
  color: red;
}
```

sass 声明 mixins 时需要使用@mixinn，后面紧跟 mixin 的名，也可以设置参数，参数名为变量$声明的形式

```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

stylus 中的混合和前两款 Css 预处理器语言的混合略有不同，他可以不使用任何符号，就是直接声明 Mixins 名，然后在定义参数和默认值之间用等号=来连接

```css
error(borderWidth= 2px) {
  border: borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  error(); /* 调用error mixins */
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  error(5px); /* 调用error mixins，并将参数$borderWidth的值指定为5px */
}
```

### 模块化

也是都一样

```css
@import "./common";
@import "./github-markdown";
@import "./mixin";
@import "./variables";
```
