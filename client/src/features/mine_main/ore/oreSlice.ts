import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ore {
  id: number;
  title: string;
  description: string;
  mineSpeed: number;
  mineProgress: number;
  isBeingMined: boolean;
  count: number;
}

interface OreState {
  items: Ore[];
}

const initialState: OreState = {
  items: [
    {
      id: 0,
      title: "Copper",
      description: "Soft and common. Good for basic wiring or basic tools.",
      mineSpeed: 1,
      mineProgress: 0,
      isBeingMined: false,
      count: 0,
    },
    {
      id: 1,
      title: "Tin",
      description: "You can use it to make bronze",
      mineSpeed: 1,
      mineProgress: 0,
      isBeingMined: false,
      count: 0,
    },
    {
      id: 2,
      title: "Coal",
      description:
        "A good fuel source. Coal is more efficient than wood for keeping the base warm or powering a furnace.",
      mineSpeed: 1,
      mineProgress: 0,
      isBeingMined: false,
      count: 0,
    },
  ],
};

export const oreSlice = createSlice({
  name: "ores",
  initialState,
  reducers: {
    handleMining: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.isBeingMined) {
          item.isBeingMined = false;
        } else {
          item.isBeingMined = true;
        }
      }
    },
    mineTick: (state) => {
      state.items.forEach((item) => {
        if (item.isBeingMined) {
          item.mineProgress += 1;
          item.count++;

          // if (item.mineProgress >= 100) {
          //   item.mineProgress = 100;
          //   item.isBeingMined = false;
          // }
        }
      });
    },
  },
});

export const { handleMining, mineTick } = oreSlice.actions;
export default oreSlice.reducer;
