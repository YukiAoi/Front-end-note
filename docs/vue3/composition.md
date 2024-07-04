# 组合式 API

## 为什么要用组合式 API

使用 Vue2 开发的项目，普遍会存在以下问题：

- 代码的可读性随着组件变大而变差
- 每一种代码复用的方式，都存在缺点
- TypeScript 支持有限

以上问题通过使用 Composition Api 都能迎刃而解

## 选项式 API

以 vue 为后缀的文件，通过定义 methods，computed，watch，data 等属性与方法，共同处理页面逻辑

用组件的选项 (data、computed、methods、watch) 组织逻辑在大多数情况下都有效

然而，当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解

## 组合式 API

组件根据逻辑功能来组织，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）

即使项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API

## 对比

主要是两方面的对比：

- 逻辑组织
- 逻辑复用

### 逻辑组织

组合式 API 将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去

```js
function useCount() {
  let count = ref(10);
  let double = computed(() => {
    return count.value * 2;
  });

  const handleConut = () => {
    count.value = count.value * 2;
  };

  console.log(count);

  return {
    count,
    double,
    handleConut,
  };
}
```

组件中使用 count

```js
export default defineComponent({
  setup() {
    const { count, double, handleConut } = useCount();
    return {
      count,
      double,
      handleConut,
    };
  },
});
```

### 逻辑复用

在 Vue2 中，我们是用 mixin 去复用相同的逻辑

```js
export const MoveMixin = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },

  methods: {
    handleKeyup(e) {
      console.log(e.code);
      // 上下左右 x y
      switch (e.code) {
        case "ArrowUp":
          this.y--;
          break;
        case "ArrowDown":
          this.y++;
          break;
        case "ArrowLeft":
          this.x--;
          break;
        case "ArrowRight":
          this.x++;
          break;
      }
    },
  },

  mounted() {
    window.addEventListener("keyup", this.handleKeyup);
  },

  unmounted() {
    window.removeEventListener("keyup", this.handleKeyup);
  },
};
```

然后在组件中使用

```vue
<template>
  <div>Mouse position: x {{ x }} / y {{ y }}</div>
</template>
<script>
import mousePositionMixin from "./mouse";
export default {
  mixins: [mousePositionMixin],
};
</script>
```

使用单个 mixin 问题不大，但是当我们一个组件混入大量不同的 mixins 的时候

```js
mixins: [mousePositionMixin, fooMixin, barMixin, otherMixin];
```

会存在两个问题：

1. 命名冲突
2. 数据来源不清晰

通过 Compositon API 这种方式改写上面的代码：

```js
import { onMounted, onUnmounted, reactive } from "vue";
export function useMove() {
  const position = reactive({
    x: 0,
    y: 0,
  });

  const handleKeyup = (e) => {
    console.log(e.code);
    // 上下左右 x y
    switch (e.code) {
      case "ArrowUp":
        // y.value--;
        position.y--;
        break;
      case "ArrowDown":
        // y.value++;
        position.y++;
        break;
      case "ArrowLeft":
        // x.value--;
        position.x--;
        break;
      case "ArrowRight":
        // x.value++;
        position.x++;
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyup);
  });

  return { position };
}
```

在组件中使用

```vue
<template>
  <div>Mouse position: x {{ x }} / y {{ y }}</div>
</template>

<script>
import { useMove } from "./useMove";
import { toRefs } from "vue";
export default {
  setup() {
    const { position } = useMove();
    const { x, y } = toRefs(position);
    return {
      x,
      y,
    };
  },
};
</script>
```

整个数据来源清晰了，即使去编写更多的 hook 函数，也不会出现命名冲突的问题

## 小结

- 在逻辑组织和逻辑复用方面，组合式 API 优于选项式 API
- 组合式 API 几乎是函数，有更好的类型推断
- 组合式 API 对 tree-shaking 友好，代码也更容易压缩
- 组合式 API中见不到this的使用，减少了this指向不明的情况
- 如果是小型组件，可以继续使用Options API，也是十分友好的
