// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD961mxIMoW9hyEjMYPff4lRIz5qCFpY2A",
  authDomain: "wheather-659ef.firebaseapp.com",
  projectId: "wheather-659ef",
  storageBucket: "wheather-659ef.appspot.com",
  messagingSenderId: "843196120328",
  appId: "1:843196120328:web:af1228840c73ba6ac480bd",
  measurementId: "G-LDLJ2Q3CG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);