# REACT

* [生命周期](#生命周期)
* [react如何来减少重复render渲染](#react如何来减少重复render渲染)

### 组件
- 函数/无状态/展示组件
- 类/有状态组件

### props与state

### PropTypes

### redux
在React中，组件连接到 redux ，如果要访问 redux，需要派出一个包含 id和负载(payload) 的 action。action 中的 payload 是可选的，action 将其转发给 Reducer。
当reducer收到action时，通过 swithc...case 语法比较 action 中type。 匹配时，更新对应的内容返回新的 state。
当Redux状态更改时，连接到Redux的组件将接收新的状态作为props。当组件接收到这些props时，它将进入更新阶段并重新渲染 UI

## 生命周期
- componentWillMount()
在渲染前调用,在客户端也在服务端，它只发生一次。
- componentDidMount()
在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
- componentWillReceiveProps()
在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
- shouldComponentUpdate()
返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用。
- componentWillUpdate()
在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
- componentDidUpdate()
在组件完成更新后立即调用。在初始化时不会被调用。
- componentWillUnMount()
组件从 DOM 中移除的时候立刻被调用。
- getDerivedStateFromError()
这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。
- componentDidCatch()
这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时记录错误。

## [react如何来减少重复render渲染](https://segmentfault.com/a/1190000016494335)

### 背景：
> 在react开发中，经常会遇到组件重复渲染的问题，父组件一个state的变化，就会导致以该组件的所有子组件都重写render，尽管绝大多数子组件的props没有变化

### react生命周期图

![0](https://image-static.segmentfault.com/394/214/3942143032-5b5a70dfdc45c_articlex)

- 生成期
- 存在期
- 销毁期

需要更改root的一个state，使绿色组件视图更改

![1](https://image-static.segmentfault.com/414/168/4141682109-5ba65acb5fddf_articlex)

如果是vue你会发现组件更新是如上图那样的（视图指令已编译为修改视图的函数存放在绑定的state里的属性里，所以能够做到靶向修改）<br/>
而react会以组件为根，重新渲染整个组件子树，如下图（绿色是期望的render路径，橙色是无用render）

![2](https://image-static.segmentfault.com/274/598/2745986672-5ba65af13e1e0_articlex)

在react里，我们探讨的render性能优化是react调用render的路径如下

![3](https://image-static.segmentfault.com/387/526/3875269066-5ba65b042b8db_articlex)

### 避免不必要的render方法：

- shouldComponentUpdate
**shouldComponentUpdate()**以让React知道当前状态或属性的改变是否不影响组件的输出，默认返回**ture**，返回**false**时不会重写**render**，而且该方法并不会在初始化渲染或当使用forceUpdate()时被调用
- React.PureComponent
**React.PureComponent** 与 **React.Component** 几乎完全相同，但 **React.PureComponent** 通过props和state的浅对比来实现 **shouldComponentUpate()**。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新）

[面试题目](https://juejin.im/post/5cf0733de51d4510803ce34e)

## [react ssr (Server Side Rendering)](https://juejin.im/post/5def0816f265da33aa6aa7fe)

https://juejin.im/post/5c7656b2f265da2dc13c9148