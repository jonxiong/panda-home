# 手写代码

## 组件实现

## 实现定时数字自

## 简单算法

### 浅拷贝与深拷贝

- 基本数据类型的特点：直接存储在栈(stack)中的数据
- 引用数据类型的特点：存储的是该对象在栈中引用，真实的数据存放在堆内存里

### 求数组交集，并集, 差集

差集：以属于A而不属于B的元素为元素的集合成为A与B的差

es7：Array.prototype.includes

```js
// 并集
let union = a.concat(b.filter(v => !a.includes(v)));
// 交集
let intersection = a.filter(v => b.includes(v));
// 差集
let difference = a.concat(b).filter(v => a.includes(v) && !b.includes(v));
```

es6:
ES6中新增的一个Array.from方法，用于将类数组对象和可遍历对象转化为数组。只要类数组有length长度，基本都可以转化为数组。结合Set结构实现数学集求解

```js
let a = [1, 2, 3]
let b = [2, 4, 5]
let aSet = new Set(a)
let bSet = new Set(b)
// 并集
let union = Array.from(new Set(a.concat(b)));
// 交集
let intersection = Array.from(new Set(a.filter(v => bSet.has(v))));
// 差集
let differenceNew = Array.from(new Set(a.concat(b).filter(v => aSet.has(v) && !bSet.has(v)));
```

### [找出数组中出现次数最多元素，并给出其出现过的位置](https://github.com/zhouxiongking/article-pages/blob/master/articles/maxFrequencyNum/maxFrequencyNum.js)

### [函数的防抖和截流](https://juejin.im/post/5b7b88d46fb9a019e9767405)

### [观察者模式和监听发布者模式](https://www.cnblogs.com/onepixel/p/10806891.html)

## 较难算法

### 大数 加减乘除

### 快速排序算法

### 手写promise, slice

 