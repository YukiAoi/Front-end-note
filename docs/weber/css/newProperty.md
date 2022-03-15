## CSS3新特性

1. 边框 `border-image: url(border.png)`
1. 背景
1. 文字
1. 渐变
1. Filter（滤镜）
1. 弹性布局、栅格布局、多列布局
1. 媒体查询
1. 选择器:nth-of-type()
1. 阴影
```css
.a{
  /* 文字阴影: (水平阴影，垂直阴影，模糊距离，阴影颜色) */
  text-shadow: 2px 2px 2px #000; 
  /* 盒子阴影 */
  box-shadow: 10px 10px 5px #999;
}
```
10. 过渡
```css
/*所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒*/ 
.a{
  transition：all,.5s
}
```
11. 动画
```css
/* animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running） */
/*执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
.a{
  animation: logo2-line 2s linear;
}
```
12. 形状转换
```css
/* transform:适用于2D或3D转换的元素
transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0) */
.a{
  transform:translate(30px,30px);
  transform:rotate(30deg);
  transform:scale(.8);
}
```