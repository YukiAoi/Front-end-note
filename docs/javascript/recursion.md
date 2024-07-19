# 递归

## 什么是递归

函数在内部调用自身本身，这个函数就是递归函数

## 什么是尾递归

尾递归，就是在函数尾位置调用自身

在递归调用的过程当中系统为每一层的返回点、局部量等开辟了栈来存储，递归次数过多容易造成栈溢出

这时候，我们就可以使用尾递归，即一个函数中所有递归形式的调用都出现在函数的末尾，对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误

## 应用场景

### 数组求和

```js
// 递归
function sumArray(arr, total) {
  if (arr.length === 1) {
    return total;
  }
  return sum(arr, total + arr.pop());
}
```

```js
// 尾递归
function factorial2(n, start = 1, total = 1) {
  if (n <= 2) {
    return total;
  }
  return factorial2(n - 1, total, total + start);
}
```

### 数组扁平化

```js
function flat(arr = [], result = []) {
  arr.forEach((v) => {
    if (Array.isArray(v)) {
      result = result.concat(flat(v, []));
    } else {
      result.push(v);
    }
  });
  return result;
}
```

数组对象格式化

```js
function keysLower(obj) {
  let reg = new RegExp("([A-Z]+)", "g");
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let temp = obj[key];
      if (reg.test(key.toString())) {
        // 将修改后的属性名重新赋值给temp，并在对象obj内添加一个转换后的属性
        temp = obj[
          key.replace(reg, function (result) {
            return result.toLowerCase();
          })
        ] = obj[key];
        // 将之前大写的键属性删除
        delete obj[key];
      }
      // 如果属性是对象或者数组，重新执行函数
      if (
        typeof temp === "object" ||
        Object.prototype.toString.call(temp) === "[object Array]"
      ) {
        keysLower(temp);
      }
    }
  }
  return obj;
}
```
