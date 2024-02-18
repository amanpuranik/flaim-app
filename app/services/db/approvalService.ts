import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fs } from "../../../firebase";
import { GoalApproval } from "../../constants/types";

//APPROVE A GOAL
export const db_ApproveGoalPost = async (goalUid: string, approval: GoalApproval) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, {
        approvals: arrayUnion(approval)
    })
}

//Push newly updated approvals
export const db_UpdateApprovals = async (goalUid: string, approvals: GoalApproval[]) => {
    const goalRef = doc(fs, "goals", goalUid);
    await updateDoc(goalRef, {
        approvals,
    })
}
