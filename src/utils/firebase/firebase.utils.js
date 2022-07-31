import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCT2p80b6kfdEINMcBWOc52vkRstUbTHSU",
    authDomain: "crwn-clothing-db-39e90.firebaseapp.com",
    projectId: "crwn-clothing-db-39e90",
    storageBucket: "crwn-clothing-db-39e90.appspot.com",
    messagingSenderId: "1095844378317",
    appId: "1:1095844378317:web:b96f8b6fd7852de942db84"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    promt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  };