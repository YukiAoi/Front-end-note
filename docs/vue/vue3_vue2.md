# vue3 和 vue2 地区别

## Vue3 介绍

- 利用新的语言特性(es6)
- 解决架构问题

## 哪些变化

- 速度更快
- 体积减少
- 更易维护
- 更接近原生
- 更易使用

### 速度更快

- 重写了虚拟 Dom 实现
- 编译模板的优化
- 更高效的组件初始化
- undate 性能提高 1.3~2 倍
- SSR 速度提高了 2~3 倍

### 体积更小

通过 webpack 的 tree-shaking 功能，可以将无用模块“剪辑”，仅打包需要的模块

使用 tree-shaking，有两大好处：

1. 对开发人员来说，能够对 vue 实现更多其他的功能，而不必担忧整体体积过大
2. 对使用者来说，打包出来的包体积变小了

### 更易维护

#### compositon API（组合式 API）

- 可与现有的 Options API（选项式）一起使用
- 灵活的逻辑组合与复用
- Vue3 模块可以和其他框架搭配使用

#### 更好的 Typescript 支持

Vue3 是基于 typescipt 编写的，可以享受到自动的类型定义提示

### 编译器重写

### 更接近原生

可以自定义渲染 API

### 更易使用

- 暴露响应式 Api
- 轻松识别组件重新渲染原因

## 新增特性

- framents
- Teleport
- composition Api
- createRenderer

#### framents

在 Vue3.x 中，组件现在支持有多个根节点

```vue
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

#### Teleport
