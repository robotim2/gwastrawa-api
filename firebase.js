// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAglVWeKUFL1VLAAylUkXY5Iz60YU2jN1s",
  authDomain: "koshish-web-app.firebaseapp.com",
  projectId: "koshish-web-app",
  storageBucket: "koshish-web-app.appspot.com",
  messagingSenderId: "703037777236",
  appId: "1:703037777236:web:ec1a4320661c8301bc14c1",
  measurementId: "G-Y3QCN911PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);