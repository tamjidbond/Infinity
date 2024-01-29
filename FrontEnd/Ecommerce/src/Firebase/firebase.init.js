// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRHVS90CIvt-HMR1OL5LsnACS1PLHDChY",
  authDomain: "ecommerce-for-college.firebaseapp.com",
  projectId: "ecommerce-for-college",
  storageBucket: "ecommerce-for-college.appspot.com",
  messagingSenderId: "290656170182",
  appId: "1:290656170182:web:2d939a2ffd78e03bf8a7c7",
  measurementId: "G-8RTR8TB831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);