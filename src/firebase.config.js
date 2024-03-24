


import { getRoles } from "@testing-library/react";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyDo0xUAbHd2CuPEOcIQ5FtG3sEiS9eFIr8",
  authDomain: "maltimart-9912b.firebaseapp.com",
  projectId: "maltimart-9912b",
  storageBucket: "maltimart-9912b.appspot.com",
  messagingSenderId: "819890513735",
  appId: "1:819890513735:web:750742d54c7edbf4298e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app 