// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyxiV-qthOvA801jIM3OVPen-Ik3T0bMc",
  authDomain: "movie-gpt-716e8.firebaseapp.com",
  projectId: "movie-gpt-716e8",
  storageBucket: "movie-gpt-716e8.appspot.com",
  messagingSenderId: "310975997079",
  appId: "1:310975997079:web:61cc1d9420b75903d8b5d2",
  measurementId: "G-RQMMQ481ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth
export const auth = getAuth();