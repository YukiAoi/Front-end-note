## 常见的兼容性问题

1. 不同浏览器的标签默认的margin和padding不一样。
`{margin:0;padding:0;}`
2. IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。将其转化为行内属性。
`hack：display:inline;`
3. 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置`overflow:hidden`;或者设置行高`line-height小于你设置的高度`。
4. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示。`-webkit-text-size-adjust: none;`
5. 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:
`L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}`