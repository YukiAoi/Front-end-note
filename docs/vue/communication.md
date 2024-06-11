# 组件通信

## 分类

- 父子组件通信
- 兄弟组件通信
- 祖孙组件通信
- 非关系组件通信

## 通信方案

- props 传递
- $emit 触发自定义事件
- ref
- EventBus
- $parent和$root
- attrs 和 listeners
- provide 和 inject
- Vuex

### props

用于父组件向子组件传值

```vue
<!-- 子组件 -->
<script>
export default {
  props: {
    // 字符串形式
    name: String, // 接收的类型参数
    // 对象形式
    age: {
      type: Number, // 接收的类型为数值
      defaule: 18, // 默认值为18
      require: true, // age属性必须传递
    },
  },
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <child :name="name" :age="age"></child>
</template>
```

### $emit 触发自定义事件

用于子组件向父组件传值

```vue
<!-- 子组件 -->
<script>
export default {
  methods: {
    toFather() {
      this.$emit("add", "good");
    },
  },
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <child @add="addEvent"></child>
</template>
```

### ref

父组件通过 ref 获取子组件的属性或调用子组件的方法

```vue
<!-- 父组件 -->
<template>
  <child ref="child"></child>
</template>
<script>
export default {
  methods: {
    getChild() {
      console.log(this.$refs.child.data.childData);
      this.$refs.child.methods.childEvent();
    },
  },
};
</script>
```

### EventBus

任何情况都能使用

```js
// 创建一个事件总线文件bus.js
/**
 * 注意
 * 1，事件订阅(on)必须在事件广播(on)必须在事件广播(emit)前注册；
   2，取消事件订阅(off)必须跟事件订阅(off)必须跟事件订阅(on)成对出现。 
   3,注意必须在this.$bus.$on() 必须在mounted里面
   使用 this.$bus.$emit()其他同理
   @auther 某个肥猪哈麻批
 */
export default (Vue) => {
  const eventHub = new Vue();
  Vue.prototype.$bus = {
    $on(...event) {
      eventHub.$on(...event);
    },
    $once(...event) {
      eventHub.$once(...event);
    },
    $off(...event) {
      eventHub.$off(...event);
    },
    $emit(...event) {
      eventHub.$emit(...event);
    },
  };
};
```

```js
// main.js
// 全局注册
import BUS from "bus.js";
BUS(Vue);
```

```vue
<!-- components1 -->
<script>
export default {
  mounted() {
    // 监听，eventName要保持唯一性
    this.$bus.$on("eventName", this.eventName());
  },
  beforeDestroy() {
    this.$bus.$off("eventName");
  },
};
</script>
```

```vue
<!-- components2 -->
<script>
export default {
  methods: {
    emitFuc() {
      this.$bus.$emit("eventName", datas);
    },
  },
};
</script>
```

### $parent和$root

通过共同祖辈$parent或者$root 搭建通信桥连

```vue
<!-- brother1 -->
<script>
export default {
  methods: {
    emitFuc() {
      this.$parent.on("eventName", this.eventName());
    },
  },
};
</script>
```

```vue
<!-- brother2 -->
<script>
export default {
  methods: {
    emitFuc() {
      this.$parent.emit("eventName");
    },
  },
};
</script>
```

$root属性指向根Vue实例，$parent 属性指向当前组件的直接父组件实例

### $attrs和$listeners

先留空

### provide 和 inject

- 在祖先组件定义 provide，返回传递的值
- 在后代组件使用 inject 获取

```vue
<!-- 祖先组件 -->
<script>
export default {
  provide() {
    return {
      foo: "foo",
    };
  },
};
</script>
```

```vue
<!-- 子孙组件 -->
<script>
export default {
  inject: ["foo"],
};
</script>
```
