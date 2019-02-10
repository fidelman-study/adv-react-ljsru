import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class HelloWorldIos extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ count }) => ({ count: count + 1 }))
    }, 500)
  }

  render() {
    return (
      <View>
        <Text>Hello IOS{this.state.count}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})