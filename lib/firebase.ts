import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB07VKxzf0lhdtRTLhMwHs0x54bOMlodA4",
  authDomain: "calmspace-4c73f.firebaseapp.com",
  projectId: "calmspace-4c73f",
  storageBucket: "calmspace-4c73f.firebasestorage.app",
  messagingSenderId: "765940996744",
  appId: "1:765940996744:web:487918ed132b41bba0dd3d",
  measurementId: "G-WXTLT05PD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with proper persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only if supported (web only)
let analytics = null;
isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);

export { analytics };

export default app;
