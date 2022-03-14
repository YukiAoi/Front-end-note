## diff算法

1. 响应式数据更新后，会触发Watcher的回调函数去更新视图。render函数生成的就是vnode，update函数就是带着vnode跑一次patch
1. 如果不是相同节点，直接销毁旧vnode，添加新vnode
1. 如果是相同节点，尽量复用
1. 如果新vnode是文字vnode，直接替换内容
1. 如果不是，要对子节点进行比较
1. 有新节点就新增，有旧节点就删除，如果都有，就是diff算法的过程了
1. 新旧节点的首尾都会有一个指针进行比较，并向内部收缩，直到没有节点可以进行比较
1. 比较时，会有一个sameVnode函数，通过key来进行比较，看节点是否可用
1. 如果有一项命中，就递归的进入patchVnode针对单个vnode的过程，直到新旧节点有一端相遇（说明都被patch过了）
1. 如果oldStartIndex > oldEndIndex，说明旧节点被patch完了，需要新增
1. 如果newStartIndex > newEndIndex，说明新节点被patch完了，需要删除

### key的作用

1. 提高diff速度
1. 避免就地复用

### 为什么不推荐使用随机数作为key

使用随机数会导致新旧节点的key不同，浪费性能

### 为什么不推荐使用下标作为key

当数组顺序颠倒或者数组内数据被修改时，会造成渲染错误 