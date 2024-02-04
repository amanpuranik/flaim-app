import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { AuthResponse } from "../constants/types";

export async function signup(
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        const t = await createUserWithEmailAndPassword(auth, email, password);
        return {
            token: t,
            error: false,
            errorMessage: "",
        };
    } catch (error: any) {
        let readableErrorMessage = "";
        switch (error.code) {
            case "auth/email-already-in-use":
                readableErrorMessage = "This email is already in use.";
                break;
            case "auth/invalid-email":
                readableErrorMessage = "Invalid email address.";
                break;
            case "auth/operation-not-allowed":
                readableErrorMessage = "Email/password accounts are not enabled.";
                break;
            case "auth/weak-password":
                readableErrorMessage = "Please choose a stronger password";
                break;
            default:
                readableErrorMessage = "An unexpected error occurred.";
                break;
        }
        return {
            token: null,
            error: true,
            errorMessage: readableErrorMessage,
        };
    }
}

export async function signin(
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        const t = await signInWithEmailAndPassword(auth, email, password);
        return {
            token: t,
            error: false,
            errorMessage: "",
        };
    } catch (error: any) {
        let readableErrorMessage = "";
        switch (error.code) {
            case "auth/user-not-found":
                readableErrorMessage = "No user found with this email.";
                break;
            case "auth/wrong-password":
                readableErrorMessage = "Incorrect password.";
                break;
            case "auth/user-disabled":
                readableErrorMessage = "This user has been disabled.";
                break;
            case "auth/too-many-requests":
                readableErrorMessage = "Too many requests. Try again later.";
                break;
            case "auth/invalid-email":
                readableErrorMessage = "Invalid email address.";
                break;
            default:
                readableErrorMessage = "An unexpected error occurred.";
                break;
        }
        return {
            token: null,
            error: true,
            errorMessage: readableErrorMessage,
        };
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
