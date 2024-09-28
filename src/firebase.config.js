

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJiQrbNvE1h32He4CwnhLxyy93loBeqGA",
  authDomain: "clone-23fda.firebaseapp.com",
  projectId: "clone-23fda",
  storageBucket: "clone-23fda.appspot.com",
  messagingSenderId: "1081781630986",
  appId: "1:1081781630986:web:5802efc4a297936bf447f3"
};

// Initialize Firebase
export const APP = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig) ;

export const FIRESTORE = getFirestore(APP) ;