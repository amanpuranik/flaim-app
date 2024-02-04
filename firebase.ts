// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpj6MOg5okntpnUWM5mtc4tpCMa0SaCeo",
  authDomain: "flaim-app.firebaseapp.com",
  projectId: "flaim-app",
  storageBucket: "flaim-app.appspot.com",
  messagingSenderId: "754338287988",
  appId: "1:754338287988:web:c4eca26e5ff55a36bc1c21",
  measurementId: "G-WMGF6CHT47",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
