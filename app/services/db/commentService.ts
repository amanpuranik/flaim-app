import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { fs } from "../../../firebase";
import { GoalComment } from "../../constants/types";

//COMMENT UNDER A GOAL
export const db_AddComment = async (goalUid: string, newComment: GoalComment) => {
    try {
        const newCommentDoc = doc(fs, "goals", goalUid, "comments", newComment.uid);
        await setDoc(newCommentDoc, newComment);
    } catch (e: any) {
        console.log("Couldn't add comment")
    }

}

//LIKE A COMMENT
export const db_UpdateCommentLike = async (goalUid: string, commentUid: string, userUid: string, isLiking: boolean) => {
    try {
        const commentRef = doc(fs, "goals", goalUid, "comments", commentUid, "likes", userUid);
        await setDoc(commentRef,
            { userUid, isLiked: isLiking },
            { merge: true }
        )
    } catch (e: any) {
        console.log("Couldn't update comment likes")
    }
}

export const db_DeleteComment = async (goalUid: string, commentUid: string) => {
    try {
        const commentDoc = doc(fs, "goals", goalUid, "comments", commentUid);
        await deleteDoc(commentDoc);
    } catch (e: any) {
        console.log("Couldn't delete comment")
    }

}
