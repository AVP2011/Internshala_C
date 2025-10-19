// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6qo3TPC-4KooywU9t08j_5jA0MD619pY",
  authDomain: "internarea-dd04e.firebaseapp.com",
  projectId: "internarea-dd04e",
  storageBucket: "internarea-dd04e.firebasestorage.app",
  messagingSenderId: "197844527385",
  appId: "1:197844527385:web:a5bb1c53cae8e348e83d88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();
// export {  app, auth, provider};