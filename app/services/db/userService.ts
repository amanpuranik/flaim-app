import { DocumentData, DocumentSnapshot, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { auth, fs } from "../../../firebase";
import { FlaimUser } from "../../constants/types";

//CREATE USER
export const db_CreateUser = async (user: FlaimUser) => {
    await setDoc(doc(fs, "users", auth.currentUser?.uid!), user);
}

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