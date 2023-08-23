import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "texting-web-app.firebaseapp.com",
  projectId: "texting-web-app",
  storageBucket: "texting-web-app.appspot.com",
  messagingSenderId: "182255589041",
  appId: "1:182255589041:web:efa33268ccae1b3519b490",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const createUser = createUserWithEmailAndPassword;
export const storage = getStorage();
