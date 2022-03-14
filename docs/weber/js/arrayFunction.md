## 数组方法

### 去重

1. Set
1. [...new Set(arr)]
1. 双重循环+splice
1. 新建空数组，indexof判断是否为-1，是就push进新数组
1. sort排序，比较相邻元素是否相同
1. 总结一下，就是两种：1.双重循环，2.自身键不可重复

### 查找元素

1. indexOf，返回下标或-1
1. includes，返回boolean
1. lastIndexOf，返回（最后一次出现的）下标或-1
1. some，返回boolean（是否有符合条件的元素）
1. every，返回boolean（所有元素是否符合条件）
1. filter，返回符合条件的元素组成的数组
1. find，返回符合条件的第一个元素或undefined
1. findIndex，和indexOf一样

### 循环

1. for
1. forEach
1. map
1. forof
1. keys，values，entries（keys是索引，values是值，entris是两个一起）