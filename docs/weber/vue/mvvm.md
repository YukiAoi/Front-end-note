## 视图模型双向绑定

`MVVM`，是`Model-View-ViewModel`的缩写，也就是把`MVC`中的`Controller`演变成`ViewModel`。`Model`层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到`viewModel`层并自动将数据渲染到页面中，视图变化的时候会通知`viewModel`层更新数据。以前是操作DOM结构更新视图，现在是`数据驱动视图`

### 优点

1. `低耦合`：视图（View）可以独立于Model变化和修改，一个Model可以绑定到不同的View上，当View变化的时候Model可以不变化，当Model变化的时候View也可以不变
1. `可重用性`：你可以把一些视图逻辑放在一个Model里面，让很多View重用这段视图逻辑
1. `独立开发`：开发人员可以专注于业务逻辑和数据的开发(ViewModel)，设计人员可以专注于页面设计
1. `可测试`：界面素来是比较难于测试的，测试可以针对ViewModel来写

### 基本原理

vue.js是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`和`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调
Vue是一个典型的MVVM框架，模型（Model）只是普通的javascript对象，修改它则视图（View）会自动更新

#### Observer（数据监听器）

Observer的核心是通过`Object.defineProprtty()`来监听数据的变动，这个函数内部可以定义`setter`和`getter`，每当数据发生变化，就会触发setter。这时候Observer就要通知Watcher

#### Watcher（订阅者）

Watcher作为Observer和Compile之间通信的桥梁，主要做的事情是：
1. 在自身实例化时往`属性订阅器(dep)`里面添加自己
1. 自身必须有一个`update()`方法
1. 待属性变动`dep.notice()`通知时，能调用自身的`update()`方法，并触发`Compile`中绑定的回调

#### Compile（指令解析器）

Compile主要做的事情是解析模板指令，将模板中变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加鉴定数据的订阅者。一旦数据有变动，收到通知，更新视图

### 如何实现

主要包含两方面：
1. 数据变化更新视图
1. 视图变化更新数据

#### Observer

```js
//判断数据类型是否为Object，是的话实例化Observer
function observe(data){
  if(!data || Object.prototype.toString.call(data) !== 'object'){
    return
  }
  return new Observer(data)
}

function Observer(data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  //遍历所有属性
  walk:function(data){
    Object.keys(data).forEach(key => {
      this.defineReactive(data,key,data[key])
    })
  },
  //添加set和get方法
  defineReactive:function(data,key,val){
    let dep = new Dep()
    //递归
    let children = observe(data)
    Object.defineProperty(data,key,{
      enumerable: true,
      configurable: true,
      get:function(val){
        if(Dep.target){
          dep.addSub(Dep.target)
        }
        return val
      },
      set:function(newVal){
        if(val === newVal){
          return
        }
        val = newVal
        dep.notify()
      }
    })
  }
}

//容纳Observer的容器Dep
function Dep(){
  this.subs = []
}

Dep.property = {
  //将需要监听的属性添加到容器中
  addSub:function(sub){
    this.subs.push(sub)
  },
  //更新数据
  notify:function(){
    this.subs.forEach(sub => {
      //Watcher中的update方法
      sub.update()
    })
  }
}

Dep.target = null
```

#### Watcher

```js
function Watcher(vm,exp,cb){
  this.vm = vm
  this.exp = exp
  this.cb = cb
  // 将自己添加到订阅器
  this.value = this.get()
}

Watcher.prototype = {
  update:function(){
    let value = this.vm.data.[this.exp]
    let oldVal = this.value
    if(value !== oldVal){
      this.value = value
      this.cb.call(this.vm,value,oldVal)
    }
  },
  get:function(){
    //缓存自己
    Dep.target = this
    //执行get方法
    const value = this.vm.data[this.exp]
    //清除缓存 
    Dep.target = null
    return value
  }
}
```

#### Compile

```js
function Compile(el,vm){
  this.vm = vm
  this.el = document.querySelect(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init:function(){
    if(this.el){
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment:function(el){
    let fragment = this.creatDocumentFragment(el)
    let child = el.firstChild
    while(child){
      // 将Dom元素移入fragment中
      fragment.appendChild(child)
      fragment = el.firstChild 
    }
    return fragment
  },
  compileElement:function(el){
    let childNodes = el.childNodes
    //将伪数组转为数组
    [].slice.call(childNodes).forEach(node => {
      const reg = /\{\{(.*)\}\}/
      let text = node.textContent
      if(this.isElmentNode(node)){
        this.compile(node)
      }else if(this.isTextNode(node) && reg.test(text)){
        this.compileText(node,reg.test(text)[1])
      }
      if(node.childNodes && node.childNodes.length){
        this.compileElement(node)
      }
    })
  },
  compile:function(node){
    const nodeAttrs = node.attributes
    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      if(this.isDirective(attrName)){
        const exp = attr.value
        const dir = attrName.substring(2)
        // 事件指令
        if(this.isEventDirective(dir)){
          this.compileEvent(node,this.vm,exp,dir)
        }else{
          //v-model
          this.compileModel(node,this.vm,exp,dir)
        }
        node.remove(attrName)
      }
    })
  },
  compileText(node,exp){
    const initText = this.vm[exp]
    this.updateText(node,initText)
    new Watcher(this.vm,exp,value => {
      this.updateText(node,value)
    })
  },
  compileEvent(node,vm,exp,dir){
    const eventType = dir.split(':')[1],
      cb = vm.methods && vm.methods[exp]
    if(eventType && cb){
      node.addEventListener(eventType,cb.bind(vm),false)
    }
  },
  compileModel(node,vm,exp,dir){
    cosnt val = this.vm[exp]
    this.modelUpdater(node,val)
    new Watcher(this.vm,exp,value => {
      this.modelUpdater(node,value)
    })
    node.addEventListener('input',e => {
      const newVal = e.target.value
      if(val !== newValue){
        this.vm[exp] = newValue
        val = newValue
      }
    })
  },
  updateText(node,value){
    node.textContent = typeof value === 'undefined' ? '' : value
  },
  modelUpdater(node,value){
    node.value = typeof value === 'undefined' ? '': value
  },
  isDirective(attr){
    return attr.indexOf('v-') === 0
  },
  isEventDirective(dir){
    return dir.indexOf('on:') === 0
  },
  isElementNode(node){
    return node.nodeType === 1
  },
  isTextNode(node){
    return node.nodeType === 3
  }
}
```