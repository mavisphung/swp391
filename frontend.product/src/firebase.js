import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuoS6bmPKkuUQhIK_1xQ77e91ZqNlqjD8",
  authDomain: "bird-shop-22ade.firebaseapp.com",
  projectId: "bird-shop-22ade",
  storageBucket: "bird-shop-22ade.appspot.com",
  messagingSenderId: "545286793370",
  appId: "1:545286793370:web:82e5cb91d62cbb5adc1723",
  measurementId: "G-KZ2BQ3L7S8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
