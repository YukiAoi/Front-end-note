# Vue 实例挂载过程

- new Vue 的时候会调用`_init` 方法
  - 定义`$set`，`$get`，`$delete`，`$watch` 等方法
  - 定义`$on`，`$off`，`$emit` 等事件
  - 定义`_update`，`$forceUpdate`，`$destroy` 生命周期
- 调用`$mount` 进行挂载
- 挂载的时候主要是使用 `mountComponent` 方法
- 定义 `updateComponent` 更新函数
- 执行 `render` 生成虚拟 `DOM`
- `_update` 将虚拟 `DOM` 生成正式 `DOM`，并渲染到页面
