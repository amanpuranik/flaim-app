import { create } from 'zustand';
import { Goal } from '../../constants/types';

interface GoalStore {
    goalFeed: Goal[],
    setGoalFeed: (goals: Goal[]) => void;
    goalBeingCreated: Goal | null,
    setGoalBeingCreated: (goal: Goal | null) => void
}

const useGoalStore = create<GoalStore>((set) => ({
    goalFeed: [],
    setGoalFeed: (goals) => set({ goalFeed: goals }),
    goalBeingCreated: null,
    setGoalBeingCreated: (goal) => set({ goalBeingCreated: goal })
}));

export default useGoalStore;