import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";

// Test-only Firebase config (replace with your actual test project config)
const firebaseConfig = {
  apiKey: "AIzaSyTESTKEY1234567890",
  authDomain: "nguvu-test.firebaseapp.com",
  projectId: "nguvu-test",
  storageBucket: "nguvu-test.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connect to Firebase Emulator (for testing)
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth, signInWithPhoneNumber, RecaptchaVerifier };