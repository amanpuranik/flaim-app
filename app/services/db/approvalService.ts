import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../../firebase";
import { GoalApproval } from "../../constants/types";

//APPROVE A GOAL
export const db_ApproveGoalPost = async (goalUid: string, newApproval: GoalApproval) => {
    try {
        const newApprovalDoc = doc(fs, "goals", goalUid, "approvals", newApproval.uid);
        await setDoc(newApprovalDoc, newApproval);
    } catch (e: any) {
        console.log("Couldn't approve goal post")
    }
}
