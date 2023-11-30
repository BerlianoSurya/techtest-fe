/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import Swal from 'sweetalert2';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBvuMF-3bnFPflgqpkkmXM5kfscPQjdRG0',

  authDomain: 'learning-app-11.firebaseapp.com',

  projectId: 'learning-app-11',

  storageBucket: 'learning-app-11.appspot.com',

  messagingSenderId: '514993795187',

  appId: '1:514993795187:web:e7d102904bba728dabfa06',

  measurementId: 'G-99ESKFJV4S',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const registerWithEmailAndPassword = async (
  name,
  profile_image,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      profile_image,
      authProvider: 'local',
      email,
      created: new Date(),
    });

    Cookies.set('token', user.accessToken, { expires: 1 });
    Cookies.set('user', JSON.stringify(user), { expires: 1 });
    setTimeout(() => {
      window.location.href = '/';
      // window.location.reload(false);
    }, '1000');
    return user;
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
    setTimeout(() => {
      window.location.href = '/register';
    }, '2000');
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    Cookies.set('token', user.accessToken, { expires: 1 });
    Cookies.set('user', JSON.stringify(user), { expires: 1 });
    return user;
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
    setTimeout(() => {
      window.location.href = '/login';
    }, '2000');
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  analytics,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
};
