## Vuex

### vuex原理

1. vuex利用vue的mixin混入机制，在beforeCreate前往store注入组件实例，并注册store的引用属性$store
2. vuex的state是响应式的，是借助了vue的data是响应式，getter则是借助了vue的computed实现数据监听

### 核心模块
1. `State`：定义了应用的状态数据  
1. `Getter`：在 store 中定义“getter”（可以认为是 store 的计算属性），就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算  
1. `Mutation`：是唯一更改 store 中状态的方法，且必须是同步函数  
1. `Action`：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作  
1. `Module`：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中

### 创建一个store

一个简单的store，只提供了一个state和mutation

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
const app = createApp({ /* 根组件 */ })
// 将 store 实例作为插件安装
app.use(store)
// 通过store.state 来获取状态对象，并通过 store.commit 方法触发状态变更
store.commit('increment')
console.log(store.state.count) // -> 1
```

在 Vue 组件中， 可以通过`this.$store`访问store实例

```js
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

### State

存储在 Vuex 中的数据和 Vue 实例中的`data`遵循相同的规则

#### 在 Vue 组件中获得 Vuex 状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在`计算属性`中返回某个状态：

```js
computed: {
  count () {
    return store.state.count
  }
}
```

Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。且子组件能通过`this.$store`访问到：

```js
computed: {
  count () {
    return this.$store.state.count
  }
}
```

#### mapState辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。我们可以使用`mapState`辅助函数帮助我们生成计算属性：

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

#### 扩展运算符

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### Getter

getter可以认为是 store 的计算属性。
Getter 接受 state 作为其第一个参数：

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 通过属性访问

Getter 会暴露为`store.getters`对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount (state, getters) {
    return getters.doneTodos.length
  }
}

store.getters.doneTodosCount // -> 1
```

在任何组件中使用：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

**getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的**

#### 通过方法访问

也可以通过让 getter 返回一个函数，来实现给 getter 传参

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

**getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果**

#### mapGetters 辅助函数

`mapGetters`辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果想将一个 getter 属性另取一个名字，使用对象形式：

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### Mutation

mutation类似于事件：每个 mutation 都有一个字符串的**事件类型 (type)**和一个**回调函数 (handler)**。
这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

要唤醒一个 mutation 处理函数，你需要以相应的 type 调用**store.commit**方法：

```js
store.commit('increment')
```

#### 提交载荷（Payload）

可以向`store.commit`传入额外的参数，即 mutation 的**载荷（payload）**：

```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```

#### 对象风格的提交方式

提交 mutation 的另一种方式是直接使用包含 type 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
// 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此处理函数保持不变
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### 在组件中提交 Mutation

可以在组件中使用`this.$store.commit('xxx')`提交 mutation，或者使用`mapMutations`辅助函数将组件中的 methods 映射为`store.commit`调用（需要在根节点注入`store`）

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### Action

`Action`与`Mutation`的不同点在于：
1. Action 提交的是 mutation，而不是直接变更状态
2. Action可以包含异步操作

```js
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用`context.commit`提交一个 mutation，或者通过`context.state`和`context.getters`来获取 state 和 getters。

```js
// 参数解构简化代码
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

#### 分发 Action

Action 通过`store.dispatch`方法触发：

```js
store.dispatch('increment')
```

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

一个购物车示例，涉及到**调用异步API**和**分发多重mutation**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

#### 在组件中分发 Action

在组件中使用`this.$store.dispatch('xxx')`分发 action，或者使用`mapActions`辅助函数将组件的 methods 映射为`store.dispatch`调用（需要先在根节点注入`store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 组合 Action

`store.dispatch`可以处理被触发的 action 的处理函数返回的 Promise，并且`store.dispatch`仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

// 现在可以
store.dispatch('actionA').then(() => {
  // ...
})

// 在另一个action中也可以
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

// 使用async / await组合 action
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

`一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。`

### Module

可以将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块的局部状态

模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  // 模块内部的 getter，根节点状态会作为第三个参数暴露出来
  getters: {
    doubleCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  // 模块内部的 action，局部状态通过context.state暴露出来，根节点状态则为context.rootState
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```