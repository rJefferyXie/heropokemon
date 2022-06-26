import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey || process.env.apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain || process.env.authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId || process.env.projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket || process.env.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId || process.env.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId || process.env.appId
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);