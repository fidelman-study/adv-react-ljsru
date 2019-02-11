import { observable, action, computed } from 'mobx'
import {validate} from 'email-validator'
import BasicStore from './basic-store'
import api from '../services/api'

export default class AuthStore extends BasicStore {
  @observable email = ''
  @observable password = ''
  @observable user = null

  @action setEmail = email => this.email = email
  @action setPassword = password => this.password = password

  @computed get isValidEmail() {
    return validate(this.email)
  }

  signIn = () => {
    api
      .signIn(this.email, this.password)
      .then(action(user => {
        this.user = user
        this.getStore('navigation').reset('lists')
      }))
  }
}