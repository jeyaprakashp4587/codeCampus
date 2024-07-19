import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBML6AEP76H_aJQB6wi4pUuDyK3xbr64Zw",
  authDomain: "codecampus-bfa48.firebaseapp.com",
  projectId: "codecampus-bfa48",
  storageBucket: "codecampus-bfa48.appspot.com",
  messagingSenderId: "750664543169",
  appId: "1:750664543169:web:dc1091e6f7450203501d40",
  measurementId: "G-W17XH2N5NH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage();
export { storage };
