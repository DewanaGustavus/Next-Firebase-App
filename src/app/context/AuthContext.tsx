import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}