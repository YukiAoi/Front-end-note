## keep-alive

keep-alive是Vue.js的一个内置组件。它能够让不活动的组件实例保存在内存中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中

### 作用

实现组件缓存，保持这些组件的状态，以避免反复渲染导致的性能问题

### 场景

1. tabs标签页
1. 后台导航
1. vue性能优化

### 原理

`Vue.js`内部将`DOM`节点抽象成了一个个的`VNode`节点，`keep-alive`组件的缓存也是基于`VNode`节点的而不是直接存储`DOM`结构。它将满足条件`（pruneCache与pruneCache）`的组件在`cache`对象中缓存起来，在需要重新渲染的时候再将`vnode`节点从`cache`对象中取出并渲染

### 属性

1. `include`：缓存白名单，keep-alive会缓存命中的组件
1. `exclude`：缓存黑名单，被命中的组件将不会被缓存
1. `max`：缓存组件上限

### 生命周期

1. 用`activated`代替`mounted`
1. 用`deactivated`代替`unmounted`

```vue
<template>
  <div>
    <!-- 动态组件 -->
    <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
      <template :is="currentComponent"></template>
    </keep-alive>
    <!-- vue-router -->
    <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
```

```vue
<!--完整示例-->
<template>
  <div>
    <keep-alive>
      <template v-if="test"></template>
      <template v-else="test"></template>
    </keep-alive>
    <button @click="test=handleClick">请点击</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: true
    }
  },
  methods: {
    handleClick () {
        this.test = !this.test;
    }
  }
}
</script>
```