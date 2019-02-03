import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-4581c'

const firebaseConfig = {
    apiKey: "AIzaSyABSPDLMVPqdumnI06tBwRzUmU7um4-Ys8",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "458484482530"
};

firebase.initializeApp(firebaseConfig)