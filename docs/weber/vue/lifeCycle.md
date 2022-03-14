## 生命周期

### create阶段

vue实例被创建
1. `beforeCreate`：最初调用触发，创建前，此时data和methods中的数据都还没有初始化，data和events都不能用
1. `created`：创建完毕，data中有值，未挂载，data和events已经初始化好，data已经具有响应式；在这里可以发送请求

### mount阶段

vue实例被挂载到真实DOM节点
1. `beforeMount`：在模版编译之后，渲染之前触发，可以发起服务端请求，去数据，ssr中不可用
1. `mounted`：在渲染之后触发，此时可以操作DOM，并能访问组件中的DOM以及$ref，ssr中不可用

### update阶段

当vue实例里面的data数据变化时，触发组件的重新渲染
1. `beforeUpdate`：更新前，在数据变化后，模版改变前触发，切勿使用它监听数据变化
1. `updated`：更新后，在数据改变后，模版改变后触发，常用于重渲染案后的打点，性能检测或触发vue组件中非vue组件的更新

### destroy阶段

vue实例被销毁
1. `beforeDestroy`：实例被销毁前，组件卸载前触发，此时可以手动销毁一些方法，可以在此时清理事件、计时器或者取消订阅操作
1. `destroyed`：卸载完毕后触发，销毁后，可以做最后的打点或事件触发操作

### 组件生命周期

#### 生命周期（父子组件）

父组件beforeCreate --> 父组件created --> 父组件beforeMount --> 子组件beforeCreate --> 子组件created --> 子组件beforeMount --> 子组件 mounted --> 父组件mounted --> 父组件beforeUpdate --> 子组件beforeDestroy --> 子组件destroyed --> 父组件updated

#### 加载渲染过程

父组件beforeCreate --> 父组件created --> 父组件beforeMount --> 子组件beforeCreate --> 子组件created --> 子组件beforeMount --> 子组件mounted --> 父组件mounted

#### 挂载阶段

父组件created --> 子组件created --> 子组件mounted --> 父组件mounted

#### 父组件更新阶段

父组件beforeUpdate --> 父组件updated

#### 子组件更新阶段

父组件beforeUpdate --> 子组件beforeUpdate --> 子组件updated --> 父组件updated

#### 销毁阶段

父组件beforeDestroy --> 子组件beforeDestroy --> 子组件destroyed --> 父组件destroyed