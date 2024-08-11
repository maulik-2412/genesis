// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoqohAdQsV91khfM3xiCcRGyFXfi511zQ",
  authDomain: "onlinehealth-29689.firebaseapp.com",
  projectId: "onlinehealth-29689",
  storageBucket: "onlinehealth-29689.appspot.com",
  messagingSenderId: "978631886824",
  appId: "1:978631886824:web:ac240f6b33ba742dd5065d",
  measurementId: "G-PHF0Z973X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const auth = getAuth(app);