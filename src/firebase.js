import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzT-9oaED_mJjY4oo9mHqbCvLyNoGKCHY",
  authDomain: "ruangsuara-31505.firebaseapp.com",
  databaseURL: "https://ruangsuara-31505-default-rtdb.firebaseio.com",
  projectId: "ruangsuara-31505",
  storageBucket: "ruangsuara-31505.firebasestorage.app",
  messagingSenderId: "23897493215",
  appId: "1:23897493215:web:073c09c7d071cb5d92a36a",
  measurementId: "G-LSM5F3D5H9"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
