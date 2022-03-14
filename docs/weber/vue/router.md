## Vue Router

传统路由是利用超链接来实现页面切换和跳转的，而vue-router在单页面应用中，则是组件之间的切换，即**建立并管理url和对应组件之间的映射关系**
`<router-link>`用来导航，用户点击后切换到相关视图，默认显示为`<a>标签`
`<router-view>`来设置切换的视图渲染在哪里

### \$router和\$route的区别

1. `$router`是指整个路由实例，可以通过`$router.push`向其中添加任意路由对象
1. `$route`是指当前路由实例(`$router`)跳转到的路由对象
1. `$router`可以包含多个`$route`对象，是父子包含关系

### router，routes和route的区别

1. `router`一般指的是路由实例，即`$router`
1. `routes`指`router`的`routes API`，用来配置多个`route`
1. `route`就是路由对象

### vue-router的两种模式

`单页面应用(SPA)`一般是不会请求页面而是只更新视图。vue-router有`hash`和`history`两种模式，可以用`mode`参数来决定使用哪种模式

#### hash模式

vue-router默认使用的是`hash模式`，使用url的hash来模拟一个完整的url，**url变化时，浏览器是不会重新加载的**。因为`hash（即#）`是url的锚点，代表的是网页中的一个位置。**同时hash变化时，url都会被浏览器记录下来，这样就可以使用浏览器的后退了**。
简单来说：**hash模式就是通过改变#后面的值，实现浏览器渲染指定组件**

#### history模式

这种模式利用了`html5 history`新增的`pushState()`和`replaceState()`，除了之前的`back`，`forward`和`go`，这两个新方法可以应用在浏览器历史纪录的增加替换功能上。**F5刷新后，浏览器会访问服务器，如果后台不支持，将会得到一个404页面，解决方法是将404重定向到另一个固定页面**
总而言之：**history模式就是通过pushState()来对浏览器的浏览记录进行修改，来达到不用请求后端来渲染的效果**

### 动态路由

**动态路由本质上就是通过url进行传参**

### 路由对象属性

1. `$route.path`：String类型，当前路由的路径，解析为绝对路径
1. `$route.params`：Object类型，包含了动态片段和全匹配片段，如果没有路由参数，就是空对象
1. `$route.query`：Object类型，表示URL查询参数，如果没有则为空对象
1. `$route.name`：String类型，命名后方便编程式导航，不过每个name都要唯一
1. `$route.hash`：String类型，当前路由的hash值（带\#），没有为空字符串
1. `$route.fullPath`：String类型，完成解析后的URL，包含查询参数和hash
1. `$route.matched`：Array类型，包含当前路由的所有嵌套路径片段的路由记录
1. `$route.redirectedFrom`：如果存在重定向，即为重定向来源的路由的名字

### 用params进行配置

```js
routes:[{
	//动态路径参数,以冒号开头
	path:'/user/:id',
	component:User
}]
```

- 路径参数使用`:`进行标记
- 匹配到一个路由时，参数就会被设置到`this.$route.params`，可以在每个组件中使用
- 同一个路径可以匹配多个路由，匹配的优先级就按照路由的定义顺序，谁先定义，谁的优先级高
- 由于路由参数对组件实例是复用的.例如`:/user/foo`和`/user/bar`在使用路由参数时,复用的都是User组件.此时组件的生命周期钩子不会再被调用。如果你想路径切换时,进行一些初始化操作时,可以用以下两种解决办法:
1. 在组件内监听`$route`对象：
```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
2. 使用2.2版本中的`beforeRouteUpdate 路由守卫`：
```js
  const User = {
    template: '...',
    beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
    }
  }
```

### 通过query进行配置传参

`<router-link to="/user?id=foo">foo</router-link>`
vue-route会自动将?后的id=foo封装进this.$route.query里

### 编程式导航

编程式导航就是在vue组件内部通过`this.$router`访问路由实例，并通过`this.$router.push()`导航到不同的url，进行路由映射。**它的作用和<router-link \:to>是一样的，前提是在routes里配置了对应的路由对象**
想在路由跳转前做点其他事情，例如权限验证等，这时候就可以用编程式导航

### 编程式导航的写法

**path和params是不能同时生效的，否则params会被忽略掉，但是query不会受影响**，因此用`params`传参时，要么是`path`加`:`，要么用命名路由通过`name`和`params`传参

```js
//字符串
this.$router.push('home')

//对象
this.$ruter.push({path:'home'})

