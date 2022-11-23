// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCANWLO5X50rZBgJ3ZF6vGHbT6rbSXw2Qw",
  authDomain: "ogerio-dotphone.firebaseapp.com",
  projectId: "ogerio-dotphone",
  storageBucket: "ogerio-dotphone.appspot.com",
  messagingSenderId: "1012880261974",
  appId: "1:1012880261974:web:c40a37f3eabb36c7698cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;