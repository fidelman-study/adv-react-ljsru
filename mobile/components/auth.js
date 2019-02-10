import React, { Component } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state
    return (
      <View>
        <View style={styles.container}>
          <Text>Email:</Text>
          <TextInput style={styles.input} value ={email} onChangeText={this.handleEmailChange} />
        </View>
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

  handleEmailChange = (email) => this.setState({ email })
  handlePasswordChange = (password) => this.setState({ password })
  handleSignIn = () => console.log('---', 12345)
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