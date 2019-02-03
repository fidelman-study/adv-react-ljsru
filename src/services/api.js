import firebase from 'firebase'
import 'firebase/auth'

class ApiServices {
    fb = firebase

    signIn = (email, password) => this.fb.auth().signInWithEmailAndPassword(email, password)
    signUp = (email, password) => this.fb.auth().createUserWithEmailAndPassword(email, password)
    onAuthStateChanged = callback => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiServices()