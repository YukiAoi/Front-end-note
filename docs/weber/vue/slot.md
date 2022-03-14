## 插槽

slot就是一个占位的。在2.6中，将`slot标签`更改为`v-slot指令`，只能在`template标签`中使用。vue当中插槽包含三种：
1. 默认（匿名）插槽
1. 具名插槽
1. 作用域插槽

### 默认（匿名）插槽

匿名插槽就是没有名字的slot，只要默认的都是匿名插槽

```html
<template v-slot>
</template>
<template v-slot:default>
</template>
```

### 具名插槽
指的是具有名字的slot，给slot的name属性赋值

```html
<template v-slot:header>
</template>
<template v-slot:footer>
</template>
```

### 作用域插槽
`slot-scope`，可以让父组件访问子组件中的属性

```html
<!-- 假设组件中有
user = {
firstName:'1',
lastName:'2'
} -->
<!-- 无效 -->
<current-user>
  {{ user.firstName }}
</current-user>
<!-- 有效 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

### 缩写语法

```html
<!-- 缩写语法，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用 -->
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

<!-- 进一步缩写 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

<!-- 默认插槽的缩写语法不能与具名插槽混用
无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>

<!-- 只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```