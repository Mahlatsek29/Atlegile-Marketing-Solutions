// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcMJua3yDxzzTOweyKZJO0cNhb0ffPYmk",
  authDomain: "atlegile-marketing-solutions.firebaseapp.com",
  projectId: "atlegile-marketing-solutions",
  storageBucket: "atlegile-marketing-solutions.appspot.com",
  messagingSenderId: "184474823085",
  appId: "1:184474823085:web:a3bef82b0ea4218b445924",
  measurementId: "G-M4DZHH66ZS"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};