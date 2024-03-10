import { DocumentData, DocumentSnapshot, collection, doc, getDoc, getDocs, limit, or, orderBy, query, setDoc, where } from "firebase/firestore";
import { auth, fs } from "../../../firebase";
import { FlaimUser } from "../../constants/types";

export const db_CheckUserExists = async (username: string, email: string) => {
    const userExistsQuery =
        query
            (
                collection(fs, 'users'),
                or(
                    where('username', '==', username),
                    where('email', '==', email)
                ),
                limit(1)
            );
    const userExistsSnapshot = await getDocs(userExistsQuery);


    if (!userExistsSnapshot.empty) {
        const firstDoc = userExistsSnapshot.docs[0].data();

        if (firstDoc.username === username) {
            // Username already exists, throw an error with a specific code
            const usernameError = new Error("Username already in use");
            (usernameError as any).code = "auth/username-already-in-use";
            throw usernameError;
        }

        if (firstDoc.email === email) {
            // Email already exists, throw an error with a specific code
            const emailError = new Error("Email already in use");
            (emailError as any).code = "auth/email-already-in-use";
            throw emailError;
        }
    }
}

//CREATE USER
export const db_CreateUser = async (user: FlaimUser) => {
    await setDoc(doc(fs, 'users', auth.currentUser?.uid!), user);
};

//Update a User
export const db_UpdateUser = async (user: FlaimUser) => {
    const userRef = doc(fs, "users", user.uid)
    await setDoc(userRef, user, { merge: true });
}

//GET USER DATA FOR THE CURRENT USER LOGGED IN
export const db_GetCurrentUser = async (): Promise<FlaimUser | undefined> => {
    const currentUserUid = auth.currentUser?.uid!;
    const userRef = doc(fs, "users", currentUserUid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const user: FlaimUser = { ...userSnap.data() as FlaimUser }
        return user;
    } else {
        return undefined;
    }
}

//GET A FRIENDS DATA
export const db_GetOtherProfile = async (uid: string): Promise<FlaimUser | undefined> => {
    const userRef = doc(fs, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const user: FlaimUser = { ...userSnap.data() as FlaimUser }
        return user;
    } else {
        return undefined;
    }
}

//GET MULTIPLE USERS
export const db_GetUsers = async (uids: string[]): Promise<FlaimUser[]> => {
    const usersRef = collection(fs, "users");
    const q = query(usersRef, where('uid', 'in', uids));
    const usersSnapshot = await getDocs(q);
    const userList: FlaimUser[] = usersSnapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => ({
        ...doc.data() as FlaimUser,
    }));
    return userList;
}