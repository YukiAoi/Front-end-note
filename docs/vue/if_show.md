# v-show 和 v-if

## 共同点

两者作用是相同的，能控制元素在页面上的显隐，用法也一样

## 区别

- v-show 通过 display 来控制，v-if 是直接添加或移除元素
- v-show 是简单的 css 切换，v-if 会有局部的编译/卸载过程，并会触发生命周期钩子
- v-if 才是真正的条件渲染，在切换过程中会销毁或重建事件监听和子组件
- v-if 有更高的切换消耗，v-show 有更高的首次渲染消耗

## 原理分析

1. v-show
   不管初始条件是什么，总是会被渲染，有 translation 就执行 translation，没有就设置 display 属性

```js
// https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts
export const vShow: ObjectDirective<VShowElement> = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    // ...
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  },
};
```

2. v-if
   因为还有 v-else-if 和 v-else，所以 v-if 比 v-show 复杂得多。返回一个 node 节点，render 函数通过表达式的值来判断是否生成 DOM

```js
// https://github.com/vuejs/vue-next/blob/cdc9f336fd/packages/compiler-core/src/transforms/vIf.ts
export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      // ...
      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          ) as IfConditionalExpression
        } else {
          // attach this branch's codegen node to the v-if root.
          const parentCondition = getParentCondition(ifNode.codegenNode!)
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          )
        }
      }
    })
  }
)
```

## 使用场景

要频繁地切换，就用 v-show，否则用 v-if
