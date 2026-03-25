
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);

    }
    const logOut = () => {
        return signOut(auth);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    useEffect(
        () => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                if (user) {
                    setUser(user);
                    setLoading(false);
                    console.log(user)
                } else {
                    setUser(null);
                }

            })
            return () => unsubscribe();

        }, []
    )


    const userInfo = {
        registerUser,
        signInUser,
        signInWithGmail,
        user,
        setUser,
        loading,
        setLoading,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;