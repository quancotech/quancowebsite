import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKpvWm4r0_wrB1mgwG7A48DttfnKVWnHk",
  authDomain: "quancotech.firebaseapp.com",
  projectId: "quancotech",
  storageBucket: "quancotech.firebasestorage.app",
  messagingSenderId: "379463162978",
  appId: "1:379463162978:web:77cb55cd54e94bab55053b",
  measurementId: "G-CV78V1WTKG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app

