// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCRWbWhdBP6ZFDPDYwmjLOSDPp_Qvz_SlY",
  authDomain: "nentang-8cc88.firebaseapp.com",
  projectId: "nentang-8cc88",
  storageBucket: "nentang-8cc88.firebasestorage.app",
  messagingSenderId: "890066895635",
  appId: "1:890066895635:web:b2f260d4c6a6ad5fbe10e6",
  measurementId: "G-Y7WDHQP0FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const Facebook = new FacebookAuthProvider();
export{auth, provider, Facebook};