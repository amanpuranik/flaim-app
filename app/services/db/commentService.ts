import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fs } from "../../../firebase";
import { GoalComment } from "../../constants/types";

//COMMENT UNDER A GOAL
export const db_AddComment = async (goalUid: string, commentObject: GoalComment) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, {
        comments: arrayUnion(commentObject)
    })
}

//LIKE A COMMENT
export const db_UpdateComments = async (goalUid: string, comments: GoalComment[]) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, { comments })
}