import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {observer} from 'mobx-react'
import stores from '../stores'

@observer
export default class IsValidEmail extends Component {
  render() {
    return (
      <View>
        <Text> {stores.auth.isValidEmail.toString()} </Text>
      </View>
    )
  }
}
