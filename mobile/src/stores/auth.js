import { observable, action, computed } from 'mobx'
import {validate} from 'email-validator'
import BasicStore from './basic-store'
import api from '../services/api'

export default class AuthStore extends BasicStore {
  @observable email = 'asd@asd.cz'
  @observable password = '123123123'
  @observable user = null

  @action setEmail = email => this.email = email
  @action setPassword = password => this.password = password
  @action setUser = user => {
    this.user = user
  }

  @computed get isValidEmail() {
    return validate(this.email)
  }

  signIn = () => {
    api
      .signIn(this.email, this.password)
      .then(this.setUser)
  }
}