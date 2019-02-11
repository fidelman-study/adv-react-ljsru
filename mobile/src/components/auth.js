import React, { Component } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import {observer, inject} from 'mobx-react'
import stores from '../stores'
import IsValidEmail from './is-valid-email'

@inject('auth')
@observer
export default class Auth extends Component {
  render() {
    const { email, password } = this.props.auth
    console.log(email, password)

    return (
      <View>
        <View style={styles.container}>
          <Text>Email:</Text>
          <TextInput style={styles.input} value ={email} onChangeText={this.handleEmailChange} />
        </View>
        <IsValidEmail/>
        <View>
          <Text>Password:</Text>
          <TextInput secureTextEntry value={password} onChangeText={this.handlePasswordChange} />
        </View>
        <View>
          <Button title="Sign In" onPress={this.handleSignIn} />
        </View>
      </View>
    )
  }

  handleEmailChange = (email) => this.props.auth.setEmail(email)
  handlePasswordChange = (password) => this.props.auth.setPassword(password)
  handleSignIn = () => this.props.onSubmit()
}

const styles = {
  container: {
    flexDirection: 'row'
  },
  input: Platform.select({
    ios: {
      width: 100,
    },
    android: {
      width: 200,
    },
    borderBottomWidth: 1,
  })
}