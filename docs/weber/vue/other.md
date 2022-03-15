## 其他

### 组件中的data为什么是一个函数？

1. 一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。
2. 如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### 为什么v-for和v-if不建议用在一起

1. 当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费 
2. 这种场景建议使用 computed，先对数据进行过滤

注意：3.x 版本中 `v-if` 总是优先于 `v-for` 生效。由于语法上存在歧义，建议避免在同一元素上同时使用两者。比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。

### 修饰符

#### .sync
可以在子组件中修改`props`中属性的值
```html
<!-- 父组件 -->
<text-document :title.sync="title"></text-document>
```
```js
// 子组件
this.$emit('update:title', newTitle)
```

#### .stop
阻止单击事件继续传播
```html
<a @click.stop="doThis"></a>
```

#### .prevent
提交事件不再重载页面
```html
<form @submit.prevent="onSubmit"></form>
```

#### .self
只当在`event.target`是当前元素自身时触发处理函数 即事件不是从内部元素触发的
```html
<div @click.self="doThat">...</div>
```

### 自定义指令
```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

### vue3 teleport

1. 瞬移组件，to属性后面是要瞬移的标签
2. disabled，禁用瞬移功能
3. 不论是否瞬移，都可以取到teleport的子组件中的数据
4. 根据teleport的顺序进行挂载
5. 原理就是将teleport中的children挂载到to的DOM中