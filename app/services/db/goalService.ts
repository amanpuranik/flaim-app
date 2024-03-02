import { DocumentData, DocumentSnapshot, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { fs } from "../../../firebase";
import { FlaimUser, Goal } from "../../constants/types";
import useUserStore from "../store/userStore";

//CREATE A GOAL
export const db_CreateGoal = async (goal: Goal) => {
    const goalRef = doc(collection(fs, "goals"))
    await setDoc(goalRef, goal);
}

//Update a goal
export const db_UpdateGoal = async (goal: Goal) => {
    const goalRef = doc(fs, "goals", goal.uid)
    await setDoc(goalRef, goal, { merge: true });
}

export const db_GetGoal = async (goalUid: string): Promise<Goal | undefined> => {
    const goalRef = doc(fs, "goals", goalUid);
    const goalSnap = await getDoc(goalRef);

    if (goalSnap.exists()) {
        const goal: Goal = { ...goalSnap.data() as Goal }
        return goal;
    } else {
        return undefined;
    }
}

//GET GOALS FOR FEED
//NEED TO ADD PAGINATION SO IT DOESN'T GET ALL AT THE SAME TIME
export const db_GetGoalFeed = async (currentUser: FlaimUser | undefined): Promise<Goal[]> => {
    if (currentUser) {
        const uids = [...currentUser.friendUids, currentUser.uid]
        const goalsRef = collection(fs, "goals");
        const q = query(goalsRef, where('collaboratorUids', 'array-contains-any', uids), orderBy("updatedAt", "desc"));
        const goalsSnapshot = await getDocs(q);
        const goalList: Goal[] = goalsSnapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => ({
            ...doc.data() as Goal,
        }));
        return goalList;
    }
    return [];

}

//GET GOALS FOR PROFILE LIST
export const db_GetProfileGoalsList = async (uid: string) => {
    const goalsRef = collection(fs, "goals");
    const q = query(goalsRef, where('collaboratorUids', 'array-contains', uid), orderBy("createdAt", "desc"));
    const goalsSnapshot = await getDocs(q);
    const goalList: Goal[] = goalsSnapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => ({
        ...doc.data() as Goal,
    }));
    return goalList;
}
