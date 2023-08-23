import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "react-chat-app-a6caf.firebaseapp.com",
  projectId: "react-chat-app-a6caf",
  storageBucket: "react-chat-app-a6caf.appspot.com",
  messagingSenderId: "676111933781",
  appId: "1:676111933781:web:789591216478e06bcb0fdc",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const createUser = createUserWithEmailAndPassword;
export const storage = getStorage();
export const firestore = getFirestore();
