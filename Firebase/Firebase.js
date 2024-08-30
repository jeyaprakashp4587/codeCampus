import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0pSght5VfrJatvTaD7t2b-g8CPeB9KfQ",

  authDomain: "codecampus-d77fb.firebaseapp.com",

  projectId: "codecampus-d77fb",

  storageBucket: "codecampus-d77fb.appspot.com",

  messagingSenderId: "217528310642",

  appId: "1:217528310642:web:76c2401fbdbf9c74591beb",

  measurementId: "G-G6JH1NCMPV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage();
export { storage };
