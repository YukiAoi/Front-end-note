## 防抖节流

### 防抖

多次触发事件，事件处理函数只能执行一次，并且是在触发操作结束时执行。也就是说，当一个事件被触发准备执行事件函数前，会等待一定的时间（时间是自己去定义的，比如1秒），如果没有再次被触发，那么就执行。如果被触发了，那就本次作废，重新从新触发的时间开始计算，并再次等待1秒，直到最终执行

```js
/**
 * 防抖函数  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function debounce(fn, delay) {
  //记录上一次的延时器
  var timer = null;
  return function () {
    //清除上一次的演示器
    clearTimeout(timer);
    //重新设置新的延时器
    timer = setTimeout(function(){
      //修正this指向问题
      fn.apply(this);
    }, delay); 
  }
}
document.getElementById('btn').onclick = debounce(function () {
  console.log('按钮被点击了' + Date.now());
}, 1000);
```

### 节流

事件触发后，规定时间内，事件处理函数不能再次被调用。也就是说在规定的时间内，函数只能被调用一次，并且是最先被触发调用的那次

```js
/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function throttle(fn, delay) {
  //记录上一次函数触发的时间
  var lastTime = 0;
  return function(){
    //记录当前函数触发的时间
    var nowTime = Date.now();
    if(nowTime - lastTime > delay){
      //修正this指向问题
      fn.call(this);
      //同步执行结束时间
      lastTime = nowTime;
    }
  }
}

document.onscroll = throttle(function () {
  console.log('scllor事件被触发了' + Date.now());
}, 200); 
```

### 使用场景

#### 节流

1. 滚动加载更多
1. 搜索框的搜索联想功能
1. 高频点击
1. 表单重复提交

#### 防抖

1. 邮箱验证输入检测
1. 窗口大小后重新渲染