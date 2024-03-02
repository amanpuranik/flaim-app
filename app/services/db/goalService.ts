import { DocumentData, DocumentSnapshot, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { fs } from "../../../firebase";
import { CommentLike, FlaimUser, Goal, GoalApproval, GoalCollaborator, GoalComment, GoalPost } from "../../constants/types";

//CREATE A GOAL
export const db_CreateGoal = async (goal: Goal) => {
    await setDoc(doc(fs, "goals", goal.uid), goal);
}

export const db_GetGoal = async (goalUid: string): Promise<Goal | undefined> => {
    const goalRef = doc(fs, 'goals', goalUid);
    const goalSnapshot = await getDoc(goalRef);

    if (goalSnapshot.exists()) {
        const goalData = goalSnapshot.data() as Goal;

        // Fetch comments subcollection
        const commentsRef = collection(goalRef, 'comments');
        const commentsSnapshot = await getDocs(commentsRef);

        // Use Promise.all to await all promises and get the resolved values
        const comments = await Promise.all(commentsSnapshot.docs.map(async commentDoc => {
            const commentData = commentDoc.data() as GoalComment;

            // Fetch likes subcollection for each comment
            const likesRef = collection(commentDoc.ref, 'likes');
            const likesSnapshot = await getDocs(likesRef);
            const likes = likesSnapshot.docs.map(likeDoc => likeDoc.data() as CommentLike);
            commentData.likes = likes;

            return commentData;
        }));

        // Fetch approvals subcollection
        const approvalsRef = collection(goalRef, 'approvals');
        const approvalsSnapshot = await getDocs(approvalsRef);
        const approvals = approvalsSnapshot.docs.map(approvalDoc => approvalDoc.data() as GoalApproval);

        // Fetch posts subcollection
        const postsRef = collection(goalRef, 'posts');
        const postsSnapshot = await getDocs(postsRef);
        const posts = postsSnapshot.docs.map(postDoc => postDoc.data() as GoalPost);

        // Fetch collaborators subcollection
        const collaboratorsRef = collection(goalRef, 'collaborators');
        const collaboratorsSnapshot = await getDocs(collaboratorsRef);
        const collaborators = collaboratorsSnapshot.docs.map(collaboratorDoc => collaboratorDoc.data() as GoalCollaborator);

        goalData.approvals = approvals;
        goalData.posts = posts;
        goalData.collaborators = collaborators;
        goalData.comments = comments;

        return goalData;
    } else {
        return undefined;
    }
};


//GET GOALS FOR FEED
//NEED TO ADD PAGINATION SO IT DOESN'T GET ALL AT THE SAME TIME
export const db_GetGoalFeed = async (currentUser: FlaimUser | undefined): Promise<Goal[]> => {
    if (currentUser) {
        const uids = [...currentUser.friendUids, currentUser.uid]
        const goalsRef = collection(fs, 'goals');
        const q = query(goalsRef, where('collaboratorUids', 'array-contains-any', uids), orderBy("updatedAt", "desc"));
        const goalsSnapshot = await getDocs(q);

        const goalList: Goal[] = await Promise.all(goalsSnapshot.docs.map(async (doc: DocumentSnapshot<DocumentData>) => {
            const goalData = doc.data() as Goal;

            // Fetch approvals subcollection
            const approvalsRef = collection(doc.ref, 'approvals');
            const approvalsSnapshot = await getDocs(approvalsRef);
            const approvals = approvalsSnapshot.docs.map(approvalDoc => approvalDoc.data() as GoalApproval);

            // Fetch posts subcollection
            const postsRef = collection(doc.ref, 'posts');
            const postsSnapshot = await getDocs(postsRef);
            const posts = postsSnapshot.docs.map(postDoc => postDoc.data() as GoalPost);

            // Fetch collaborators subcollection
            const collaboratorsRef = collection(doc.ref, 'collaborators');
            const collaboratorsSnapshot = await getDocs(collaboratorsRef);
            const collaborators = collaboratorsSnapshot.docs.map(collaboratorDoc => collaboratorDoc.data() as GoalCollaborator);

            goalData.approvals = approvals;
            goalData.posts = posts;
            goalData.collaborators = collaborators;

            return goalData;
        }));
        return goalList;
    }
    return [];
};

//GET GOALS FOR PROFILE LIST
export const db_GetProfileGoalsList = async (uid: string) => {
    const goalsRef = collection(fs, 'goals');
    const q = query(goalsRef, where('collaboratorUids', 'array-contains', uid), orderBy("createdAt", "desc"));
    const goalsSnapshot = await getDocs(q);

    const goalList: Goal[] = await Promise.all(goalsSnapshot.docs.map(async (doc: DocumentSnapshot<DocumentData>) => {
        const goalData = doc.data() as Goal;

        // Fetch posts subcollection
        const postsRef = collection(doc.ref, 'posts');
        const postsSnapshot = await getDocs(postsRef);
        const posts = postsSnapshot.docs.map(postDoc => postDoc.data() as GoalPost);

        goalData.posts = posts;

        return goalData;
    }));
    return goalList;
}
