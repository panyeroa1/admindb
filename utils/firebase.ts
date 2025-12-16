import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJTEq8O8zeyyHELpD5lxIFDqlFGiLBX84",
  authDomain: "cloud-gpc-admin.firebaseapp.com",
  projectId: "cloud-gpc-admin",
  storageBucket: "cloud-gpc-admin.firebasestorage.app",
  messagingSenderId: "1018140186256",
  appId: "1:1018140186256:web:182bade0c8ebba6e3a6a15",
  measurementId: "G-TZP8742LLJ",
  databaseURL: "https://cloud-gpc-admin-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
