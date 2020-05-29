# [virtualDom](https://juejin.im/post/5d5d32e251882545e41e655d)

> Virtual DOM是对DOM的抽象,本质上是JavaScript对象,这个对象就是更加轻量级的对DOM的描述
### 为啥要用VD
- DOM性能瓶颈
- 无需手动操作
- 跨平台

### Virtual DOM 的diff

### Virtual DOM的大致工作原理
- 将整个DOM副本保存为虚拟DOM
- 每当有更新时，它都会维护两个虚拟DOM，以比较之前的状态和当前状态，并确定哪些对象已被更改。
- 它通过比较两个虚拟DOM 差异，并将这些变化更新到实际DOM
- 一旦真正的DOM更新，它也会更新UI

### [网上都说操作真实DOM慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/53544875)