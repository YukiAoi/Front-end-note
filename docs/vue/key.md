# Key

## 是什么

key 是给每一个 vnode 的唯一 id，也是 diff 的一种优化策略，可以根据 key，更准确， 更快的找到对应的 vnode 节点

## 场景背后的逻辑

使用 v-for 时：

- 如果不用 key，Vue 会采用就地复地原则：最小化 element 的移动，并且会尝试尽最大程度在同适当的地方对相同类型的 element，做 patch 或者 reuse。
- 如果使用了 key，Vue 会根据 keys 的顺序记录 element，曾经拥有了 key 的 element 如果不再出现的话，会被直接 remove 或者 destoryed

用+new Date()生成的时间戳作为 key，手动强制触发重新渲染

- 当拥有新值的 rerender 作为 key 时，拥有了新 key 的 Comp 出现了，那么旧 key Comp 会被移除，新 key Comp 触发渲染

## 设置 key 与不设置 key 的区别

```vue
<template>
  <div>
    <p v-for="item in arr" :key="item">{{ key }}</p>
  </div>
</template>
<script scope>
export default {
  data() {
    return {
      arr: ["a", "b", "c", "d", "e"],
    };
  },
  mounted() {
    setTimeout(() => {
      this.arr.splice(2, 0, "f");
    }, 2000);
  },
};
</script>
```

不使用 key 的情况，vue 会进行这样的操作：

- 比较 A，A，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 B，B，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 C，F，相同类型的节点，进行 patch，数据不同，发生 dom 操作
- 比较 D，C，相同类型的节点，进行 patch，数据不同，发生 dom 操作
- 比较 E，D，相同类型的节点，进行 patch，数据不同，发生 dom 操作
- 循环结束，将 E 插入到 DOM 中

一共发生了 3 次更新，1 次插入操作

在使用 key 的情况，vue 会进行这样的操作：

- 比较 A，A，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 B，B，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 C，F，不相同类型的节点
  - 比较 E、E，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 D、D，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 比较 C、C，相同类型的节点，进行 patch，但数据相同，不发生 dom 操作
- 循环结束，将 F 插入到 C 之前

一共发生了 0 次更新，1 次插入操作

由此可见设置 key 能够大大减少对页面的 DOM 操作，提高了 diff 效率

## 设置 key 值一定能提高 diff 效率吗？

不一定，建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升

## 原理分析

```js
// core/vdom/patch.js

// 这里判断是否为同一个key，首先判断的是key值是否相等如果没有设置key，那么key为undefined，这时候undefined是恒等于undefined
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```

```js
// updateChildren方法中会对新旧vnode进行diff，然后将比对出的结果用来更新真实的DOM
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // ...
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      // ...
    } else if (isUndef(oldEndVnode)) {
      // ...
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // ...
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // ...
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      // ...
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      // ...
    } else {
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      if (isUndef(idxInOld)) {
        // New element
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          oldCh[idxInOld] = undefined;
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // same key but different element. treat as new element
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // ...
}
```
