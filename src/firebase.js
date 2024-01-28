// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD33rqoCqlmZmIpcfwekpulZiWjuOkxW10",
    authDomain: "financely-ab636.firebaseapp.com",
    projectId: "financely-ab636",
    storageBucket: "financely-ab636.appspot.com",
    messagingSenderId: "955863818128",
    appId: "1:955863818128:web:7a5f5781b644aae2285d15",
    measurementId: "G-PFVBM3HE2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc}