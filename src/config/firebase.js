import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyBZ6ikPF62pbKnP83F2lFaSPImxudvmIzo',
  authDomain: 'fir-course-6cb0a.firebaseapp.com',
  projectId: 'fir-course-6cb0a',
  storageBucket: 'fir-course-6cb0a.appspot.com',
  messagingSenderId: '300471294033',
  appId: '1:300471294033:web:73e1985b1aee295fb2c070',
  measurementId: 'G-GWRHP8BFBN'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)