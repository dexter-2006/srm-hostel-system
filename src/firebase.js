// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAakkO8DNURC9LPCUBxVk94CFoMaE5_8RU",
  authDomain: "srm-hostel-system.firebaseapp.com",
  projectId: "srm-hostel-system",
  storageBucket: "srm-hostel-system.firebasestorage.app",
  messagingSenderId: "335578553501",
  appId: "1:335578553501:web:eb88fd6a90458f62918874",
  measurementId: "G-NB0XPHPH7P"
};

let app = null;
let db = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Analytics (optional)
  const analytics = getAnalytics(app);
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.log('🔄 App will continue without Firebase');
}

// Export db (will be null if Firebase failed)
export { db };

export default app;