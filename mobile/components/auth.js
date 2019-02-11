import React, { Component } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import { observable } from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class Auth extends Component {

  @observable email = ''
  @observable password = ''

  render() {
    const { email, password } = this
    console.log({email, password})
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

  handleEmailChange = (email) => this.email = email
  handlePasswordChange = (password) => this.password = password
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