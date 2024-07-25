# 动画

## 有哪些

- transition：渐变动画
- transform：变形动画
- animation：自定义动画

### transition

有以下属性：

- property：需要变化的 css 属性
- duration：完成过渡效果需要的时间单位(s 或者 ms)
- timing-function：完成效果的速度曲线
  - linear：匀速（等于 cubic-bezier(0,0,1,1)）
  - ease：从慢到快再到慢（cubic-bezier(0.25,0.1,0.25,1)）
  - ease-in：慢慢变快（等于 cubic-bezier(0.42,0,1,1)）
  - ease-out：慢慢变慢（等于 cubic-bezier(0,0,0.58,1)）
  - ease-in-out：先变快再到慢（等于 cubic-bezier(0.42,0,0.58,1)），渐显渐隐效果
  - cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值
- delay：动画效果的延迟触发时间

并不是所有的属性都能使用过渡的，如 `display:none<->display:block`

```html
<div class="base"></div>
<style>
  .base {
    width: 100px;
    height: 100px;
    display: inline-block;
    background-color: #0ea9ff;
    border-width: 5px;
    border-style: solid;
    border-color: #5daf34;
    transition-property: width, height, background-color, border-width;
    transition-duration: 2s;
    transition-timing-function: ease-in;
    transition-delay: 500ms;
  }

  /*简写*/
  /*transition: all 2s ease-in 500ms;*/
  .base:hover {
    width: 200px;
    height: 200px;
    background-color: #5daf34;
    border-width: 10px;
    border-color: #3a8ee6;
  }
</style>
```

### transform

四个常用的功能：

1. translate：位移
2. scale：缩放
3. rotate：旋转
4. skew：倾斜

一般配合 transition 使用

transform 不支持 inline 元素，使用前把它变成 block

```html
<div class="base base2"></div>
<style>
  .base {
    width: 100px;
    height: 100px;
    display: inline-block;
    background-color: #0ea9ff;
    border-width: 5px;
    border-style: solid;
    border-color: #5daf34;
    transition-property: width, height, background-color, border-width;
    transition-duration: 2s;
    transition-timing-function: ease-in;
    transition-delay: 500ms;
  }
  .base2 {
    transform: none;
    transition-property: transform;
    transition-delay: 5ms;
  }

  .base2:hover {
    transform: scale(0.8, 1.5) rotate(35deg) skew(5deg) translate(15px, 25px);
  }
</style>
```

### animation

animation 是 8 个属性的简写
| 属性 | 描述 | 属性值 |
| -------------------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| animation-duration | 指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0 | |
| animation-timing-function | 指定动画计时函数，即动画的速度曲线，默认是 "ease" | linear、ease、ease-in、ease-out、ease-in-out |
| animation-delay | 指定动画延迟时间，即动画何时开始，默认是 0 | |
| animation-iteration-count | 指定动画播放的次数，默认是 1 | |
| animation-direction 指定动画播放的方向 | 默认是 normal | normal、reverse、alternate、alternate-reverse |
| animation-fill-mode | 指定动画填充模式。默认是 none | forwards、backwards、both |
| animation-play-state | 指定动画播放状态，正在运行或暂停。默认是 running | running、pauser |
| animation-name | 指定 @keyframes 动画的名称 | |

CSS 动画只需要定义一些关键的帧，@keyframes 用来定义关键帧

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

也可以使用百分比

```css
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

定义好后，直接使用

```css
animation: rotate 2s;
```
