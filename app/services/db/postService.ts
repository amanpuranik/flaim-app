import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fs } from "../../../firebase";
import { GoalComment, GoalPost } from "../../constants/types";

//COMMENT UNDER A GOAL
export const db_AddGoalPost = async (goalUid: string, post: GoalPost) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, {
        posts: arrayUnion(post)
    })
}

//LIKE A COMMENT
export const db_UpdateGoalPosts = async (goalUid: string, posts: GoalPost[]) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, {
        posts,
        updatedAt: Timestamp.now()
    })
}