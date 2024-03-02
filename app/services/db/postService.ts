import { Timestamp, doc, writeBatch } from "firebase/firestore";
import { fs } from "../../../firebase";
import { Goal, GoalPost } from "../../constants/types";

//COMMENT UNDER A GOAL
export const db_AddGoalPost = async (goalUid: string, newPost: GoalPost) => {
    try {
        const goalRef = doc(fs, "goals", goalUid);
        const batch = writeBatch(fs);
        const newPostDoc = doc(fs, "goals", goalUid, "posts", newPost.uid);
        batch.set(newPostDoc, newPost);
        batch.update(goalRef, {
            updatedAt: Timestamp.now(),
        } as Goal)
        await batch.commit();
    } catch (e: any) {
        console.log("Couldn't add goal post")
    }
}
