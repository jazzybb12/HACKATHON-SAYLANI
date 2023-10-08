// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBaNtbfd0p_ApmJZRU_teMsbPuvYw23w0",
  authDomain: "hackathun-23078.firebaseapp.com",
  databaseURL: "https://hackathun-23078-default-rtdb.firebaseio.com",
  projectId: "hackathun-23078",
  storageBucket: "hackathun-23078.appspot.com",
  messagingSenderId: "976408590906",
  appId: "1:976408590906:web:82ab4ef765c4d56f1ed303",
  measurementId: "G-FYMC7DRDB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };