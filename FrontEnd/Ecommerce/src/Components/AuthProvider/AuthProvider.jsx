import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from "../../Firebase/firebase.init"



export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const registerUser = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInWithEmail = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const provider = new GoogleAuthProvider()

    const loginWithPopup = () => {
        setIsLoading(true)
        return signInWithPopup(auth, provider)

    }

    const LogOut = () => {
        setIsLoading(true)
        return signOut(auth)

    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const AuthInfo = {
        isLoading,
        setIsLoading,
        user,
        LogOut,
        setUser,
        registerUser,
        loginWithPopup,
        logInWithEmail

    }




    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;