# 正则表达式

## 是什么

正则表达式是用来匹配字符串的，凡是符合规则的字符串，我们就认为它匹配了，否则，该字符串就是不合法的

构建正则表达式有两种方式：

1. 字面量创建，其由包含在斜杠之间的模式组成

```js
const re = /\d+/g;
```

2. 调用 RegExp 对象的构造函数

```js
const re = new RegExp("\\d+", "g");
const rul = "\\d+";
const re1 = new RegExp(rul, "g");
```

使用构建函数创建，第一个参数可以是一个变量，遇到特殊字符\需要使用\\进行转义

## 匹配方法

- 字符串（str）方法：match、matchAll、search、replace、split
- 正则对象下（regexp）的方法：test、exec

## 应用场景

- 验证 QQ
- 验证电话
- 验证邮箱
- 验证身份证
