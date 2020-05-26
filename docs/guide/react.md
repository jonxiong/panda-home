# REACT
## [面试题目](https://juejin.im/post/5cf0733de51d4510803ce34e)

### 组件
- 函数/无状态/展示组件
- 类/有状态组件

### props与state

### PropTypes

### redux
在React中，组件连接到 redux ，如果要访问 redux，需要派出一个包含 id和负载(payload) 的 action。action 中的 payload 是可选的，action 将其转发给 Reducer。
当reducer收到action时，通过 swithc...case 语法比较 action 中type。 匹配时，更新对应的内容返回新的 state。
当Redux状态更改时，连接到Redux的组件将接收新的状态作为props。当组件接收到这些props时，它将进入更新阶段并重新渲染 UI

### 生命周期
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
