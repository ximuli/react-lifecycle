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
    // throw new Error('测试错误')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    // 必须返回布尔值，默认为true
    return true
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate')
    // 必须有返回值，默认写null
    return null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
}
