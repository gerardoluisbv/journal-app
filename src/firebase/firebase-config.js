
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDM5Kp2Rg8-ZjmLY-vYbwvd997DS1BV0-E",
    authDomain: "react-journal-app-a20bb.firebaseapp.com",
    projectId: "react-journal-app-a20bb",
    storageBucket: "react-journal-app-a20bb.appspot.com",
    messagingSenderId: "268144647074",
    appId: "1:268144647074:web:467b83a36242fcf0e070fb"
  };
  
  // Initialize Firebase
 firebase.default.initializeApp(firebaseConfig); 

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }





