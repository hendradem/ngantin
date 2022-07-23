import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCuakk2cdRjL6p85aX3h3RgcKPdF4A2nOs",
  authDomain: "canteen-4d03f.firebaseapp.com",
  projectId: "canteen-4d03f",
  storageBucket: "canteen-4d03f.appspot.com",
  messagingSenderId: "507123650543",
  appId: "1:507123650543:web:f6ba25edac75c0caa6301a",
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
