# 自定义指令

## 什么是指令

在 vue 中，以 v-开头的行内属性，都是指令

## 如何实现

自定义指令有全局注册与局部注册

### 全局注册

主要是通过 Vue.directive 方法进行注册

Vue.directive 第一个参数是指令的名字（不需要写上 v-前缀），第二个参数可以是对象数据，也可以是一个指令函数

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus(); // 页面加载完成之后自动让输入框获取到焦点的小功能
  },
});
```

### 局部注册

局部注册通过在组件 options 选项中设置 directive 属性

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
    }
  }
}
```

```vue
<!-- 使用 -->
<input v-focus />
```

## 钩子函数

- bind：只调用一次，指令第一次绑定到元素时调用
- inserted：被绑定元素插入父节点时调用
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
- unbind：只调用一次，指令与元素解绑时调用

所有的钩子函数都有以下参数：

- el：指令所绑定的元素
- binding：一个对象，包含以下 property：
  - name：指令名，不包括 v- 前缀
  - value：指令的绑定值
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用
  - expression：字符串形式的指令表达式
  - arg：传给指令的参数
  - modifiers：一个包含修饰符的对象
- vnode：虚拟节点
- oldVnode：旧的虚拟节点，仅在 update 和 componentUpdated 钩子中可用

除了 el 之外，其它参数都应该是只读的。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行

## 应用场景

- 防止表单重复提交
- 图片懒加载
- 一键 copy

### 防止表单重复提交

```js
// 1.设置v-throttle自定义指令
Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 节流时间
    if (!throttleTime) { // 用户若不设置节流时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
// 2.为button标签设置v-throttle自定义指令
<button @click="sayHello" v-throttle>提交</button>
```

### 懒加载

```js
const LazyLoad = {
  // install方法
  install(Vue, options) {
    // 代替图片的loading图
    let defaultSrc = options.default;
    Vue.directive("lazy", {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc);
      },
      inserted(el) {
        // 兼容处理
        if ("IntersectionObserver" in window) {
          LazyLoad.observe(el);
        } else {
          LazyLoad.listenerScroll(el);
        }
      },
    });
  },
  // 初始化
  init(el, val, def) {
    // data-src 储存真实src
    el.setAttribute("data-src", val);
    // 设置src为loading图
    el.setAttribute("src", def);
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    let io = new IntersectionObserver((entries) => {
      let realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc;
          el.removeAttribute("data-src");
        }
      }
    });
    io.observe(el);
  },
  // 监听scroll事件
  listenerScroll(el) {
    let handler = LazyLoad.throttle(LazyLoad.load, 300);
    LazyLoad.load(el);
    window.addEventListener("scroll", () => {
      handler(el);
    });
  },
  // 加载真实图片
  load(el) {
    let windowHeight = document.documentElement.clientHeight;
    let elTop = el.getBoundingClientRect().top;
    let elBtm = el.getBoundingClientRect().bottom;
    let realSrc = el.dataset.src;
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute("data-src");
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer;
    let prevTime;
    return function (...args) {
      let currTime = Date.now();
      let context = this;
      if (!prevTime) prevTime = currTime;
      clearTimeout(timer);

      if (currTime - prevTime > delay) {
        prevTime = currTime;
        fn.apply(context, args);
        clearTimeout(timer);
        return;
      }

      timer = setTimeout(function () {
        prevTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  },
};
export default LazyLoad;
```

### 复制

```js
import { Message } from "ant-design-vue";

const vCopy = {
  //
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值，也就是我们要 copy 的值
  */
  bind(el, { value }) {
    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意
        Message.warning("无复制内容");
        return;
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement("textarea");
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      // textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand("Copy");
      if (result) {
        Message.success("复制成功");
      }
      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener("click", el.handler);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
};

export default vCopy;
```
