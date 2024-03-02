import { arrayRemove, arrayUnion, doc, getDoc, writeBatch } from "firebase/firestore";
import { auth, fs } from "../../../firebase";
import { FlaimUser } from "../../constants/types";

//SEND FRIEND REQUEST
export const db_SendFriendRequest = async (requestedUid: string) => {
    const currentUserUid = auth.currentUser?.uid.toString()!;
    const userRef = doc(fs, "users", currentUserUid);
    const requestedFriendRef = doc(fs, "users", requestedUid);

    const batch = writeBatch(fs);
    batch.update(userRef, {
        outgoingRequests: arrayUnion(requestedUid)
    })
    batch.update(requestedFriendRef, {
        incomingRequests: arrayUnion(currentUserUid)
    })
    batch.commit();
}

//ACCEPT FRIEND REQUEST
export const db_AcceptFriendRequest = async (requesterUid: string) => {
    const currentUserUid = auth.currentUser?.uid.toString()!;
    const userRef = doc(fs, "users", currentUserUid);
    const requesterRef = doc(fs, "users", requesterUid);

    const batch = writeBatch(fs);
    batch.update(userRef, {
        incomingRequests: arrayRemove(requesterUid),
        friendUids: arrayUnion(requesterUid)
    })
    batch.update(requesterRef, {
        outgoingRequests: arrayUnion(currentUserUid),
        friendUids: arrayUnion(currentUserUid)
    })
    batch.commit();
}

//REMOVE FRIEND
export const db_RemoveFriend = async (uid: string) => {
    const currentUserUid = auth.currentUser?.uid.toString()!;
    const userRef = doc(fs, "users", currentUserUid);
    const userToRemoveRef = doc(fs, "users", uid);

    const batch = writeBatch(fs);
    batch.update(userRef, {
        friendUids: arrayRemove(uid)
    })
    batch.update(userToRemoveRef, {
        friendUids: arrayRemove(currentUserUid)
    })
    batch.commit();
}

//GET MUTUAL FRIENDS
export const db_GetFriendRecommendations = async (currentUserFriends: string[]): Promise<FlaimUser[]> => {
    const friendsOfFriends = [];
    for (const friendUid of currentUserFriends) {
        const friendRef = doc(fs, "users", friendUid);
        const friendSnap = await getDoc(friendRef);
        if (friendSnap.exists()) {
            const friendsOfFriend = friendSnap.data().friendUids;
            friendsOfFriends.push(friendsOfFriend);
        }
    }

    const mutualFriends = friendsOfFriends.reduce((intersection, friendList) => {
        return intersection.filter((uid: string) => friendList.includes(uid));
    }, currentUserFriends);

    const recommendedFriends = mutualFriends.filter((uid: string) => !currentUserFriends.includes(uid));
    const recommendedUserDocs = await Promise.all(
        recommendedFriends.map(async (uid: string) => {
            const userRef = doc(fs, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                return userSnap.data();
            }
        })
    );
    return recommendedUserDocs;
}