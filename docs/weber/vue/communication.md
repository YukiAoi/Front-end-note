## 组件通信

1. `props`和`$emit`
1. 父子组件实例`parent`，`children`
1. 组件实例`$refs`
1. `provide`，`inject`，官方不推荐使用
1. `eventBus`，事件总线
1. `vuex`

### props和$emit

```vue
<!-- 子组件 -->
<template>
  <div class="train-city">
    <h3>父组件传给子组件的toCity:{{sendData}}</h3> 
    <button @click='select(`大连`)'>点击此处将‘大连’发射给父组件</button>
  </div>
</template>
<script>
  export default {
    name:'trainCity',
    props:['sendData'], // 用来接收父组件传给子组件的数据
    methods:{
      select(val) {
        let data = {
          cityName: val
        };
        this.$emit('showCityName',data);//select事件触发后，自动触发showCityName事件
      }
    }
  }
</script>

<!-- 父组件 -->
<template>
  <div>
    <div>父组件的toCity{{toCity}}</div>
    <train-city @showCityName="updateCity" :sendData="toCity"><train-city>
  </div>
</template>
<script>
  export default {
    name:'index',
    components: {},
    data () {
      return {
        toCity:"北京"
      }
    },
    methods:{
      updateCity(data){//触发子组件城市选择-选择城市的事件
        this.toCity = data.cityName;//改变了父组件的值
        console.log('toCity:'+this.toCity)
      }
    }
  }
</script>
```

### eventBus事件总线

```js
// a组件$emit('事件名','事件参数')
// b组件mounted的时候用$on监听并调用要执行的事件
// b组件beforeCreate的时候用$off卸载
const eventHub = new Vue();
Vue.prototype.$bus = {
  $on(...event) {
    eventHub.$on(...event)
  },
  $off(...event) {
    eventHub.$off(...event)
  },
  $emit(...event) {
    eventHub.$emit(...event)
  }
}
```