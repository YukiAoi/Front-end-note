# typescript 的接口

## 是什么

接口所描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法

## 使用方式

```ts
interface User {
  name: string;
  age?: number; //可选属性
  readonly isMale: boolean; //只读属性
  say: (words: string) => string; //函数
  [propName: string]: any; //索引签名
}
// 类型推断
const getUserName = (user: User) => user.name;
getUserName({ color: "yellow" } as User);

// 继承
interface Father {
  color: String;
}

interface Mother {
  height: Number;
}

interface Son extends Father, Mother {
  name: string;
  age: Number;
}
```
