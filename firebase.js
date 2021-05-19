import firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD0gLgZZAgXAGJHmHibzRRAkuRtOdsps6A",
    authDomain: "aistein-facebook.firebaseapp.com",
    projectId: "aistein-facebook",
    storageBucket: "aistein-facebook.appspot.com",
    messagingSenderId: "497838899177",
    appId: "1:497838899177:web:bcba7cd818af961ada9578"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const storage = firebase.storage();
const auth = app.auth();

export { db, storage, auth };