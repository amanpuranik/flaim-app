import * as React from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import { Redirect } from 'expo-router';
import { db_GetCurrentUser } from './services/db/userService';
import useUserStore from './services/store/userStore';
import { FlaimUser } from './constants/types';

export default function index() {
    const auth = getAuth();
    const [initializing, setInitializing] = useState(true);
    const [firebaseAuthToken, setFirebaseAuthToken] = useState<User | null>(null);
    const { setCurrentUser } = useUserStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authToken) => {
            setFirebaseAuthToken(authToken);
            if (authToken) {
                const flaimUser: FlaimUser | undefined = await db_GetCurrentUser();
                setCurrentUser(flaimUser);
            } else {
                setCurrentUser(undefined)
            }
            if (initializing) {
                setInitializing(false);
            }
        });
        return unsubscribe;
    }, []);

    if (initializing) {
        return <Loading />
    } else {
        return firebaseAuthToken ? <Redirect href={"/feed"} /> : <Redirect href={"/login"} />
    }
};

