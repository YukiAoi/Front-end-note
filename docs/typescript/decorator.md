# 装饰器

## 是什么

可以不改变原类和使用继承的情况下，动态地扩展对象功能

@expression 的形式其实是 Object.defineProperty 的语法糖

expression 求值后必须也是一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入

## 使用方法

装饰器是 typescript 的一个实验性特征，使用的话需要在 tsconfig.json 重启用

```ts
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

装饰器可以用于：

- 类
- 方法/属性
- 参数
- 访问器

### 类装饰器

```ts
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person {
  name: string;
  age!: number;
  constructor() {
    this.name = "huihui";
  }
}

let person = new Person();

console.log(person.age); // 18
```

### 方法/属性装饰器

同样，装饰器可以用于修饰类的方法，这时候装饰器函数接收的参数变成了：

- target：对象的原型
- propertyKey：方法的名称
- descriptor：方法的属性描述符

这三个属性实际就是 Object.defineProperty 的三个参数，如果是类的属性，则没有传递第三个参数

```ts
// 声明装饰器修饰方法/属性
function method(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
}

function property(target: any, propertyKey: string) {
  console.log("target", target);
  console.log("propertyKey", propertyKey);
}

class Person {
  @property
  name: string;
  constructor() {
    this.name = "huihui";
  }

  @method
  say() {
    return "instance method";
  }

  @method
  static run() {
    return "static method";
  }
}

const xmz = new Person();

// 修改实例方法say
xmz.say = function () {
  return "edit";
};
```

### 参数装饰器

接收 3 个参数，分别是：

- target ：当前对象的原型
- propertyKey ：参数的名称
- index：参数数组中的位置

```ts
function logParameter(target: Object, propertyName: string, index: number) {
  console.log(target);
  console.log(propertyName);
  console.log(index);
}

class Employee {
  greet(@logParameter message: string): string {
    return `hello ${message}`;
  }
}
const emp = new Employee();
emp.greet("hello");
```

### 访问器装饰器

使用方式与方法装饰器一致

```ts
function modification(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
}

class Person {
  _name: string;
  constructor() {
    this._name = "huihui";
  }

  @modification
  get name() {
    return this._name;
  }
}
```

### 装饰器工厂

如果想要传递参数，使装饰器变成类似工厂函数，只需要在装饰器函数内部再函数一个函数即可

```ts
function addAge(age: number) {
  return function (constructor: Function) {
    constructor.prototype.age = age;
  };
}

@addAge(10)
class Person {
  name: string;
  age!: number;
  constructor() {
    this.name = "huihui";
  }
}

let person = new Person();
```

### 执行顺序

当多个装饰器应用于一个声明上，将由上至下依次对装饰器表达式求值，求值的结果会被当作函数，由下至上依次调用

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// 输出
f(): evaluated
g(): evaluated
g(): called
f(): called
```