//命名路由
this.$router.push({name:'user',params:{userId:2333}})

//带查询参数,变成/register?plan=private
this.$router.push({path:'register',query:{plan:'private'}})
```

### router.replace()

`router.replace`和`router.push`很像，写法一样，但实际效果不一样。push是向history里添加新纪录，而**replace是直接将浏览器的history替换掉**
不想让用户回退到之前的页面，比如权限验证，验证后就不让用户回退到登录页重复验证时，就可以使用`replace`

### router.go(n)

n是个整数，代表在history历史纪录中前进或后退了多少步

### router-link的to

实际上不通过`routes`配置,也可以在`router-link`上通过`to`进行传参
1. `<router-link :to="{ }">`等同于`this.$router.push()`，`path`和`params`是不能同时存在的
2. `<router-link :to="{ }">`和`this.$router.push()`的实际效果也是一样的：
  - **params参数都不会显示在url地址中，除了在路由中通过routes进行配置的**，所以**刷新页面后，params参数就会消失**
  - **query参数可以正常显示在url地址中，刷新也不会消失**
3. `to`可以进行`params`和`query`传参，但页面url并不会发生改变

```vue
<template>
  <!--此时通过name匹配到路由对象shotCat-->
  <router-link :to="{ name:'shotCat',params:{paramId:'hello'},query:{queryId:'world'}}">helloWorld</router-link>
  <!--此时通过path匹配到路由对象shotCat.但是此时`paramId`并不能添加到`$route.params`里,只有`queryId`成功添加到`$route.query`-->
  <router-link :to="{ path:'/shotCat',params:{paramId:'hello'},query:{queryId:'world'}}">helloWorld</router-link>
</template>
```

### 嵌套路由和单组件多视图

**一个**`<router-view>`**对应展示的就是一个组件**，因此实现嵌套路由有两个要点：
1. 路由对象中定义子路由
1. 组件内`<router-view>`的使用

#### 路由对象中定义子路由

```js
const router = new VueRouter({
  routes:[
    {
      path:'/battleship',
      component:Battleship,
      name:'battleship',
      children:[
        {
          //没有匹配到其他子路由时，默认显示这个组件
          path:'',
          component:BattleshipDefault,
          name:'battleshipDefault',
          children:[]
        },
        {
          //此时path等同于'/battleship/yamato'，子路由会继承父路由的路径。但是不能写成path:'/yamato'。因为以 / 开头的嵌套路径会被当作根路径
          path:'yamato',
          component:Yamato,
          name:'yamato'
        },
        {
          path:'musashi',
          component:Musashi,
          name:'musashi'
        }
      ]
    }
  ]
})
```

#### 组件内router-view的使用

```vue
<template>
  <div id="app">
    <div>
      <router-link to="/battleship">/battleship</router-link>
      <router-link to="/battleship/yamato">/battleship/yamato</router-link>
      <router-link to="/battleship/musashi">/battleship/musashi</router-link>
    </div>
    <!--这里展示的是Battleship组件；同样Battleship的<router-view/>也被嵌套在里面-->
    <router-view></router-view>
  </div>
</template>
<script>
  //Battleship的<router-view>里展示的就是子路由yamato，musashi还有default默认组件
  const Battleship = {
    template:`
      <div class="battleship">
        <h2>Battleship的</h2>
        <router-view></router-view> 
      </div>
    `
  }
  const BattleshipDefault = {tempalte:'<div>battleshipDefault</div>'}
  const Yamato = {tempalte:'<div>yamato</div>'}
  const Musashi = {tempalte:'<div>musashi</div>'}
</script>
```

#### 单组件多视图

如果一个组件有多个视图,来展示多个子组件.这个时候就需要用到`命名视图`

```vue
<template>
  <!--这里我们给其中两个视图命名为yamato和musashi。没有设置name的视图,会获得默认命名为default -->
  <div id="app">
    <div>
      <router-link to="/battleship">battleship</router-link>
    </div>
    <router-view ></router-view>
    <router-view name="yamato"></router-view>
    <router-view name="musashi"></router-view>
  </div>
</template>
<script>
//如果有多个视图需要展示时，component需要换成components，写成对象形式。左边的yamato指的就是<router-view>里设置的name="yamato";右边的则指的是下面的组件yamato.
const router = new VueRouter({
  routes: [
    {
      path: '/battleship',
      name:'battleship',
      components: {
        default: iowa,
        yamato: yamato,
        musashi: musashi
      }
    }
  ]
})

