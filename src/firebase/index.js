import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABmJLSEa3RzADJtn3a4wIzRFJtaNxsaao",
  authDomain: "financial-panner.firebaseapp.com",
  projectId: "financial-panner",
  storageBucket: "financial-panner.appspot.com",
  messagingSenderId: "659479996848",
  appId: "1:659479996848:web:a97d24a5ebb309f4ff8e75",
  measurementId: "G-1G6BH1NSHB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
