import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Feed from "./feed";
import Login from "./login";
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

export default function index() {
    const auth = getAuth();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // Handle user state changes
    const onAuthStateChangedHandler = (user: any) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
        return unsubscribe;
    }, []);

    if (initializing) {
        return <Loading />
    } else {
        return user ? <Feed /> : <Login />
    }
};

