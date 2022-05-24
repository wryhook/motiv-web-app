import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

// Add SDKs for Firebase products that you want to use from https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYIWrPFx9NkmP9A30BXxxSYI8AkUITZ2I",
  authDomain: "motiv-5c37e.firebaseapp.com",
  projectId: "motiv-5c37e",
  storageBucket: "motiv-5c37e.appspot.com",
  messagingSenderId: "178647446445",
  appId: "1:178647446445:web:f8a04e3441c14c5be52724",
  measurementId: "G-6LC7JVTVR0"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //firebase.initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  //const db = firebase.firestore(); 
  const db = getFirestore(app); //Initialize Cloud Firestore


  //export default firebase;
  export {db};