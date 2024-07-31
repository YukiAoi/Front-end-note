# 类

## 是什么

类是面向对象编程的核心概念

类可以包含属性（字段）和方法（函数），并且支持继承、封装、多态等面向对象编程的特性

## 用法

```ts
// 声明
class Animal {
  // 字段
  gender: string;

  // 构造函数
  constructor(gender: string) {
    this.gender = gender;
  }

  // 方法
  move(distanceInMeters: number = 0): void {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

// 继承
class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// 重写（类继承后，子类可以对父类的方法重新定义）
class Cat extends Animal {
  move(distanceInMeters: number = 0): void {
    Animal.move(); // 调用父类的函数
    console.log(`Cat run ${distanceInMeters}meters.`);
  }
}
```

## 修饰符

- public: 默认修饰符，成员可以被任意访问
- private: 成员只能在类内部访问
- protected: 成员可以在类内部及其子类中访问

```ts
class Car {
  public make: string;
  private model: string;
  protected year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo() {
    return `${this.make} ${this.model} (${this.year})`;
  }
}

let car = new Car("Toyota", "Corolla", 2020);
console.log(car.make); // 输出: Toyota
console.log(car.getCarInfo()); // 输出: Toyota Corolla (2020)
// console.log(car.model); // 错误: 属性“model”为私有属性，只能在类“Car”中访问
// console.log(car.year); // 错误: 属性“year”为受保护属性，只能在类“Car”及其子类中访问
```

## 静态成员

静态成员（属性或方法）属于类本身，而不是类的实例。使用 static 关键字来定义静态成员

```ts
class MathUtils {
  static PI: number = 3.14;

  static calculateArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // 输出: 3.14
console.log(MathUtils.calculateArea(5)); // 输出: 78.5
```

## 抽象类

抽象类是不能被实例化的类，用于作为其他类的基类（用来被派生的类）

抽象类中可以包含抽象方法，这些方法必须在派生类中实现

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}

let dog = new Dog();
dog.makeSound(); // 输出: Bark
dog.move(); // 输出: Moving...
```
