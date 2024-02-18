import { create } from 'zustand';
import { FlaimUser } from '../../constants/types';
import { db_UpdateUser } from '../db/userService';

interface UserStore {
    currentUser: FlaimUser | undefined;
    setCurrentUser: (user: FlaimUser | undefined) => void;
}

const useUserStore = create<UserStore>((set) => ({
    currentUser: undefined,
    setCurrentUser: (user) => set({ currentUser: user })
}));

export default useUserStore;
