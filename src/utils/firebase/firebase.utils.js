import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA24byRzjDV62Ja6IfkBUgfvdWTSeYIoIk',
  authDomain: 'crwn-clothing-3f2f2.firebaseapp.com',
  projectId: 'crwn-clothing-3f2f2',
  storageBucket: 'crwn-clothing-3f2f2.appspot.com',
  messagingSenderId: '644493517321',
  appId: '1:644493517321:web:bb7d368b15560434de4ed8',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const singInWithGooglePopup = () => signInWithPopup(auth, provider); // provider -> line 23, i.e., GoogleAuthProvider

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);

  console.log('userSnapshot', userSnapshot);

  console.log('userSnapshot.exists()', userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    // If user data does not exist
    // Create / set the document witht the data form userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(`Error creating user ${error}`);
    }
  }

  // If user data exists
  // Return userData

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  console.log('auth from firebase.js: ',auth);
  return await createUserWithEmailAndPassword(auth, email, password);
};


export const singInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};