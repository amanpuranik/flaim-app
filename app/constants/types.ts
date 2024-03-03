import { UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type AuthResponse = {
    token: UserCredential | null;
    error: boolean;
    errorMessage: string;
}

export type FlaimUser = {
    uid: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    updatedAt: Timestamp;
    createdAt: Timestamp;
    friendUids: string[];
    incomingRequests: string[];
    outgoingRequests: string[];
    profilePictureUrl: string;
    pinnedGoals: string[];
}

export type Goal = {
    uid: string;
    name: string;
    tag?: string;
    onlyColabsCanView: boolean;
    onlyColabsCanApprove: boolean;
    reward?: string;
    goalEndDate: Timestamp;
    updatedAt: Timestamp;
    createdAt: Timestamp;

    //The userUids should always be the same as the collaborator userUids
    //Used for querying goals
    collaboratorUids: string[];

    collaborators?: GoalCollaborator[];
    comments?: GoalComment[];
    approvals?: GoalApproval[];
    posts?: GoalPost[];
}

export type GoalCollaborator = {
    uid: string;
    userUid: string;
    role: 'partner' | 'student' | 'teacher'
}

export type GoalComment = {
    uid: string;
    userUid: string;
    comment: string;
    createdAt: Timestamp;
    likes?: CommentLike[];
}

export type CommentLike = {
    userUid: string;
    isLiked: boolean;
}

export type GoalApproval = {
    uid: string;
    postUid: string;
    userUid: string;
    updatedAt: Timestamp;
    createdAt: Timestamp;
}

export type GoalPost = {
    uid: string;
    userUid: string;
    imageUrl: string;
    caption?: string;
    updatedAt: Timestamp;
    createdAt: Timestamp;
}