const iowa = { template: '<div>iowa</div>' }
const yamato = { template: '<div>yamato</div>' }
const musashi = { template: '<div>musashi</div>' }
</script>
```

### 重定向和别名

#### 重定向配置

**重定向其实就是通过路由拦截path，然后替换url跳转到redirect所指定的路由上**。重定向是通过`routes`来配置的

```js
//从/a重定向到/b
const router = new VueRouter({
	routes:[
		{
      path:'/a',
      redirect:'/b'
    }
	]
})

///从/a重定向到命名为'yamato'的路由
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: { name: 'yamato' }
    }
  ]
})

//也可以是一个方法，动态返回重定向目标：
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: to => {
        // 方法接收目标路由作为参数
        // return重定向的字符串路径/路径对象
        const { hash, params, query } = to
        if (query.to === 'yamato') {
          return { 
            path: '/yamato',
            query: null
          }
        }
        if (hash === '#baz') {
          return {
            name: 'baz',
            hash: ''
          }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    }
  ]
})
```

#### 别名

重定向是替url换路径，达到路由跳转。那别名就是一个路由有两个路径。两个路径都能跳转到该路由。别名是在`rutes`里的`alias`进行配置：

```js
//这时,路径'/logan'和'/wolverine' 都会跳转到A
//当有多个别名时，alias也可以写成数组形式。alias: ['/wolverine', '/xmen'] 
const router = new VueRouter({
  routes: [
    {
      path: '/logan',
      component: Logan,
      alias: '/wolverine'
    }
  ]
})
```

### 路由组件传参
如果想传参的时候，可以更自由，摆脱url的束缚，这时就可以使用rute的props进行解耦（降低耦合度）。提高组件的复用，同时不改变url。

```html
<div id="app">
  <h1>Route props</h1>
  <ul>
    <li><router-link to="/">/</router-link></li>
    <li><router-link to="/hello/you">/hello/you</router-link></li>
    <li><router-link to="/static">/static</router-link></li>
    <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
    <li><router-link to="/attrs">/attrs</router-link></li>
  </ul>
  <router-view></router-view>
</div>
```

```js
const Hello = {
  //使用rute的props传参的时候,对应的组件一定要添加props进行接收,否则根本拿不到传参
  props: ['name'], 
  //如果this.name有值,那么name已经成功成为组件的属性,传参成功
  template: '<div>Hello {{ $route.params}}和{{this.name}}</div>'
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    // 没有传参  所以组件什么都拿不到
    { path: '/', component: Hello }, 
    //布尔模式: props 被设置为 true，此时route.params (即此处的name)将会被设置为组件属性
    { path: '/hello/:name', component: Hello, props: true }, 
    // 对象模式: 此时就和params没什么关系了。此时的name将直接传给Hello组件。注意：此时的props需为静态
    { path: '/static', component: Hello, props: { name: 'world' }}, 
    // 函数模式: 
    // 1.这个函数可以默认接受一个参数即当前路由对象
    // 2.这个函数返回的是一个对象
    // 3.在这个函数里你可以将静态值与路由相关值进行处理
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, 
    { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ]
})

function dynamicPropsFn (route) {
  return {
    name: (new Date().getFullYear() + parseInt(route.params.years)) + '!'
  }
}

new Vue({
  router,
  el: '#app'
})
```

### 路由懒加载

vueRouter的懒加载主要是靠`Vue的异步组件`和`Webpack的代码分割功能`，轻松实现路由组件的懒加载

```js
//此时HelloWorld组件则不需要在第一步import进来
const router = new VueRouter({
  rotes:[
    path:'/',
    name:'helloWorld',
    component:reslove => require(['@/component/helloWorld'],resolve)
  ]
})
```

### 导航守卫
路由导航守卫，通俗点说就是路由钩子。作用也和生命周期钩子类似，在路由跳转过程进行操作控制

#### 导航守卫分类
1. 全局守卫：异步执行，每个路由跳转都会按顺序执行
  - `router.beforeEach` 全局前置守卫，进入路由前调用
  - `router.beforeResolve` 全局解析守卫，在`beforeRouteEnter`调用之后调用
  - `router.afterEach` 全局后置守卫，进入路由后调用，**不支持next()**，只能写成`router.afterEach((to, from) => {})`

  每个守卫接收三个参数：
  - `to`：即将进入的路由对象
  - `from`：当前导航正要离开的路由对象
  - `next`：一个function，一定要调用这个方法来`resolve（解析）`，执行效果依赖`next方法的参数`：
    - `next()`：进行下一个钩子，如果所有钩子执行完了，则导航的状态就是**confirmed**
    - `next(false)`：中断当前导航，如果导航url改变了，url会重置到`from`对应的路由对象
    - `next('/')`或者`next({path:'/'})`：当前的导航被中断，然后跳转到一个不同的地址。可以向`next`传递任意路由对象，且允许设置诸如`replace:true`，`name:home`，之类的选项以及任何用在`router-link`的`to`或`router.push`中的选项
    - `next(error)`：如果传入的是一个`Error`实例，则导航会被中止且该错误会传递给`router.onError`的回调

```js
// 1.在main.js或单独的路由器文件中配置router.js
router.beforeEach((to,from,next) => {
  ...
  next()
})

