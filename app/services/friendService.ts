import { collection, getDocs, addDoc } from "firebase/firestore";
import { fs } from "../../firebase";

export const getFriends = async () => {
  try {
    const querySnapshot = await getDocs(collection(fs, "friends"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting friends: ", e);
    throw e;
  }
};

//   export const addFriend = async (friendData: Friend): Promise<string> => {
// ... implementation to add a new friend ...
//   };
