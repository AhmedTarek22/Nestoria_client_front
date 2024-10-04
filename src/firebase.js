// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEYC_zwch_eK12l1SJd-y6Jo7Vhcd1dXA",
  authDomain: "nestoria-68d90.firebaseapp.com",
  projectId: "nestoria-68d90",
  storageBucket: "nestoria-68d90.appspot.com",
  messagingSenderId: "881855527484",
  appId: "1:881855527484:web:4ea333f57fa1f2a8f26139",
  measurementId: "G-M0NYK60TV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { db, storage };
