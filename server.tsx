import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";

setLogLevel('silent');

const firebaseConfig = {
  apiKey: "AIzaSyAgItNhQBLdKwB-uBp7Vj8ldhZc5rTu7W0",
  authDomain: "heropokemon.firebaseapp.com",
  projectId: "heropokemon",
  storageBucket: "heropokemon.appspot.com",
  messagingSenderId: "577621292826",
  appId: "1:577621292826:web:bd35f57322bda16eccdea3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);