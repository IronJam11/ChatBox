// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBQtCEb2sdCpszcYRkuG3eq5AHb72yCq8",
  authDomain: "chatbox-e62d5.firebaseapp.com",
  projectId: "chatbox-e62d5",
  storageBucket: "chatbox-e62d5.appspot.com",
  messagingSenderId: "423216877488",
  appId: "1:423216877488:web:073e1cbd49a5cd854bd075",
  measurementId: "G-YJ0X45Z3MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
