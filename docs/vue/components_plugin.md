# 组件和插件有什么区别

## 组件是什么

就是将图形和非图形（逻辑）抽象为一个统一的概念，每个 vue 文件都是一个组件
优点：

- 降低耦合度
- 调试方便
- 提高可维护性

## 插件是什么

插件主要用来给 vue 添加全局功能，一般有以下几种：

- 添加全局属性和方法，如 vue-custom-element
- 添加全局资源，如 vue-touch
- 通过全局混入来添加组件选项，如 vue-router
- 通过添加到 Vue.prototype 来添加 vue 实例方法
- 一个库，提供自己的 API，来实现上面的多个功能，如 vue-router

## 区别

主要体现在以下方面：

- 编写形式
- 注册形式
- 使用场景

### 编写形式

#### 组件

最常见的是 vue 文件

```vue
<template></template>
<script>
export default {
  // ...
};
</script>
<style></style>
```

还有 template 属性

```vue
<template id="testComponent">
  <!-- 组件显示的内容 -->
  <div>component!</div>
</template>

<script>
Vue.component("componentA", {
  template: "#testComponent",
  // 组件内容少可以通过这种形式
  // template: `<div>component</div>`,
});
</script>
```

#### 插件

要暴露一个 install 方法，这个方法的第一个参数是 Vue 构造器，第二个参数是可选的选项对象

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  };

  // 2. 添加全局资源
  Vue.directive("my-directive", {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    },
    // ...
  });

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    },
    // ...
  });

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  };
};
```

### 注册形式

#### 组件

##### 全局注册

通过 Vue.component 方法，第一个参数为组件的名称，第二个参数为传入的配置项

```js
Vue.component("my-component-name", {
  // ...
});
```

##### 局部注册

只需在用到的地方通过 components 属性注册一个组件

```js
const component1 = {...} // 定义一个组件

export default {
	components:{
		component1   // 局部注册
	}
}
```

#### 插件

通过 Vue.use()进行注册，第一个参数为插件名字，第二个参数为可选择的配置项

```js
Vue.use("插件名字", {
  /**…… */
});
```

注册插件的时候，需要在调用 new Vue() 启动应用之前完成

Vue.use 会自动阻止多次注册相同插件，只会注册一次

### 使用场景

#### 组件

组件用来构成业务模块，目标是 APP.vue

#### 插件

用来增强技术栈模块，目标是 Vue
