# 单行/多行文本溢出省略

## 单行文本溢出

```html
<p>
  这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p>
<style>
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
```

## 多行文本溢出

### 高度截断

通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文

```html
<div class="demo">这是一段很长的文本</div>
<style>
  .demo {
    position: relative;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }
  .demo::after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 0 10px;
  }
</style>
```

优点：

- 兼容性好
- 响应式截断，根据不同宽度做出调整

文本存在英文的时候，可以设置 word-break: break-all 使一个单词能够在换行时进行拆分

### 行数截断

```html
<p>
  这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
  这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p>
<style>
  p {
    width: 400px;
    border-radius: 1px solid red;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
```

兼容浏览器范围是 PC 端的 webkit 内核的浏览器，由于移动端大多数是使用 webkit，所以移动端常用该形式
