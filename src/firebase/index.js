// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyC1zU5K8dtRaS1P1oAP7EtxpaoozzcQ7ko",
  authDomain: "ichiklaus-ecommerce-shop-api.firebaseapp.com",
  projectId: "ichiklaus-ecommerce-shop-api",
  storageBucket: "ichiklaus-ecommerce-shop-api.appspot.com",
  messagingSenderId: "888859319777",
  appId: "1:888859319777:web:c90ae92f57baf49b2086a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Storage
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };