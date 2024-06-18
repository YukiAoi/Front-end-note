# Slot

## 是什么

插槽，就是 solt 在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中 slot 位置）

## 使用场景

主要是复用组件的时候，但是这个组件又有少量的不同，这个时候就可以在这个组件中使用插槽

## 分类

可以分为三类：

- 默认插槽
- 具名插槽
- 作用域插槽

### 默认插槽

```html
<!-- 子组件child.vue -->
<template>
  <slot>
    <p>插槽后备的内容</p>
  </slot>
</template>
```

```html
<!-- 父组件 -->
<child>
  <slot>默认插槽</slot>
</child>
```

### 具名插槽

slot 使用 name 属性来表示插槽的名字，不传就是默认插槽

```html
<!-- 子组件child.vue -->
<template>
  <slot> 插槽后备的内容 </slot>
  <slot name="content">插槽后备的内容</slot>
</template>
```

```html
<!-- 父组件 -->
<child>
  <template v-slot:default>默认插槽</template>
  <template v-slot:content>内容……</template>
</child>
```

### 作用域插槽

父组件中在使用时通过 v-slot:（简写：#）获取子组件的信息，在内容中使用

```html
<!-- 子组件child.vue -->
<template>
  <slot name="footer" testProps="子组件的值">
    <h3>没传footer插槽</h3>
  </slot>
</template>
```

```html
<!-- 父组件 -->
<child>
  <!-- 把v-slot的值指定为作⽤域上下⽂对象 -->
  <template v-slot:default="slotProps">
    来⾃⼦组件数据：{{slotProps.testProps}}
  </template>
  <template #default="slotProps">
    来⾃⼦组件数据：{{slotProps.testProps}}
  </template>
</child>
```

## 小结

- v-slot 属性只能在<template>上使用，但在只有默认插槽时可以在组件标签上使用
- 默认插槽名为 default，可以省略 default 直接写 v-slot
- 缩写为#时不能不写参数，写成#default
- 可以通过解构获取 v-slot={user}，还可以重命名 v-slot="{user: newName}"和定义默认值 v-slot="{user = '默认值'}"

## 原理分析

slot 本质上是返回 VNode 的函数，一般情况下，Vue 中的组件要渲染到页面上需要经过 template -> render function -> VNode -> DOM 过程，看下 slot 是怎么实现的：

```js
// 编写一个buttonCounter组件，使用匿名插槽
Vue.component("button-counter", {
  template: "<div> <slot>我是默认内容</slot></div>",
});
```

```js
// 使用该组件
new Vue({
  el: "#app",
  template: "<button-counter><span>我是slot传入内容</span></button-counter>",
  components: { buttonCounter },
});
```

```js
// 获取buttonCounter组件渲染函数
// _v表示穿件普通文本节点，_t表示渲染插槽的函数
(function anonymous() {
  with (this) {
    return _c("div", [_t("default", [_v("我是默认内容")])], 2);
  }
});
```

```js
// 渲染插槽函数renderSlot（做了简化）
// name属性表示定义插槽的名字，默认值为default，fallback表示子组件中的slot节点的默认值
function renderSlot(name, fallback, props, bindObject) {
  // 得到渲染插槽内容的函数
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  // 如果存在插槽渲染函数，则执行插槽渲染函数，生成nodes节点返回
  // 否则使用默认值
  nodes = scopedSlotFn(props) || fallback;
  return nodes;
}
```

```js
// 关于this.$scopredSlots是什么，我们可以先看看vm.slot
function initRender(vm) {
  // ...
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  // ...
}
```

```js
// resolveSlots函数会对children节点做归类和过滤处理，返回slots
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if (
      (child.context === context || child.fnContext === context) &&
      data &&
      data.slot != null
    ) {
      // 如果slot存在(slot="header") 则拿对应的值作为key
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      // 如果是tempalte元素 则把template的children添加进数组中，这也就是为什么你写的template标签并不会渲染成另一个标签到页面
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // 如果没有就默认是default
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}
```

```js
// _render渲染函数通过normalizeScopedSlots得到vm.$scopedSlots
// 作用域插槽中父组件能够得到子组件的值是因为在renderSlot的时候执行会传入props，也就是上述_t第三个参数，父组件则能够得到子组件传递过来的值
vm.$scopedSlots = normalizeScopedSlots(
  _parentVnode.data.scopedSlots,
  vm.$slots,
  vm.$scopedSlots
);
```
