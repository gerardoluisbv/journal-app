
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//console.log(process.env);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };


  // CONFIG VIEJA YA SE LLEVO A VARIABLES DE ENTORNO
  
// ``
//   REACT_APP_APIKEY = AIzaSyDM5Kp2Rg8-ZjmLY-vYbwvd997DS1BV0-E
//   REACT_APP_AUTHDOMAIN = react-journal-app-a20bb.firebaseapp.com
//   REACT_APP_PROJECTID = react-journal-app-a20bb
//   REACT_APP_STORAGEBUCKET = react-journal-app-a20bb.appspot.com
//   REACT_APP_MESSAGINGSENDERID = 268144647074
//   REACT_APP_APPID = 1:268144647074:web:467b83a36242fcf0e070fb



//   const firebaseConfigTesting = {
//     apiKey: "AIzaSyCjxapfndLD-HefelgoAMZY-ZDGqNYxJF0",
//     authDomain: "testing-journal-app-1c0aa.firebaseapp.com",
//     projectId: "testing-journal-app-1c0aa",
//     storageBucket: "testing-journal-app-1c0aa.appspot.com",
//     messagingSenderId: "962013647532",
//     appId: "1:962013647532:web:a11a675a89c3c6fc634509"
//   };
  
//   // Initialize Firebase

//   if( process.env.NODE_ENV === 'test' ){
    //       firebase.default.initializeApp(firebaseConfigTesting); 
    //   } else {
        //       firebase.default.initializeApp(firebaseConfig);
        //   }
 
  // Initialize Firebase

  firebase.default.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }

  module.exports = {
    env : {
      FIREBASE_API_KEY: process.env.apiKey,
      AUTH_DOMAIN: process.env.authDomain,
      PROJECT_ID: process.env.projectId,
      STORAGE_BUCKET: process.env.storageBucket,
      MESSAGING_SENDER_ID: process.env.messagingSenderId,
      APP_ID: process.env.appId,
    }
  }







