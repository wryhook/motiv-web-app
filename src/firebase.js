import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

// Add SDKs for Firebase products that you want to use from https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj1Z19i28xURUyf1joRCl2B835g6i3Hjw",
    authDomain: "innate-entry-331721.firebaseapp.com",
    projectId: "innate-entry-331721",
    storageBucket: "innate-entry-331721.appspot.com",
    messagingSenderId: "332900074138",
    appId: "1:332900074138:web:70853c8b121c5e093a1523",
    measurementId: "G-KTM90EZDYC" //optional
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //firebase.initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  //const db = firebase.firestore(); 
  const db = getFirestore(app); //Initialize Cloud Firestore


  //export default firebase;
  export {db};