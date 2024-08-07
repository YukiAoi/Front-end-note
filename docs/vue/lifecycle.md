# 生命周期

## 有哪些

| 生命周期      | 描述                         |
| ------------- | ---------------------------- |
| beforeCreate  | 组件实例被创建之初           |
| created       | 组件实例已经完全创建         |
| beforeMount   | 组件挂载之前                 |
| mounted       | 组件挂载到实例上去之后       |
| beforeUpdate  | 组件数据发生变化，更新之前   |
| updated       | 组件数据更新之后             |
| beforeDestroy | 组件实例销毁之前             |
| destroyed     | 组件实例销毁之后             |
| activated     | keep-alive 缓存的组件激活时  |
| deactivated   | keep-alive 缓存的组件停用时  |
| errorCaptured | 捕获一个来自子孙组件的错误时 |

## 具体分析

### beforeCreate

创建前，此时 data 和 methods 中的数据都还没有初始化，data 和 events 都不能用

### created

创建完毕，data 中有值，未挂载，data 和 events 已经初始化好，data 已经具有响应式；在这里可以发送请求

### beforeMount

可以获取 vm.el，此时已经完成初始化，但并没有挂载在 el 上

### mounted

vm.el 已经完成 DOM 的挂载与渲染

### beforeUpdate

更新前，更新的数据必须是被渲染在模板上的，此时视图层还没有更新，并且在 beforeUpdate 中再次修改数据，不会触发更新方法

### updated

完成视图层更新，此时再次更新数据，会触发更新方法

### beforeDestroy

实例被销毁前，此时实例的属性与方法都还可以调用

### destroyed

可以清理实例与其他实例的连接，删除所有指令和监听器。但是没有清除 DOM

## 使用场景分析

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| created       | 组件初始化完毕，各种数据可以使用，常用于异步数据获取         |
| beforeMount   | 未执行渲染、更新，dom 未创建                                 |
| mounted       | 初始化结束，dom 已创建，可用于获取访问数据和 dom 元素        |
| beforeUpdate  | 更新前，可用于获取更新前各种状态                             |
| updated       | 更新后，所有状态已是最新                                     |
| beforeDestroy | 销毁前，可用于一些定时器或订阅的取消                         |
| destroyed     | 组件已销毁，作用同上                                         |

## 数据请求在 created 和 mounted 的区别

created 比 mounted 要早，如果在 mounted 中请求有可能导致页面闪动。但是两者都可以拿到实例对象的属性与方法
