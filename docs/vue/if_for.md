# 为什么不建议 v-if 和 v-for 放在一起使用

## v-for 和 v-if 的优先级

- v-for 比 v-if 高
- 在同一个标签下，列表渲染函数内部每次都会进行一次判断
- 在不同标签下，会先进行判断，在进行列表渲染

## 注意事项

- 不要放在同一个标签，会造成性能浪费
- 可以在 v-for 外面嵌套一层 template，用于 v-if 判断
- 如果循环在内部，可以先过滤掉不需要显示的数据
