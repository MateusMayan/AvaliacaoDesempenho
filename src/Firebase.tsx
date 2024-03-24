// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEKv9et82UbJkYK_K_Rm_CDv5pZUNR4nQ',
  authDomain: 'avaliacaodesempenho-5cefb.firebaseapp.com',
  projectId: 'avaliacaodesempenho-5cefb',
  storageBucket: 'avaliacaodesempenho-5cefb.appspot.com',
  messagingSenderId: '192322418889',
  appId: '1:192322418889:web:bd05653abe4f35a6457518',
  measurementId: 'G-ZMMZLTLJH7',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
