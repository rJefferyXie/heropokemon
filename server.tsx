import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
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
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const db = getFirestore(app);

export { db, analytics }