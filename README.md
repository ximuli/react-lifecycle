原文链接：https://juejin.cn/post/7102190736384196644/

首先让我们使用 Vite 来创建一个新的 React 项目。

```
npm init vite@latest
```

React 版本：18.0.0


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9df46f02f6045eb8880f3b633f74eeb~tplv-k3u1fbpfcp-watermark.image?)

按照提示的命令把项目跑起来。

# React 生命周期钩子

根据官网的顺序我们开始在不同的生命周期里写一些 log 

## 挂载 Mounting

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b50766af12ce4e47b873afb1395c55c7~tplv-k3u1fbpfcp-watermark.image?)

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

constructor() ->
static getDerivedStateFromProps()
->
render()
->
componentDidMount()

1. 首先是 constructor() 。

我们新建一个 Count.jsx 组件， 并修改 App.jsx ，将 Count 组件引入。

```js
// Count.jsx
import React, { Component } from 'react'

export default class Count extends Component {
  constructor(props) {
    // 必须先调用 super
    super(props)
    console.log('constructor')
  }
  render() {
    return (
      <div>Count</div>
    )
  }
}

```

```js
// App.jsx
import Count from './Count'

function App() {
  return (
    <Count />
  )
}

export default App
```
此时意外地发现， 'constructor' 被打印了两次。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ae22769f4c4981b374ba57712f0f9e~tplv-k3u1fbpfcp-watermark.image?)

经过搜索后知道原来是因为严格模式，这里先不做赘述，直接把严格模式去掉就正常了。

我们关注生命周期。

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 删除这里的严格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```


2. 然后是 static getDerivedStateFromProps()

```js
import React, { Component } from 'react'

export default class Count extends Component {
  constructor(props) {
    // 必须先调用 super
    super(props)
    console.log('constructor')
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
  }
  render() {
    return (
      <div>Count</div>
    )
  }
}
```
直接写发现会报两个错误：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3075b96156aa468e96010599859560b2~tplv-k3u1fbpfcp-watermark.image?)

大意是必须在 constructor 中初始化 state ，另外就是此生命周期必须返回 state 对象或者 null。

行吧，那就加两行代码。

```js
import React, { Component } from 'react'

export default class Count extends Component {
  constructor(props) {
    // 必须先调用 super
    super(props)
    console.log('constructor')
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    // 必须返回 state 对象或者 null
    return state
  }
  render() {
    return (
      <div>Count</div>
    )
  }
}
```

3. 接下来是 render()

这倒是没什么意外，直接在 `render()`里打印 'render'

4. componentDidMount()

这也没什么意外，直接在 `componentDidMount()`里打印 'componentDidMount'

通常在这里发起网络请求获取数据。

## 更新 Updating

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2841993025054258b1b73afe069d604f~tplv-k3u1fbpfcp-watermark.image?)

当组件的 props 或 state 发生变化时会触发更新。

我们先来改写一下 Count.jsx 以做一个更新组件状态的功能，页面展示一个数值，然后来一个按钮，点击按钮数值自动加 1，代码如下：

```js
import React, { Component } from 'react'

export default class Count extends Component {
  constructor(props) {
    // 必须先调用 super
    super(props)
    console.log('constructor')
    this.state = {
      count: 0
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    // 必须返回 state 对象或者 null
    return state
  }
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    console.log('render')
    return (
      <div>
        <h1>Count 组件</h1>
        <p>数值：{ this.state.count }</p>
        <button onClick={ this.clickHandler }>点击递增</button>
      </div>
    )
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
}
```

组件更新时生命周期的调用顺序如下：

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()

```js
shouldComponentUpdate(nextProps, nextState) {
  console.log('shouldComponentUpdate')
  // 必须返回布尔值，默认为true
  return true
}
```
如果 shouldComponentUpdate() 返回 false，则不会调用 render()。


3. render()
4. getSnapshotBeforeUpdate()

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
  console.log('getSnapshotBeforeUpdate')
  // 必须有返回值，默认写null
  return null
}
```

5. componentDidUpdate()

```js
componentDidUpdate(prevProps, prevState, snapshot) {
  console.log('componentDidUpdate')
}
```
首次渲染不会执行此方法。


## 卸载 Unmounting


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5cb4cc3bad74827b10816ef38125bee~tplv-k3u1fbpfcp-watermark.image?)

当组件从 DOM 中移除时会调用如下方法：

1. componentWillUnmount()

会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。

## 错误处理 Error Handling


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea7f1d4fb6d240c0855e957968cf21ca~tplv-k3u1fbpfcp-watermark.image?)

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

1. static getDerivedStateFromError()
2. componentDidCatch()

注意点：

两者都是在后代组件抛出错误后才会被调用。

# 参考链接
两个 React 官网的链接

1. [React.Component – React (reactjs.org)](https://reactjs.org/docs/react-component.html)
2. [React lifecycle methods diagram (wojtekmaj.pl)](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)