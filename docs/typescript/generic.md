# 泛型

## 是什么

定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候再指定类型的一种特性

```ts
// 一个函数，它可接受一个number并返回一个number
function returnItem(para: number): number {
  return para;
}
// 又能接受string并返回一个string
function returnItem(para: string): string {
  return para;
}
// 这时就可以使用泛型
function returnItem<T>(para: T): T {
  return para;
}
```

## 用法

泛型通过<>的形式进行表述，可以用来声明：

- 函数
- 接口
- 类

### 函数

定义泛型的时候，可以一次定义多个类型参数，比如我们可以同时定义泛型 T 和 泛型 U

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, "seven"]); // ['seven', 7]
```

### 接口

```ts
interface ReturnItemFn<T> {
  (para: T): T;
}
```

### 类

使用泛型声明类的时候，既可以作用于类本身，也可以作用于类的成员函数

```ts
class Stack<T> {
  private arr: T[] = [];

  public push(item: T) {
    this.arr.push(item);
  }

  public pop() {
    this.arr.pop();
  }
}

const stack = new Stack<number>();
```

用`<T extends xx>`的方式来实现约束泛型

```ts
type Params = string | number;

class Stack<T> {
  private arr: T[] = [];

  public push(item: T) {
    this.arr.push(item);
  }

  public pop() {
    this.arr.pop();
  }
}

const stack = new Stack<boolean>(); //报错
```

### 索引类型、约束类型

索引类型 keyof T 把传入的对象的属性类型取出生成一个联合类型，这里的泛型 U 被约束在这个联合类型中

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // ok
}
```

为什么需要使用泛型约束，而不是直接定义第一个参数为 object 类型，是因为默认情况 object 指的是{}，而我们接收的对象是各种各样的，一个泛型来表示传入的对象类型，比如 T extends object

### 多类型约束

需要实现两个接口的类型约束：

```ts
interface FirstInterface {
  doSomething(): number;
}

interface SecondInterface {
  doSomethingElse(): string;
}
```

可以创建一个接口继承上述两个接口：

```ts
interface ChildInterface extends FirstInterface, SecondInterface {}
```

```ts
class Demo<T extends ChildInterface> {
  private genericProperty: T;

  constructor(genericProperty: T) {
    this.genericProperty = genericProperty;
  }
  useT() {
    this.genericProperty.doSomething();
    this.genericProperty.doSomethingElse();
  }
}
```
