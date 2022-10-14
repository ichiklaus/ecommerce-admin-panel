import { useState, useEffect } from 'react'
import { auth, signInWithEmailAndPassword, signOut } from '../firebase/conn';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Signed in user is: ", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Errors while sigining in: ", "code: " + errorCode + "message: " + errorMessage);
    });

  const signOutUser = () => signOut(auth).then(() => clear);

  // listen for Firebase state change
  useEffect(() => {
    // const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInUser,
    signOutUser
  };
}