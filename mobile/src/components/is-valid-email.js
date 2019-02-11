import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
export default class IsValidEmail extends Component {
  render() {
    console.log('changed')
    return (
      <View>
        <Text> {this.props.auth.isValidEmail.toString()} </Text>
      </View>
    )
  }
}
