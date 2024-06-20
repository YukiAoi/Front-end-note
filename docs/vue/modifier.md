# 修饰符

## 是什么

在 Vue 中，修饰符处理了许多 DOM 事件的细节，让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理

vue 中修饰符分为以下五种：

- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键值修饰符
- v-bind 修饰符

## 作用

### 表单修饰符

- lazy
- trim
- number

#### lazy

填完信息后，光标离开标签，才会把值赋给 value，也就是在 change 事件后才进行数据同步

#### trim

过滤用户输入的首位空格

#### number

将输入的值转换为 number，如果无法被 parseFloat 解析，则返回原来的值

### 事件修饰符

对事件捕获以及目标进行了处理，有如下修饰符：

- stop
- prevent
- self
- once
- capture
- passive
- native

#### stop

阻止了事件冒泡，相当于调用了 event.stopPropagation

```vue
<div @click="shout(2)">
  <button @click.stop="shout(1)">ok</button>
</div>
<!-- 只输出1 -->
```

#### prevent

阻止了事件的默认行为，相当于调用了 event.preventDefault

```vue
<form v-on:submit.prevent="onSubmit"></form>
```

#### self

只当在 event.target 是当前元素自身时触发处理函数

```vue
<!-- 修饰符的顺序很重要，@click.prevent.self会阻止所有事件，@click.self.prevent只会阻止对自身的事件 -->
<div @click.self="doThat"></div>
<div @click.prevent.self="stopAll"></div>
<div @click.self.prevent="stopSelf"></div>
```

#### once

事件只能触发一次

```vue
<button @click.once="shout(1)">ok</button>
```

#### capture

使事件从包含这个元素的顶层开始往下触发

```html
<!-- 输出结构: 1 2 4 3 -->
<div @click.capture="shout(1)">
  obj1
  <div @click.capture="shout(2)">
    obj2
    <div @click="shout(3)">
      obj3
      <div @click="shout(4)">obj4</div>
    </div>
  </div>
</div>
```

#### passive

在移动端，监听滚动事件的时候会一直触发 onscroll。使用这个修饰符，就相当于给 onscroll 加了个 lazy

```vue
<!-- 不要把 .passive 和 .prevent 一起使用,因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告 -->
<div @scroll.passive="onScroll"></div>
```

#### native

让组件变成像 html 内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件

```vue
<my-component v-on:click.native="doSomething"></my-component>
```

使用.native 修饰符来操作普通 HTML 标签是会令事件失效的

### 鼠标修饰符

- left，左键点击
- right，右键点击
- middle，中键点击

```vue
<button @click.left="shout(1)">ok</button>
<button @click.right="shout(1)">ok</button>
<button @click.middle="shout(1)">ok</button>
```

### 键盘修饰符

keyCode 存在很多，但 vue 为我们提供了别名，分为以下两种：

- 普通键（enter、tab、delete、space、esc、up……）
- 系统修饰键（ctrl、alt、meta、shift……）

```vue
<input type="text" @keyup.keyCode="shout()" />
```

```js
// 设置键盘码别名
Vue.config.keyCodes.f2 = "113";
```

### v-bind 修饰符

主要是为属性进行操作：

- sync
- prop
- camel

#### sync

能对 props 进行双向绑定

```vue
<!-- 父组件 -->
<comp :myMessage.sync="bar"></comp>
<!-- 相当于这种写法 -->
<comp :myMessage="bar" @update:myMessage="bar"></comp>
```

```js
// 子组件
this.$emit("update:myMessage", "params");
```

#### prop

设置自定义标签属性，避免暴露数据，防止污染 HTML 结构

```vue
<input id="uid" title="title1" value="1" :index.prop="index"></input>
```

#### camel

变为驼峰命名法，如将 view-box 变为 viewBox

```vue
<svg :viewBox="viewBox"></svg>
```
