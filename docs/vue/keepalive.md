# Keepalive

## 是什么

是 vue 的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM

keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

keep-alive 可以设置以下 props 属性：

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
- max - 数字。最多可以缓存多少组件实例

```vue
<!-- 基本用法 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)，匿名组件不能被匹配

设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（activated 与 deactivated）：

- 首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted > activated > ... ... > beforeRouteLeave > deactivated
- 再次进入组件时：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated

## 使用场景

当我们在某些场景下不需要让页面重新加载时我们可以使用 keepalive

在路由中设置 keepAlive 属性判断是否需要缓存

```js
{
  path: 'list',
  name: 'itemList', // 列表页
  component (resolve) {
    require(['@/pages/item/list'], resolve)
 },
 meta: {
  keepAlive: true,
  title: '列表页'
 }
}
```

使用 keep-alive

```html
<div id="app" class="wrapper">
  <!-- 需要缓存的视图组件 -->
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <!-- 不需要缓存的视图组件 -->
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```

## 原理分析

```js
// src/core/components/keep-alive.js
// 该组件没有template，而是用了render，在组件渲染的时候会自动执行render函数
export default {
  name: "keep-alive",
  abstract: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number],
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },

  render() {
    /* 获取默认插槽中的第一个组件节点 */
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    /* 获取该组件节点的componentOptions */
    const componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      /* 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag */
      const name = getComponentName(componentOptions);

      const { include, exclude } = this;
      /* 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode */
      if (
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      /* 获取组件的key值 */
      const key =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      /*  拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存 */
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        /* 如果没有命中缓存，则将其设置进缓存 */
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  },
};
```

```js
// this.cache是一个对象，用来存储需要缓存的组件，它将以如下形式存储：
this.cache = {
  key1: "组件1",
  key2: "组件2",
  // ...
};
```

```js
// 在组件销毁的时候执行pruneCacheEntry函数
function pruneCacheEntry(
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key];
  /* 判断当前没有处于被渲染状态的组件，将其销毁*/
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}
```

```js
// 在mounted钩子函数中观测 include 和 exclude 的变化，如下：
mounted () {
  this.$watch('include', val => {
    pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
    pruneCache(this, name => !matches(val, name))
  })
}
```

```js
// 如果include或exclude发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行pruneCache函数
// 在该函数内对this.cache对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配，如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，则调用pruneCacheEntry函数将其从this.cache对象剔除即可
function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance;
  for (const key in cache) {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
```

keep-alive 的最强大缓存功能是在 render 函数中实现

```js
// 首先获取组件的key值：
const key =
  vnode.key == null
    ? componentOptions.Ctor.cid +
      (componentOptions.tag ? `::${componentOptions.tag}` : "")
    : vnode.key;
```

```js
// 拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存
/* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance;
  /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
  remove(keys, key);
  keys.push(key);
}
```

```js
// this.cache对象中没有该key值的情况
/* 如果没有命中缓存，则将其设置进缓存 */
else {
  cache[key] = vnode
  keys.push(key)
  /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
  if (this.max && keys.length > parseInt(this.max)) {
      pruneCacheEntry(cache, keys[0], keys, this._vnode)
  }
}
```

## 缓存后如何获取数据

有两种方法：

- beforeRouteEnter
- actived

### beforeRouteEnter

每次组件渲染的时候，都会执行 beforeRouteEnter

```js
beforeRouteEnter(to, from, next){
  next(vm=>{
    console.log(vm)
    // 每次进入路由执行
    vm.getData()  // 获取数据
  })
},
```

### actived

在 keep-alive 缓存的组件被激活的时候，都会执行 actived 钩子

```js
activated(){
   this.getData() // 获取数据
},
```

注意：服务器端渲染期间 avtived 不被调用
