## ES6相关
ECMAScript 6.0
ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现
## babel
- .babelrc
  - presents转码规则例如：**@babel/preset-env || @babel/preset-react**
  - plugins插件

## async
> 它是Generator函数语法糖
async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已

#### async基本用法
> async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

- async函数返回一个 Promise 对象。
- async函数内部return语句返回的值，会成为then方法回调函数的参数。
- async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
#### await

## class:
- 类的所有方法都在类的prototype上。类的实例调用方法就是调用原型上面的方法
- 类内部定义的方法都是不可枚举的,但是es5可以
```js
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
- constructor 默认返回实例对象（即this），完全可以指定返回另外一个对象
```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}
new Foo() instanceof Foo
// false
```
- 类的实例
    - 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上），可以通过hasOwnProperty来判断
> __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性
- 取值函数（getter）和存值函数（setter)
- 属性表达式

注意点：不存在变量提升，但是es5可以

- 静态方法：static(就表示该方法不会被实例继承，而是直接通过类来调用)
    - 静态方法可以与非静态方法重名。

- 实例属性新写法：实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层，不用写this
好处： 所有实例对象自身的属性都定义在类的头部，看上去比较整齐

- 静态属性：静态属性指的是 Class 本身的属性，即Class.propName
```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;
// 新写法
class Foo {
  static prop = 1;
}
```

- 私有方法
    - 命名加以区分_但是不是很保险，外面还是能调用
    - 移出模块
    - symbol
- 私有属性
    - 提案在属性和方法前加上#就被当作私有属性和方法
    - #前面加上static就是静态的私有属性方法

- new.target
    - 子类继承父类时，new.target会返回子类
  
### Module语法
- 概述
```js
// CommonJS模块:实质是整体加载fs模块（即加载fs的所有方法
let { stat, exists, readfile } = require('fs');
// ES6模块:实质是从fs模块加载 3 个方法其他方法不加载
import { stat, exists, readFile } from 'fs';
```
- export
  - export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
- import
  - import命令输入的变量都是只读的，因为它的本质是输入接口,但是，如果a是一个对象，改写a的属性是允许的
  - import命令具有提升效果，会提升到整个模块的头部，首先执行。
  - 模块的整体加载 import * as circle from './circle';
- export default
  - 这时import命令后面，不使用大括号
  - 命令只能使用一次