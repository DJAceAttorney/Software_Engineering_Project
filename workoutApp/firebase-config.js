
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBUZ65D5_MkURTRaW4O-p2MOvid-BQOy5A",
    authDomain: "workoutapp-57913.firebaseapp.com",
    projectId: "workoutapp-57913",
    storageBucket: "workoutapp-57913.appspot.com",
    messagingSenderId: "632264747436",
    appId: "1:632264747436:web:427573a67b2080349bb209",
    measurementId: "G-GKSMQZ8682"
  
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);