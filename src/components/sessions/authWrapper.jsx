"use client";
import React, { useEffect, createContext, useContext, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../../config/config";
import Loader from "../loader/loader";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Firestore instance
const AuthContext = createContext(null);

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthCtx must be used within an AuthWrapper");
  }
  return context;
};

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // Store user's Firestore details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user's details from Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            console.error("No user details found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user details from Firestore:", error);
        }
      } else {
        setUser(null);
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logoutAction = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetails(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, userDetails, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
