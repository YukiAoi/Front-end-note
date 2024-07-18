# 类型转换机制

## 常见的类型转换

- 显式转换
- 隐式转换

## 显式转换

常见的方法有：

- Number()
- parseInt()
- String()
- Boolean()

### Number()

```js
// 数字字符串
Number("123"); // 123
Number("123.45"); // 123.45

// 空字符串
Number(""); // 0

// 包含空白字符的字符串
Number(" 123 "); // 123

// 非数字字符串
Number("abc"); // NaN

// 数字和非数字字符的字符串
Number("123abc"); // NaN

// 布尔值
Number(true); // 1
Number(false); // 0

// Null 和 Undefined 转换
Number(null); // 0
Number(undefined); // NaN

// 空数组
Number([]); // 0

// 包含一个数字元素的数组
Number([123]); // 123

// 包含多个元素或非数字元素的数组
Number([1, 2, 3]); // NaN
Number(["a", "b"]); // NaN

// 普通对象
Number({}); // NaN

// 特殊数值
Number(Infinity); // Infinity
Number(-Infinity); // -Infinity
```

### parseInt()

parseInt 函数逐个解析字符，遇到不能转换的字符就跳过

```js
parseInt("32a3"); //32
```

### String()

```js
// 数字
String(1); // "1"

// 字符串
String("a"); // "a"

// 布尔值
String(true); // "true"
String(false); // "false"

// undefined 和 null
String(undefined); // "undefined"
String(null); // "null"

// 对象
String({ a: 1 }); // "[object Object]"

// 数组
String([1, 2, 3]); // "1,2,3"
String([123]); // "123"
```

### Boolean()

```js
Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(""); // false
Boolean({}); // true
Boolean([]); // true
Boolean(new Boolean(false)); // true
```

## 隐式转换

发生隐式转换的场景：

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）

### 自动转换为布尔值

在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用 Boolean 函数

以下几种都会转换成 false，其他为 true：

- undefined
- null
- false
- +0
- -0
- NaN
- ""

### 自动转换为字符串

遇到预期为字符串的地方，就会将非字符串的值自动转为字符串

具体规则是：先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串

常发生在`+`运算中，一旦存在字符串，则会进行字符串拼接操作

```js
"5" + 1; // '51'
"5" + true; // "5true"
"5" + false; // "5false"
"5" + {}; // "5[object Object]"
"5" + []; // "5"
"5" + function () {}; // "5function (){}"
"5" + undefined; // "5undefined"
"5" + null; // "5null"
```

### 自动转换成数字

除了`+`有可能把运算值转为字符串，其他运算符都会把运算值自动转成数字

```js
"5" - "2"; // 3
"5" * "2"; // 10
true - 1; // 0
false - 1; // -1
"1" - 1; // 0
"5" * []; // 0
false / "5"; // 0
"abc" - 1; // NaN
null + 1; // 1
undefined + 1; // NaN
```

null 转为数值时，值为 0 。undefined 转为数值时，值为 NaN
