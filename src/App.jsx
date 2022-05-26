import React, { Component } from 'react'
import Count from './Count'

export default class App extends Component {
  render() {
    return (
      <Count />
    )
  }
  static getDerivedStateFromError() {
    console.log('getDerivedStateFromError')
  }
  componentDidCatch() {
    console.log('componentDidCatch')
  }
}
