<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiongyang
 * @Date: 2020-05-27 11:25:45
 * @LastEditors: xiongyang
 * @LastEditTime: 2020-06-02 21:55:00
-->

# 如何搭建一个组件库的开发环境

## 技术选型

### [css 解决方案](https://efe.baidu.com/blog/revisiting-css-preprocessors/)

> CSS 本身的众多缺陷，如书写繁琐（不支持嵌套）、样式易冲突（没有作用域概念）、缺少变量（不便于一键换主题）等不一而足。为了解决这些问题，社区里的解决方案也是出了一茬又一茬，从最早的 CSS prepocessor（SASS、LESS、Stylus）到后来的后起之秀 PostCSS，再到 CSS Modules、Styled-Components 等

### js 解决方案

* [TS](https://www.zhihu.com/question/273619114/answer/369180721)

### 打包工具(rollup vs webpack)

最火爆的当然是需要配置工程师专门配置的webpack, 但是在类库开发领域它有一个强大的对手就是 rollup。

现代市面上主流的库基本都选择了 rollup 作为打包工具，包括Angular React 和 Vue, 作为基础类库的打包工具 rollup 的优势如下:

* Tree Shaking: 自动移除未使用的代码, 输出更小的文件
* Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高
* Config 文件支持通过 ESM 模块格式书写 可以一次输出多种格式:
* 模块规范: IIFE, AMD, CJS, UMD, ESM Development 与 production 版本: .js, .min.js

虽然上面部分功能已经被 webpack 实现了, 但是 rollup 明显引入得更早, 而Scope Hoisting更是杀手锏, 由于 webpack 不得不在打包代码中构建模块系统来适应 app 开发(模块系统对于单一类库用处很小), Scope Hoisting将模块构建在一个函数内的做法更适合类库的打包.

### 代码检测

* ESLint
* TSLint(TS)

### commit 规范

* type: commit 的类型
* feat: 新特性
* fix: 修改问题
* refactor: 代码重构
* docs: 文档修改
* style: 代码格式修改, 注意不是 css 修改
* test: 测试用例修改
* chore: 其他修改, 比如构建流程, 依赖管理.
* scope: commit 影响的范围, 比如: route, component, utils, build...

### 测试工具

业务开发中由于前端需求变动频繁的特性, 导致前端对测试的要求并没有后端那么高, 后端业务逻辑一旦定型变动很少, 比较适合测试.

但是基础类库作为被反复依赖的模块和较为稳定的需求是必须做测试的, 前端测试库也可谓是种类繁多了, 经过比对之后我还是选择了目前最流行也是被三大框架同时选择了的 Jest 作为测试工具, 其优点很明显:

* 开箱即用, 内置断言、测试覆盖率工具, 如果你用 MoCha 那可得自己手动配置 n 多了
* 快照功能, Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件
* 速度优势, Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度

### 快速启动脚手架

* React: create-react-app
* Angular: Angular-Cli
* Vue: Vue-Cli
* San: San-Cli

## 组件设计原则

### 细粒度的考量

> 其中一个设计原则就是单一职责原则,在组件库的开发中同样适用,我们原则上一个组件只专注一件事情,单一职责的组件的好处很明显,由于职责单一就可以最大可能性地复用组件,但是这也带来一个问题,过度单一职责的组件也可能会导致过度抽象,造成组件库的碎片化

> 所谓的单一职责组件要建立在可复用的基础上，对于不可复用的单一职责组件我们仅仅作为独立组件的内部组件即可

### 通用性考量

> 我们要设计的本身就是通用组件库,不同于我们常见的业务组件,通用组件是与业务解耦但是又服务于业务开发的,那么问题来了,如何保证组件的通用性,通用性高一定是好事吗?

> 组件的形态(DOM结构)永远是千变万化的,但是其行为(逻辑)是固定的,因此通用组件的秘诀之一就是将 DOM 结构的控制权交给开发者,组件只负责行为和最基本的 DOM 结构