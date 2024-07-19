# dom

## 是什么

DOM 是 HTML 和 XML 文档的编程接口

它将文档表示为一个结构化的节点树，使开发者能够通过编程方式访问和操作文档的内容、结构和样式

DOM 节点包含其他节点：

- 元素节点
- 文本节点
- 属性节点
- 注释节点

## 操作

DOM 常见的操作，分为：

- 创建节点
- 查询节点
- 更新节点
- 添加节点
- 删除节点

### 创建节点

#### createElement

创建新元素

```js
const divEl = document.createElement("div");
```

#### createTextNode

创建文本节点

```js
const textEl = document.createTextNode("content");
```

#### createDocumentFragment

创建文档碎片

```js
const fragment = document.createDocumentFragment();
```

#### createAttribute

创建属性节点

```js
const dataAttribute = document.createAttribute("custom");
consle.log(dataAttribute);
```

### 获取节点

#### querySelector

传入任何有效的 css 选择器，即可选中单个 DOM 元素（首个）

```js
document.querySelector(".element");
document.querySelector("#element");
document.querySelector("div");
document.querySelector('[name="username"]');
document.querySelector("div + p > span");
```

如果页面上没有指定的元素时，返回 null

#### querySelectorAll

返回一个包含节点子树内所有与之相匹配的 Element 节点列表，如果没有相匹配的，则返回一个空节点列表

```js
const notLive = document.querySelectorAll("p");
```

该方法返回的是一个 NodeList 的静态实例，它是一个静态的“快照”，而非“实时”的查询

DOM 元素的方法还有如下

```js
document.getElementById("id属性值"); //返回拥有指定id的对象的引用
document.getElementsByClassName("class属性值"); //返回拥有指定class的对象集合
document.getElementsByTagName("标签名"); //返回拥有指定标签名的对象集合
document.getElementsByName("name属性值"); //返回拥有指定名称的对象结合
document / element.querySelector("CSS选择器"); //仅返回第一个匹配的元素
document / element.querySelectorAll("CSS选择器"); //返回所有匹配的元素
document.documentElement; //获取页面中的HTML标签
document.body; //获取页面中的BODY标签
document.all[""]; //获取页面中的所有元素节点的对象集合型
```

### 更新节点

#### innerHTML

不但可以修改一个 DOM 节点的文本内容，还可以直接通过 HTML 片段修改 DOM 节点内部的子树

```js
// 获取<p id="p">...</p >
var p = document.getElementById("p");
// 设置文本为abc:
p.innerHTML = "ABC"; // <p id="p">ABC</p >
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p >的内部结构已修改
```

#### innerText、textContent

自动对字符串进行 HTML 编码，保证无法设置任何 HTML 标签

```js
// 获取<p id="p-id">...</p >
var p = document.getElementById("p-id");
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
```

两者的区别，在于读取属性时，innerText 不返回隐藏元素的文本，而 textContent 返回所有文本

#### style

DOM 节点的 style 属性对应所有的 CSS，可以直接获取或设置。遇到-需要转化为驼峰命名

```js
// 获取<p id="p-id">...</p >
const p = document.getElementById("p-id");
// 设置CSS:
p.style.color = "#ff0000";
p.style.fontSize = "20px"; // 驼峰命名
p.style.paddingTop = "2em";
```

### 添加节点

#### innerHTML

如果这个 DOM 节点是空的，例如，`<div></div>`，那么，直接使用 `innerHTML = '<span>child</span>'`就可以修改 DOM 节点的内容，相当于添加了新的 DOM 节点

如果这个 DOM 节点不是空的，那就不能这么做，因为 innerHTML 会直接替换掉原来的所有子节点

#### appendChild

把一个子节点添加到父节点的最后一个子节点

```js
const js = document.getElementById("js");
js.innerHTML = "JavaScript";
const list = document.getElementById("list");
list.appendChild(js);
```

如果是动态添加新的节点，则先创建一个新的节点，然后插入到指定的位置

```js
const list = document.getElementById("list");
const haskell = document.createElement("p");
haskell.id = "haskell";
haskell.innerText = "Haskell";
list.appendChild(haskell);
```

#### insertBefore

把子节点插入到指定的位置，使用方法如下：

```js
parentElement.insertBefore(newElement, referenceElement);
```

子节点会插入到 referenceElement 之前

#### setAttribute

在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById("id");
div.setAttribute("class", "white"); //第一个参数属性名，第二个参数属性值。
```

### 删除节点

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的 removeChild 把自己删掉

```js
// 拿到待删除节点:
const self = document.getElementById("to-be-removed");
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```

删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置
