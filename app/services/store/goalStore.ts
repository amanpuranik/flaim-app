import { create } from 'zustand';
import { Goal } from '../../constants/types';
import { db_GetGoalFeed } from '../db/goalService';

interface GoalStore {
    goalFeed: Goal[],
    setGoalFeed: (goals: Goal[]) => void;
}

const useGoalStore = create<GoalStore>((set) => ({
    goalFeed: [],
    setGoalFeed: (goals) => set({ goalFeed: goals })
}));

export default useGoalStore;