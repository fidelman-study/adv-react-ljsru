import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

class ApiServices {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)

  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  fetchAllEvents = () =>
    this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.val())

  fetchLazyEvents = (id = '') =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(id)
      .once('value')
      .then((data) => data.val())
}

export default new ApiServices()
