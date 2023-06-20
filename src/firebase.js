import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCjBl7SUkCxYFYCyLhNLaxu7q8jKxscBS8",
    authDomain: "slack-clone-challenge-ce54a.firebaseapp.com",
    projectId: "slack-clone-challenge-ce54a",
    storageBucket: "slack-clone-challenge-ce54a.appspot.com",
    messagingSenderId: "898348669696",
    appId: "1:898348669696:web:6fd8a7d2f221b1575771e5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db;