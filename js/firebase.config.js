// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getStorage} from "firebase/storage"
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmYvPZ-EylJygAgauChKG3ykdD7kdoMOI",
  authDomain: "classproject-6c2ae.firebaseapp.com",
  projectId: "classproject-6c2ae",
  storageBucket: "classproject-6c2ae.appspot.com",
  messagingSenderId: "176705056224",
  appId: "1:176705056224:web:99244bcb9ec2bad9004f85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const teacherColRef = collection(db, "teacherInfo")
const studentColRef = collection(db, "studentInfo")
const storage = getStorage(app)


export {
  auth,
  storage,
  teacherColRef,
  studentColRef,
  db
}