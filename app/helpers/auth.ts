import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { AuthResponse } from "../constants/types";
import { useEffect, useState } from "react";
import * as store from '../helpers/store';
import { router } from "expo-router";

export async function signup(email: string, password: string): Promise<AuthResponse> {
    try {
        const t = await createUserWithEmailAndPassword(auth, email, password);
        return {
            token: t,
            error: false,
            errorMessage: ""
        }
    } catch (error: any) {
        return {
            token: null,
            error: true,
            errorMessage: error.code
        }
    }
}

export async function signin(email: string, password: string): Promise<AuthResponse> {
    try {
        const t = await signInWithEmailAndPassword(auth, email, password);
        return {
            token: t,
            error: false,
            errorMessage: ""
        }
    } catch (error: any) {
        return {
            token: null,
            error: true,
            errorMessage: error.code
        }
    }
}

export function signOut() {
    auth.signOut();
}

// export function getUser() {
//     const [user, setUser] = useState<User>();
//     useEffect(() => {
//         const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in, see docs for a list of available properties
//                 setUser(user);
//             } else {
//                 // User is signed out
//                 setUser(undefined);
//             }
//         });
//         return unsubscribeFromAuthStatuChanged;
//     }, []);
//     return {
//         user
//     };
// }
