import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// title, description, isResearched, isBeingResearched,isResearchable, researchProgress, progressMultiplier

export interface ResearchItem {
  id: number;
  title: string;
  description: string;
  isResearched: boolean;
  isBeingResearched: boolean;
  isResearchable: boolean;
  researchProgress: number;
  progressMultiplier: number;
}

export interface ResearchSliceState {
  items: ResearchItem[];
  totalCompleted: number;
}

const initialState: ResearchSliceState = {
  items: [
    {
      id: 0,
      title: "Axe",
      description: "The starting tool.",
      isResearched: true,
      isBeingResearched: false,
      isResearchable: false,
      researchProgress: 100,
      progressMultiplier: 0,
    },
    {
      id: 1,
      title: "Steam-Powered Crosscut Saw",
      description:
        "A large, stationary or semi-portable frame saw driven by a piston. Best for large logs brought to a central site.",
      isResearched: false,
      isBeingResearched: false,
      isResearchable: true,
      researchProgress: 0,
      progressMultiplier: 0.4,
    },
  ],
  totalCompleted: 0,
};

export const researchSlice = createSlice({
  name: "researchSlice",
  initialState: initialState,
  reducers: {
    updateProgress: (
      state,
      action: PayloadAction<{ id: number; amount: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.researchProgress +=
          action.payload.amount * item.progressMultiplier;

        if (item.researchProgress >= 100) {
          item.isResearched = true;
          item.isBeingResearched = false;
          state.totalCompleted += 1;
        }
      }
    },
    startResearch: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.isBeingResearched = true;
        item.isResearchable = false;
      }
    },
  },
});

export const { updateProgress, startResearch } = researchSlice.actions;
export default researchSlice.reducer;
