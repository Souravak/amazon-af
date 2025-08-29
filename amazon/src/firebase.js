import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTCaLQeCLknnamk3yG_0VEBvh4WPM-2kU",
  authDomain: "af-a641b.firebaseapp.com",
  projectId: "af-a641b",
  storageBucket: "af-a641b.firebasestorage.app",
  messagingSenderId: "359930605468",
  appId: "1:359930605468:web:36fac6877954d2dbba2259"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
