import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDRjbKNePsXa517toSuhS4PrSSQk2EmAy4",
  authDomain: "codemath-99434.firebaseapp.com",
  projectId: "codemath-99434",
  storageBucket: "codemath-99434.appspot.com",
  messagingSenderId: "760222944418",
  appId: "1:760222944418:web:a09f142c9261e03832dbfb"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);