// 2.组件内部设置
this.$router.beforeEach((to,from,next) => {
  ...
  next()
})

// 3.next()使用说明
router.beforeEach((to,from,next) => {
  // to和from都是路由对象，因此可以获取到路由对象的属性
  // next() 直接进入下一个钩子
  // next(false)  中断导航
  // next('/yamato')或者next({path:'/yamato'}) 跳转到yamato
  // next({path:'/shotcat',name:'shotCat',replace:true,query:{logoin:true}...})
  // next(error)
}).catch(() => {
  // 跳转失败页面
  next({ path: '/error', replace: true, query: { back: false }})
})

// 跳转报错后再回调做点其他操作
router.onError(callback => {
  console.log('报错',callback)
})
```

2. 路由守卫：路由对象的守卫
  - `beforeEnter`：在`rutes`中配置

```js
const router = new VueRouter({
  routes = {
    path:'/yamato',
    component:Yamato,
    beforeEnter:(to,from,next) => {
      // 用法与beforeEach一样
    }
  }
})
```

3. 组件守卫：写在组件内部
  - `beforeRouteEnter`：进入路由前，实例还没有创建，不能获取`this`
  - `beforeRouteUpdate`：路由复用同一个组件时
  - `beforeRouteLeave`：离开当前路由，可以用来保存数据，初始化数据或关闭计时器等

```js
// 在组件内部进行配置，用法也和beforeEach一样
const Yamato = {
  tempalte: `...`,
  beforeRouterEnter(to,from,next){
    // 渲染组件前调用
    // 不能获取this
  },
  beforeRouteUpdate(to,from,next){
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径/battleship/:name，在/foo/yamato和/foo/musashi之间跳转的时候
    // 由于会渲染同样的Battleship组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用
    // 可以获取this
  },
  beforeRouteLeave(to,from,next){
    // 导航离开该组件的对应路由时调用
    // 可以获取this
  }
}
```

### 路由元信息

路由配置中的meat对象

```js
const router = new VueRouter({
  routes:[{
    path:'/battleship',
    component:Battleship,
    children:[
      {
        path:'yamato',
        component:Yamato,
        meta:{
          requiresAuth:true
        }
      }
    ]
  }]
})
```
#### 作用

可以优雅隐性地传递信息，比如可以通过`meta`中的`requiresAuth`来判断是否需要登录验证，如果`meta`里的`requiresAuth`为`true`，则需要判断是否已经登录，没登录就跳转到登录页。如果已登录则继续跳转

```js
router.beforeEach((to, from, next) => {
  // 如果meta.requiresAuth为ture，则返回true。此时，说明进入该路由前需要判断用户是否已经登录 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果没登录，则跳转到登录页
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        // 通过query将要跳转的路由路径保存下来，待完成登录后，就可以直接获取该路径，直接跳转到登录前要去的路由
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
```

### 滚动行为

当切换路由时，可以使页面滚动到你想要的某个地方，或者保持之前的位置
- 这里控制和记住的滚动位置都是仅对整个组件页面而言的，不包含组件里面的其他滚动条
- 路由模式只能是`history`，因为它使用了`history`的`pushState()`

```js
const router = new VueRouter({
  mode:'history',
  routes:[...]
  scrollBehavior(to,from,savePosition){
    // to和from与beforeEach中一样，分别是进入的路由对象和离开的路由对象
    // savePosition：点击前进/后退的记录值{x:?,y:?}
    // return：希望滚动到哪个位置，{x:Number,y:Number}
    // 或者是{selector:String,offset?:{x:Number,y:Number}}
    if(savePosition){
      return savePosition
    }else if(to.hash){
      return {selector:to.hash}
    }else{
      return {x:0,y:0}
    }
  }
})
```