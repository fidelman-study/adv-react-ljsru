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

  fetchLazyEvents = (id = '') => {
    return this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(id)
      .once('value')
      .then((data) => data.val())
  }

  deleteEvent = (id) =>
    this.fb
      .database()
      .ref(`events/${id}`)
      .remove()

  loadAllPeople = () =>
    this.fb
      .database()
      .ref('people')
      .once('value')
      .then((res) => res.val())

  deletePerson = (id) =>
    this.fb
      .database()
      .ref(`people/${id}`)
      .remove()

  addPerson = (person) =>
    this.fb
      .database()
      .ref('people')
      .push(person)

  addPersonToEvent = (eventId, peopleIds) =>
    this.fb
      .database()
      .ref(`events/${eventId}/peopleIds`)
      .set(peopleIds)

  peopleSubscribtion = (callback) => {
    const dataCallback = (snapshot) => callback(snapshot.val())
    this.fb
      .database()
      .ref('people')
      .on('value', dataCallback)

    return () =>
      this.fb
        .database()
        .ref('people')
        .off('value', dataCallback)
  }
}

export default new ApiServices()
